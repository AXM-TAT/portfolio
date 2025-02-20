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

    const userMessage = input;
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          userId: userId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          // The error message will be automatically added to the messages
          // through the Supabase subscription
          console.warn('OpenAI API rate limit reached:', data.error);
        } else {
          throw new Error(data.error || 'Failed to send message');
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      setIsTyping(false);
      // Only show alert for non-rate-limit errors
      if (error?.message !== 'OpenAI API rate limit reached') {
        alert('Failed to send message. Please try again.');
      }
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl glass-effect overflow-hidden border border-white/10"
    >
      <div className="p-4 border-b border-white/10 bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <h2 className="text-xl font-semibold text-gradient">AXOM INTELLIGENCE</h2>
          </div>
          <div className="flex items-center space-x-2">
            {isSelecting && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleDeleteMessages}
                disabled={selectedMessages.size === 0}
                className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                Delete ({selectedMessages.size})
              </motion.button>
            )}
            <motion.button
              onClick={() => {
                setIsSelecting(!isSelecting);
                if (isSelecting) setSelectedMessages(new Set());
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                isSelecting 
                  ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {isSelecting ? 'Cancel' : 'Select'}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => toggleMessageSelection(message.id)}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`relative max-w-[80%] p-4 rounded-2xl transition-colors cursor-pointer ${
                    message.role === 'user'
                      ? 'bg-primary/20 ml-auto'
                      : 'bg-black/20'
                  } ${
                    isSelecting ? 'hover:bg-white/5' : ''
                  } ${
                    selectedMessages.has(message.id) ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {isSelecting && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                      <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                        selectedMessages.has(message.id)
                          ? 'border-primary bg-primary'
                          : 'border-white/50'
                      }`} />
                    </div>
                  )}
                  {message.role === 'assistant' && (
                    <div className="text-xs font-semibold text-primary mb-1">AXOM</div>
                  )}
                  <p className="text-white/90 whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs text-white/50 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-black/20 p-4 rounded-2xl">
                  <div className="text-xs font-semibold text-primary mb-2">AXOM</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AXOM anything..."
              className="flex-1 px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading || isSelecting}
            />
            <motion.button
              type="submit"
              disabled={loading || !input.trim() || isSelecting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                'Send'
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}