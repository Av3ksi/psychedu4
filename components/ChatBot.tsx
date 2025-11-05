// components/ChatBot.tsx
'use client';

import { useChat, type Message } from '@ai-sdk/react'; // Dieser Import ist korrekt
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Diese Namen (handle...) sind korrekt für 'ai/react'
  const { messages, input, handleInputChange, handleSubmit } = useChat(); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-transform hover:scale-105"
        aria-label="Chat öffnen"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[70vh] bg-white dark:bg-neutral-dark rounded-lg shadow-xl flex flex-col border dark:border-slate-700 animate-in slide-in-from-bottom-5 duration-300 ease-out">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-slate-700">
        <h3 className="font-bold text-lg dark:text-white">Psychedu Assistent</h3>
        <button 
          onClick={() => setIsOpen(false)} 
          className="dark:text-slate-300 hover:dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-1"
          aria-label="Chat schließen"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nachrichten-Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-sm text-center text-slate-500 dark:text-slate-400">
            Hallo! Frag mich alles über Psychologie.
          </p>
        )}
        
        {messages.map((m: Message) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                m.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-200'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Eingabe-Formular */}
      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-slate-700">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={handleInputChange} 
            placeholder="Stell eine Frage..."
            className="flex-1 px-4 py-2 border rounded-full dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark disabled:opacity-50" disabled={!input}>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}