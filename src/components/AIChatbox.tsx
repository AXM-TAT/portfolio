'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/utils/supabase';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  user_id: string;
}

export default function AIChatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const { data: messages } = await supabase
          .from('messages')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: true });
        
        if (messages) {
          setMessages(messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.created_at)
          })));
        }
      }
    };

    getCurrentUser();

    const channel = supabase
      .channel('messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages' 
        }, 
        payload => {
          if (payload.new.user_id === userId) {
            setMessages(current => [...current, {
              id: payload.new.id,
              content: payload.new.content,
              role: payload.new.role,
              user_id: payload.new.user_id,
              timestamp: new Date(payload.new.created_at)
            }]);
            setIsTyping(false);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !userId || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    setIsTyping(true);

    // Add user message to chat
    setMessages(prev => [...prev, {
      id: '',
      content: userMessage,
      role: 'user',
      timestamp: new Date(),
      user_id: userId
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, userId }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      // Add AI response to chat
      setMessages(prev => [...prev, {
        id: '',
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
        user_id: userId
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        id: '',
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant', 
        timestamp: new Date(),
        user_id: userId
      }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMessageSelection = (messageId: string) => {
    if (!isSelecting) return;
    
    setSelectedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const handleDeleteMessages = async () => {
    if (selectedMessages.size === 0) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .in('id', Array.from(selectedMessages));

      if (error) throw error;

      // Update local state
      setMessages(prev => prev.filter(msg => !selectedMessages.has(msg.id)));
      setSelectedMessages(new Set());
      setIsSelecting(false);
    } catch (error) {
      console.error('Error deleting messages:', error);
      alert('Failed to delete messages. Please try again.');
    }
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-[600px] rounded-2xl glass-effect">
        <p className="text-gray-400">Please sign in to use the chat</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 rounded-lg border border-gray-800 flex flex-col h-[600px]">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          AI Chat Assistant
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            <p>No messages yet.</p>
            <p className="text-sm mt-2">Start a conversation with the AI assistant!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-cyan-400 text-black'
                    : 'bg-gray-800 text-gray-200'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-lg px-4 py-2 text-gray-200">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-black/20 border border-gray-800 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}