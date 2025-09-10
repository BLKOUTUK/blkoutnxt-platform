// Moderation API Route
// File: api/moderate-content.ts
// Purpose: Handle approve/reject actions from moderation dashboard

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Direct Supabase connection (since import path doesn't work in Vercel serverless)
const supabaseUrl = 'https://bgjengudzfickgomjqmz.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Content type detection helper
async function detectContentType(contentId: string): Promise<'events' | 'newsroom_articles'> {
  try {
    // Try events table first
    const { data: eventCheck } = await supabase
      .from('events')
      .select('id')
      .eq('id', contentId)
      .single();
    if (eventCheck) return 'events';
    
    // Try newsroom_articles table
    const { data: articleCheck } = await supabase
      .from('newsroom_articles')
      .select('id')
      .eq('id', contentId)
      .single();
    if (articleCheck) return 'newsroom_articles';
    
    throw new Error(`Content ${contentId} not found in any table`);
  } catch (error) {
    throw new Error(`Failed to detect content type: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

interface ModerationRequest {
  action: 'approve' | 'reject' | 'edit';
  contentId: string;
  moderatorId: string;
  reason?: string;
  edits?: {
    title?: string;
    content?: string;
    priority?: 'low' | 'medium' | 'high';
    status?: string;
    [key: string]: any;
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, contentId, moderatorId, reason, edits }: ModerationRequest = req.body;

    // Validate required fields
    if (!action || !contentId || !moderatorId) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'action, contentId, and moderatorId are required'
      });
    }

    // Validate action
    if (!['approve', 'reject', 'edit'].includes(action)) {
      return res.status(400).json({
        error: 'Invalid action',
        message: 'action must be one of: approve, reject, edit'
      });
    }

    // Detect content type
    const contentType = await detectContentType(contentId);
    
    switch (action) {
      case 'approve':
        // Get original content
        const { data: originalContent } = await supabase
          .from(contentType)
          .select('*')
          .eq('id', contentId)
          .single();

        if (!originalContent) {
          return res.status(404).json({ error: 'Content not found' });
        }

        // Publish to appropriate table
        const publishTable = contentType === 'events' ? 'published_events' : 'published_news';
        const { data: published } = await supabase
          .from(publishTable)
          .insert({
            ...originalContent,
            published_at: new Date().toISOString(),
            moderator_id: moderatorId
          })
          .select()
          .single();

        // Log moderation action
        await supabase
          .from('moderation_log')
          .insert({
            content_id: contentId,
            content_type: contentType,
            action: 'approved',
            moderator_id: moderatorId,
            timestamp: new Date().toISOString()
          });

        return res.status(200).json({
          success: true,
          message: 'Content approved and published successfully',
          data: {
            published,
            contentId,
            action: 'approved',
            timestamp: new Date().toISOString()
          }
        });

      case 'reject':
        if (!reason) {
          return res.status(400).json({
            error: 'Missing required field',
            message: 'reason is required for rejection'
          });
        }

        // Update status to rejected
        await supabase
          .from(contentType)
          .update({ status: 'rejected' })
          .eq('id', contentId);

        // Log moderation action
        await supabase
          .from('moderation_log')
          .insert({
            content_id: contentId,
            content_type: contentType,
            action: 'rejected',
            moderator_id: moderatorId,
            reason: reason,
            timestamp: new Date().toISOString()
          });

        return res.status(200).json({
          success: true,
          message: 'Content rejected successfully',
          data: {
            contentId,
            action: 'rejected',
            reason,
            moderatorId,
            timestamp: new Date().toISOString()
          }
        });

      case 'edit':
        if (!edits || Object.keys(edits).length === 0) {
          return res.status(400).json({
            error: 'Missing required field',
            message: 'edits object is required for edit action'
          });
        }

        // Update content with edits
        const { data: updated } = await supabase
          .from(contentType)
          .update({
            ...edits,
            updated_at: new Date().toISOString(),
            status: 'pending' // Reset to pending after edit
          })
          .eq('id', contentId)
          .select()
          .single();

        // Log moderation action
        await supabase
          .from('moderation_log')
          .insert({
            content_id: contentId,
            content_type: contentType,
            action: 'edited',
            moderator_id: moderatorId,
            reason: `Edited fields: ${Object.keys(edits).join(', ')}`,
            timestamp: new Date().toISOString()
          });

        return res.status(200).json({
          success: true,
          message: 'Content edited successfully',
          data: {
            updated,
            contentId,
            action: 'edited',
            edits,
            moderatorId,
            timestamp: new Date().toISOString()
          }
        });

      default:
        return res.status(400).json({
          error: 'Invalid action',
          message: 'action must be one of: approve, reject, edit'
        });
    }

  } catch (error) {
    console.error('Moderation API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}