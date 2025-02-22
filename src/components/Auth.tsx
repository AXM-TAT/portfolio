'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/utils/supabase';

type AuthMode = 'signin' | 'signup' | 'forgot';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('signin');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      } else if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        if (error) throw error;
        setMessage('Check your email for the password reset link!');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'forgot':
        return (
          <>
            <h2 className="text-3xl font-bold text-center mb-2 text-cyan-400">
              Reset Password
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Enter your email to receive a password reset link
            </p>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </>
        );
      default:
        return (
          <>
            <h2 className="text-3xl font-bold text-center mb-2 text-cyan-400">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 text-center mb-8">
              {mode === 'signin' ? 'Sign in to continue to the blog' : 'Sign up to get started'}
            </p>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
      <form onSubmit={handleAuth} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {message && (
          <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
            {message}
          </div>
        )}

        {renderForm()}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin mx-auto" />
          ) : mode === 'forgot' ? (
            'Send Reset Link'
          ) : mode === 'signin' ? (
            'Sign In'
          ) : (
            'Sign Up'
          )}
        </button>

        <div className="text-center space-y-2">
          {mode === 'forgot' ? (
            <button
              type="button"
              onClick={() => setMode('signin')}
              className="text-cyan-400 hover:underline"
            >
              Back to Sign In
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-cyan-400 hover:underline"
              >
                {mode === 'signin' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="block w-full text-cyan-400 hover:underline"
                >
                  Forgot your password?
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
} 