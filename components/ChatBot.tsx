// components/ChatBot.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, X, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from 'next-intl';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const pathname = usePathname();
  const t = useTranslations('chatBot');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (response.status === 429) {
        const errorText = await response.text();
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: errorText,
        }]);
        return;
      }

      if (!response.ok) {
        throw new Error(`API Fehler: ${response.status}`);
      }

      const aiResponse = await response.text();
      
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t('errorMessage'),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Prüfe, ob wir auf einer Modul-Detailseite sind
  const isModulePage = pathname ? /\/modules\/\d+/.test(pathname) : false;

  // Zeige ChatBot nur für eingeloggte User UND auf Modul-Seiten
  if (!user || !isModulePage) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-transform hover:scale-105"
        aria-label={t('openChat')}
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[70vh] bg-white dark:bg-neutral-dark rounded-lg shadow-xl flex flex-col border dark:border-slate-700">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-slate-700">
        <h3 className="font-bold text-lg dark:text-white">{t('title')}</h3>
        <button 
          onClick={() => setIsOpen(false)} 
          className="dark:text-slate-300 hover:dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-1"
          aria-label={t('closeChat')}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nachrichten-Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-sm text-center text-slate-500 dark:text-slate-400">
            {t('welcomeMessage')}
          </p>
        )}
        
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-200'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-slate-200">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Eingabe-Formular */}
      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-slate-700">
        <div className="flex items-center gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('inputPlaceholder')}
            className="flex-1 px-4 py-2 border rounded-full dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark disabled:opacity-50" 
            disabled={!inputValue.trim() || isLoading}
            aria-label={t('sendMessage')}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}