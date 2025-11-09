import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

// This is the new "brain" for the support bot.
// It's based on the information from your Problem.tsx, Solution.tsx, and Features.tsx files.
const SYNAPSEHUB_CONTEXT = `
You are a friendly support assistant for SynapseHub.
Your job is to answer questions about what SynapseHub is and what it does.
You must base your answers ONLY on the following information:

---
**What is SynapseHub?**
SynapseHub is a smart, unified platform powered by AI. Its mission is to simplify how people book, compare, and buy online, saving them time, money, and effort. It lets AI handle the hard part of decision-making.

**What problem does it solve?**
Today, users have to switch between multiple apps for simple tasks (booking, shopping, comparing prices). This is frustrating, confusing, and time-wasting. There are often extra fees, commissions, and hidden costs. Users have to do all the searching manually.

**How does SynapseHub solve this?**
1.  **AI-Powered Chat & Voice:** Users can just ask for what they want, like "Book me a train to Hyderabad."
2.  **Unified Platform:** It's one place for flights, trains, buses, hotels, movies, shopping, and more.
3.  **Transparent Pricing:** No hidden fees or commissions. It's an honest, subscription-based model.
4.  **Smart Comparisons:** The AI instantly compares options from different providers to find the best value.
5.  **Real-Time Alerts:** It provides notifications for discounts, price drops, and exclusive offers.

**How does it work in three steps?**
1.  **Chat:** The user tells the AI assistant what they are looking for.
2.  **Compare:** The user reviews intelligent recommendations tailored to them.
3.  **Confirm:** The user books with confidence, knowing they got the best deal.
---

**Your Strict Rules:**
1.  **Be Friendly and Concise:** Answer only using the information above.
2.  **Do NOT make things up.** If the information is not in the context, say "I'm sorry, I only have information about SynapseHub's features."
3.  **Do NOT perform actions:** If a user asks you to *do* something (like "book me a flight" or "find a laptop"), you must politely refuse and explain your role. Say: "I'm the support assistant, so I can only answer questions about SynapseHub. To book or shop, please use the main 'AI Agent Demo' on this page!"
4.  **Keep answers short and conversational.** Do not use markdown, tables, or complex formatting.
`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hi! I'm the SynapseHub assistant. Do you have any questions about our features?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        setError('API key not configured.');
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: 'I apologize, but I am not configured correctly. This is a demo.'
        }]);
        setIsLoading(false);
        return;
      }

      // Construct the API payload
      const payload = {
        contents: [
          // Add all previous messages to maintain context
          ...messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          })),
          // Add the new user message
          {
            role: 'user',
            parts: [{ text: userMessage.text }]
          }
        ],
        systemInstruction: {
          parts: [{ text: SYNAPSEHUB_CONTEXT }]
        }
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from AI');
      }

      const result = await response.json();
      const botText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (botText) {
        setMessages(prev => [...prev, { sender: 'bot', text: botText }]);
      } else {
        throw new Error('Invalid response format from API');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: `Sorry, I encountered an error: ${errorMessage}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[30rem] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300">
          {/* Header */}
          <div className="bg-[#40E0D0] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">Support Chat</h3>
            <button
              onClick={toggleChat}
              className="hover:bg-[#2BC4BC] p-1 -m-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-[#40E0D0] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
               <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-2 rounded-lg bg-red-100 text-red-700 rounded-bl-none">
                  <p className="text-sm">Error: {error}</p>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-2 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading) handleSendMessage();
              }}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-lg outline-none text-sm focus:ring-2 focus:ring-[#40E0D0] focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="ml-2 bg-[#40E0D0] text-white p-2 rounded-lg hover:bg-[#2BC4BC] transition-colors disabled:bg-gray-300"
_            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-[#40E0D0] text-white p-4 rounded-full shadow-lg hover:bg-[#2BC4BC] hover:scale-110 transition-all duration-200 animate-pulse"
        >
          <MessageSquare className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}

export default Chatbot;
