'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default function Chat() 
{
    const [question, setQuestion] = useState<string>('');
    const [messages, setMessages] = useState<{ type: 'question' | 'response'; content: string }[]>([]);
    const [Loading,SetLoading] = useState<boolean>(false)
  
    useEffect(()=> 
    {
      const timer = setTimeout(()=> SetLoading(true),2000);
      return ()=> clearTimeout(timer);
    },[]);
  
    if(!Loading)
    {
      return (
        <div className='p-4 bg-zinc-900 h-screen w-screen'>
            <div className='bg-zinc-900 justify-between flex h-[10%] w-full text-zinc-900'>
              <Skeleton className='w-64 h-full flex'></Skeleton>
              <Skeleton className='rounded-full w-8 h-8'></Skeleton>
            </div>
            <div className='bg-zinc-900 h-[75%] mt-4 w-full flex justify-center'>
              <Skeleton className='w-3/4 h-full rounded-2xl'></Skeleton>
            </div>
            <div className='bg-zinc-900 w-full h-[10%] flex justify-center bottom-4'>
              <Skeleton className='w-2/4 rounded-xl mt-4 h-3/4'></Skeleton>
            </div>
        </div>
      )
    }
  
    async function handleClick() {
      const url = 'https://interview-bit-7xo5.onrender.com/generate';
      const data = { question: question };
      try {
        const response = await axios.post(url, data);
  
        // Log response to check if it's valid
        console.log('API Response:', response.data);
  
        // Add the question and the response to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'question', content: question },
          { type: 'response', content: response.data.response }
        ]);
  
        // Clear the question input field
        setQuestion('');
      } catch (err) {
        console.log('Some error occurred: ' + err);
      }
    }
  
    // Log messages to see if the state is updating
    console.log('Messages:', messages);
  
    return (
      <div className="p-4 bg-zinc-950 h-screen w-screen text-white">
        <div className="w-full h-[10%] flex justify-between text-4xl font-bold">
          <h1>Interview Bit</h1>
          <a
    href="https://github.com/Suyash878/Interview-buddy.git"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="hover:cursor-pointer"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      />
    </svg>
  </a>
        </div>
        <div className="w-full h-[80%] rounded-xl flex justify-center">
          <div className="w-3/4 rounded-2xl bg-zinc-800 border-2 border-zinc-900 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
            {/* Ensure messages are rendered correctly */}
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className="p-2">
                  {message.type === 'question' ? (
                    <div className="bg-zinc-600 font-semibold font-sans p-2 rounded-xl">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="bg-zinc-700 p-2 font-sans rounded-xl">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='text-center font-semibold text-2xl'>
                <div className='flex font-sans flex-col'>
                  <h1> What can I help with? </h1>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex gap-2 p-2 mt-2 justify-center shadow-md fixed bottom-4 transition-all duration-300 ease-in-out">
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your Message"
            className="rounded-xl text-black p-2 w-1/2 transition-all duration-300 ease-in-out"
            aria-label="Ask a question"
          />
          <Button onClick={handleClick} className="bg-zinc-800 transition-all duration-300 ease-in-out">
            Send
          </Button>
        </div>
      </div>
    );
} 