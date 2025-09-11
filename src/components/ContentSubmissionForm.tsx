import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bgjengudzfickgomjqmz.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnamVuZ3VkemZpY2tnb21qcW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3MjM5MzksImV4cCI6MjA0MTI5OTkzOX0.UJlmgIrKS1QWNq1L5L-xmwqNDYnKpNLGYWCF4Qceg-M';
const supabase = createClient(supabaseUrl, supabaseKey);

const ContentSubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'newsroom_articles',
    title: '',
    content: '',
    description: '',
    author: '',
    source_url: '',
    event_date: '',
    location: '',
    organizer: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      setMessage('Title is required');
      return;
    }

    if (formData.type === 'newsroom_articles' && !formData.content) {
      setMessage('Content is required for news articles');
      return;
    }

    if (formData.type === 'events' && (!formData.description || !formData.event_date)) {
      setMessage('Description and event date are required for events');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData: any = {
        title: formData.title,
        status: 'pending',
        priority: 'medium',
        source: 'community_submission',
        created_at: new Date().toISOString(),
      };

      if (formData.source_url) {
        submitData.source_url = formData.source_url;
      }

      if (formData.type === 'newsroom_articles') {
        submitData.content = formData.content;
        if (formData.author) submitData.author = formData.author;

        const result = await supabase
          .from('newsroom_articles')
          .insert([submitData])
          .select();

        if (result.error) throw result.error;
      } else {
        submitData.description = formData.description;
        submitData.event_date = new Date(formData.event_date).toISOString();
        if (formData.location) submitData.location = formData.location;
        if (formData.organizer) submitData.organizer = formData.organizer;

        const result = await supabase
          .from('events')
          .insert([submitData])
          .select();

        if (result.error) throw result.error;
      }

      setMessage('✅ Content submitted successfully! It will be reviewed by community moderators.');
      setFormData({
        type: 'newsroom_articles',
        title: '',
        content: '',
        description: '',
        author: '',
        source_url: '',
        event_date: '',
        location: '',
        organizer: '',
        tags: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('❌ Error submitting content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-purple-500/10 border border-purple-500/30 rounded-xl p-8 backdrop-blur-lg">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        📝 Submit Content to Community
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Type Selection */}
        <div>
          <label className="block text-purple-200 font-medium mb-2">Content Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none"
          >
            <option value="newsroom_articles">News Article</option>
            <option value="events">Community Event</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-purple-200 font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter content title..."
            className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        {/* Content for News Articles */}
        {formData.type === 'newsroom_articles' && (
          <>
            <div>
              <label className="block text-purple-200 font-medium mb-2">Article Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your article content here..."
                rows={8}
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none resize-vertical"
                required
              />
            </div>

            <div>
              <label className="block text-purple-200 font-medium mb-2">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name (optional)"
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
              />
            </div>
          </>
        )}

        {/* Event-specific fields */}
        {formData.type === 'events' && (
          <>
            <div>
              <label className="block text-purple-200 font-medium mb-2">Event Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the event..."
                rows={5}
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none resize-vertical"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-200 font-medium mb-2">Event Date *</label>
                <input
                  type="datetime-local"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-200 font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event location"
                  className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-200 font-medium mb-2">Organizer</label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="Event organizer"
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
              />
            </div>
          </>
        )}

        {/* Source URL */}
        <div>
          <label className="block text-purple-200 font-medium mb-2">Source URL</label>
          <input
            type="url"
            name="source_url"
            value={formData.source_url}
            onChange={handleChange}
            placeholder="https://... (optional)"
            className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-purple-200 font-medium mb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="tag1, tag2, tag3 (optional)"
            className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
          />
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-500/20 border border-green-400/30 text-green-100' : 'bg-red-500/20 border border-red-400/30 text-red-100'}`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {isSubmitting ? '🔄 Submitting...' : '📤 Submit for Community Review'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-purple-600/20 border border-purple-400/30 rounded-lg">
        <h3 className="font-semibold text-purple-200 mb-2">Community Review Process</h3>
        <ul className="text-sm text-purple-300 space-y-1">
          <li>• Your submission will be reviewed by community moderators</li>
          <li>• Content must align with community values and liberation principles</li>
          <li>• Approved content will be published on relevant platform sections</li>
          <li>• You'll be notified of the review decision</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentSubmissionForm;