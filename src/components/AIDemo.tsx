import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  sources?: Array<{ uri: string; title: string }>;
}

function AIDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! I'm a demo assistant. How can I help you find a product or plan a trip today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatLogRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsLoading(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        setError('API key not configured. Please set VITE_GEMINI_API_KEY in your environment.');
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: 'I apologize, but I\'m not configured to make real API calls at the moment. This is a demo interface. In production, I would use the Gemini API with Google Search grounding to provide real recommendations.'
        }]);
        setIsLoading(false);
        return;
      }

      const systemPrompt = `You are an expert conversational shopping and booking assistant. Your goal is to find the best products or travel options for the user. When asked for recommendations, provide a concise summary, mention key features and pros/cons, and base your answer on real-time web search. Do not make up products, prices, or specifications. Be friendly, conversational, and helpful.`;

      const payload = {
        contents: [{ parts: [{ text: userMessage }] }],
        tools: [{ google_search: {} }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
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
      const candidate = result.candidates?.[0];

      if (candidate?.content?.parts?.[0]?.text) {
        const aiText = candidate.content.parts[0].text;
        let sources: Array<{ uri: string; title: string }> = [];

        if (candidate.groundingMetadata?.groundingAttributions) {
          sources = candidate.groundingMetadata.groundingAttributions
            .map((attr: any) => ({
              uri: attr.web?.uri,
              title: attr.web?.title
            }))
            .filter((source: any) => source.uri && source.title);
        }

        setMessages(prev => [...prev, { sender: 'ai', text: aiText, sources }]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: `Sorry, I encountered an error: ${errorMessage}. Please try again.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            Try the AI Agent Demo
          </h2>
          <p className="text-xl text-gray-600">
            This is a live demo powered by the Gemini API with Google Search grounding. Ask it to find a product or book a trip, just like the solution describes.
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Example: "Find me the best laptop for coding under $1000"
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-[#FF6B6B] rounded-lg">
            <p className="text-[#FF6B6B] font-semibold">Error: {error}</p>
          </div>
        )}

        <div className="bg-white border-2 border-[#40E0D0] rounded-2xl shadow-lg overflow-hidden">
          <div
            ref={chatLogRef}
            className="chat-log bg-gray-50 h-96 overflow-y-auto p-6 space-y-4 flex flex-col"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-[#40E0D0] text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.sender === 'ai' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Sources:</p>
                      <ol className="text-xs space-y-1">
                        {msg.sources.map((source, i) => (
                          <li key={i} className="list-decimal list-inside">
                            <a
                              href={source.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#40E0D0] hover:underline"
                            >
                              {source.title}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-900 rounded-lg rounded-bl-none px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#40E0D0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-[#40E0D0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[#40E0D0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[#40E0D0] flex bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleSendMessage();
                }
              }}
              placeholder="Type your request here..."
              className="flex-1 px-6 py-4 outline-none text-gray-900"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-[#40E0D0] text-white px-6 py-4 font-semibold hover:bg-[#2BC4BC] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        
      </div>
    </section>
  );
}

export default AIDemo;
