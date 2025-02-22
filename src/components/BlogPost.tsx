'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase';

interface BlogPostProps {
  post?: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    user_id: string;
  };
  isEditing?: boolean;
  onSuccess?: () => void;
}

export default function BlogPost({ post, isEditing = false, onSuccess }: BlogPostProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      if (isEditing && post) {
        const { error: updateError } = await supabase
          .from('posts')
          .update({
            title,
            content,
            updated_at: new Date().toISOString(),
          })
          .eq('id', post.id)
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('posts')
          .insert([
            {
              title,
              content,
              user_id: user.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
          ]);

        if (insertError) throw insertError;
      }

      setSuccess(true);
      if (!isEditing) {
        setTitle('');
        setContent('');
      }
      onSuccess?.();
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-cyan-400 mb-2">Post Published!</h3>
          <p className="text-gray-400 mb-4">Your post has been published successfully.</p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2 bg-gray-800 text-cyan-400 rounded-md hover:bg-gray-700 transition-colors"
          >
            Write Another Post
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
      <h3 className="text-2xl font-bold text-cyan-400 mb-6">
        {isEditing ? 'Edit Post' : 'Create New Post'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-gray-300 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-black/20 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Enter your post title..."
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-gray-300 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-4 py-3 bg-black/20 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Write your post content..."
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              isEditing ? 'Update Post' : 'Publish Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 