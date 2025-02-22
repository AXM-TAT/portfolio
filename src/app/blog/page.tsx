'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import Auth from '@/components/Auth';
import BlogPost from '@/components/BlogPost';
import AIChatbox from '@/components/AIChatbox';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Is it true that humans only use 10% of their brains?",
    excerpt: "The idea that humans only use 10% of their brains is a myth. Brain imaging studies show that almost all parts of the brain are active...",
    date: "February 20, 2025",
    slug: "brain-myth"
  },
  // Add more blog posts here
];

export default function BlogPage() {
  const [session, setSession] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setPosts([]);
      setShowNewPost(false);
      setShowChat(false);
      
      await supabase.auth.signOut();
      setSession(null);
      
      window.location.href = '/blog';
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Auth />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => {
            setShowNewPost(true);
            setShowChat(false);
          }}
          className="bg-cyan-400 text-black px-6 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          New Post
        </button>
        <button 
          onClick={() => {
            setShowChat(true);
            setShowNewPost(false);
          }}
          className="border border-cyan-400 text-cyan-400 px-6 py-2 rounded-md hover:bg-cyan-400/10 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Open AI Chat
        </button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <div className="mb-8">
          <BlogPost onSuccess={() => {
            setShowNewPost(false);
            fetchPosts();
          }} />
        </div>
      )}

      {/* AI Chat */}
      {showChat && (
        <div className="mb-8">
          <AIChatbox />
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <div 
            key={post.slug}
            className="block bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/70 transition-colors border border-gray-800 group"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">{post.title}</h2>
            <p className="text-gray-400 mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <time className="text-gray-500">{post.date}</time>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2 group-hover:gap-3 duration-300"
              >
                Read More
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Sign Out Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="text-gray-400 hover:text-cyan-400 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 