'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/utils/supabase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

interface BlogPostProps {
  post?: BlogPost;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export default function BlogPost({ post, isEditing = false, onSuccess }: BlogPostProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No session found');
      }

      // Get the authenticated user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!userData?.user) throw new Error('No user found');

      if (isEditing && post) {
        // Update existing post
        const { error: updateError } = await supabase
          .from('posts')
          .update({
            title,
            content,
            updated_at: new Date().toISOString(),
          })
          .eq('id', post.id)
          .eq('user_id', userData.user.id); // Ensure user owns the post

        if (updateError) throw updateError;
      } else {
        // Create new post
        const { error: insertError } = await supabase
          .from('posts')
          .insert([
            {
              title,
              content,
              user_id: userData.user.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
          ]);

        if (insertError) throw insertError;
      }

      // Clear form and notify parent
      if (!isEditing) {
        setTitle('');
        setContent('');
      }
      onSuccess?.();
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Failed to save post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-2xl glass-effect overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gradient">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition"
          >
            {previewMode ? 'Edit' : 'Preview'}
          </motion.button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {previewMode ? (
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{title || 'Untitled'}</h1>
            <div className="prose prose-invert max-w-none">
              {content || 'No content yet...'}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your post title..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                placeholder="Write your post content..."
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  isEditing ? 'Update Post' : 'Publish Post'
                )}
              </motion.button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
} 