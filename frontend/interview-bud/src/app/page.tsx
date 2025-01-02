'use client'
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import axios from "axios";

export default function Home() {

  const [question, setQuestion] = useState<string[]>([]);
  const [resultPrompt, setResultPrompt] = useState<string[]>([]);

  async function handleClick() {  
    const url = 'http://localhost:3000/generate';
    const data = {  
      question: question
    }
    try 
    {   
      const response = await axios.post(url, data);
      setResultPrompt([...resultPrompt, JSON.stringify(response.data.response)]);
    }
    catch(err) 
    {
        console.log('Some error occurred'+ err);
    }
  }

  return (
    <div className="p-4 text-black">
        <div className="gap-4">
            <input type="text" onChange={(e) => 
              {
                setQuestion([...question, e.target.value]);
              }
            } value={question}  placeholder="Enter your question"/>
            <button className="text-white" onClick={handleClick}>Send</button>
            <div className="text-white">
              {
                resultPrompt.map((prompt, index) => {
                  return (
                    <div key={index}>
                      You: 
                      <ReactMarkdown>{prompt}</ReactMarkdown>
                    </div>
                  )
                })
              }
            </div>
        </div>
    </div>
  );
}
