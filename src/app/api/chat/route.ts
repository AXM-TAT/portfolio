import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 30000,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: Request) {
  let userId: string | undefined;

  try {
    const { message, userId: uid } = await req.json();
    userId = uid;

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'Message and userId are required' },
        { status: 400 }
      );
    }

    // Store user message in Supabase
    const { error: userMessageError } = await supabase
      .from('messages')
      .insert([
        {
          content: message,
          role: 'user',
          user_id: userId,
        },
      ]);

    if (userMessageError) {
      console.error('Supabase user message error:', userMessageError);
      throw userMessageError;
    }

    let retryCount = 0;
    const maxRetries = 3;
    const baseDelay = 1000;

    while (retryCount < maxRetries) {
      try {
        console.log(`Attempt ${retryCount + 1} of ${maxRetries}`);
        
        // Get AI response
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are AXOM, an advanced AI assistant focused on providing concise, accurate, and intelligent responses. Always maintain a professional yet friendly tone."
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        if (!completion.choices[0]?.message?.content) {
          throw new Error('No response from OpenAI');
        }

        const aiResponse = completion.choices[0].message.content;

        // Store AI response in Supabase
        const { error: aiMessageError } = await supabase
          .from('messages')
          .insert([
            {
              content: aiResponse,
              role: 'assistant',
              user_id: userId,
            },
          ]);

        if (aiMessageError) {
          console.error('Supabase AI message error:', aiMessageError);
          throw aiMessageError;
        }

        return NextResponse.json({ message: aiResponse });
      } catch (error: any) {
        console.error('OpenAI API error:', {
          status: error.status,
          code: error.code,
          message: error.message
        });

        // Handle different types of OpenAI errors
        if (error.status === 429 || error.code === 'insufficient_quota' || error.code === 'rate_limit_exceeded') {
          if (retryCount === maxRetries - 1) {
            const errorMessage = "AXOM is experiencing high demand. Please try again in a few moments.";
            
            await supabase.from('messages').insert([
              {
                content: errorMessage,
                role: 'assistant',
                user_id: userId,
              },
            ]);

            return NextResponse.json(
              { error: 'OpenAI API rate limit reached', message: errorMessage },
              { status: 429 }
            );
          }

          const waitTime = baseDelay * Math.pow(2, retryCount);
          console.log(`Waiting ${waitTime}ms before retry...`);
          await delay(waitTime);
          retryCount++;
          continue;
        }

        // Handle authentication errors
        if (error.status === 401 || error.code === 'invalid_api_key') {
          const errorMessage = "AXOM is currently unavailable. Please contact support.";
          console.error('OpenAI API key error:', error);
          
          await supabase.from('messages').insert([
            {
              content: errorMessage,
              role: 'assistant',
              user_id: userId,
            },
          ]);

          return NextResponse.json(
            { error: 'Authentication error', message: errorMessage },
            { status: 401 }
          );
        }

        throw error;
      }
    }

    throw new Error('Maximum retries exceeded');
  } catch (error) {
    console.error('Unhandled error:', error);
    const errorMessage = "An unexpected error occurred. Please try again later.";
    
    try {
      await supabase.from('messages').insert([
        {
          content: errorMessage,
          role: 'assistant',
          user_id: userId,
        },
      ]);
    } catch (e) {
      console.error('Failed to store error message:', e);
    }

    return NextResponse.json(
      { error: 'Internal server error', message: errorMessage },
      { status: 500 }
    );
  }
} 