'use client'
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [messages, setMessages] = useState<{ type: 'question' | 'response'; content: string }[]>([]);

  async function handleClick() {  
    const url = 'http://localhost:3000/generate';
    const data = {  
      question: question
    };
    try {   
      const response = await axios.post(url, data);
      
      // Add the question and the response to the messages array
      setMessages([
        ...messages,
        { type: 'question', content: question },
        { type: 'response', content: response.data.response }
      ]);

      // Clear the question input field
      setQuestion('');
    } catch (err) {
      console.log('Some error occurred' + err);
    }
  }

  return (
    <div className="p-4 text-black">
      <div className="gap-4">
        <input 
          type="text" 
          onChange={(e) => setQuestion(e.target.value)} 
          value={question}  
          placeholder="Enter your question" 
        />
        <button className="text-white" onClick={handleClick}>Send</button>
        <div className="text-white">
          {messages.map((message, index) => (
            <div key={index} className={message.type === 'question' ? 'font-bold' : ''}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
