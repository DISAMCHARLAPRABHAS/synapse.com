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

  // 🧠 --- HTML SANITIZER + FIXER ---
  const sanitizeAndFixHTML = (html: string) => {
    if (!html) return '';

    // Fix common Gemini HTML issues
    let fixed = html
      .replace(/backgroundcolor/gi, 'background-color')
      .replace(/bordercollapse/gi, 'border-collapse')
      .replace(/bankspecific/gi, 'bank-specific')
      .replace(/style="[^"]*"/gi, match => {
        // Normalize inline CSS syntax
        return match.replace(/\s*([a-z-]+)\s*:\s*/gi, (_, p1) => `${p1.trim()}: `);
      });

    // Wrap tables for responsive scroll
    fixed = fixed.replace(
      /<table/gi,
      `<div class='overflow-x-auto my-3'><table class='w-full text-sm border border-gray-300 border-collapse'>`
    );
    fixed = fixed.replace(/<\/table>/gi, '</table></div>');

    // Add Tailwind styling for cells
    fixed = fixed
      .replace(/<th/gi, "<th class='border border-gray-300 px-3 py-2 bg-gray-100 text-left font-semibold'")
      .replace(/<td/gi, "<td class='border border-gray-300 px-3 py-2 text-gray-800'")
      .replace(/<tr>/gi, "<tr class='odd:bg-white even:bg-gray-50'>");

    return fixed;
  };

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

      const systemPrompt = `
You are an expert conversational shopping and booking assistant. Your task is to recommend the best products or travel options for the user based on real-time Google Search data.

Follow these strict output and style rules:
- Do not use stars (*), markdown, emojis, or bullet points.
- Output all product or item results in a clean HTML table format only.
- Use clear column headers with the following structure:
  Product Name | Price | Offers | Verdict | Card Offers | Specifications | Reviews | Review Summary | Sentiment Analysis
- Always include as many of these fields as are available. If data for a column is unavailable, leave it blank.
- For single-product results, still use a single-row HTML table.
- The “Sentiment Analysis” column should summarize customer sentiment as Positive, Neutral, or Negative with a short reason.
- Keep text concise, factual, and helpful.
- Base all information strictly on real web data. Do not invent prices, offers, or specifications.
- Maintain a conversational tone before or after the table, but do not wrap the table in markdown or code blocks.
- If the user asks for general help, respond conversationally; if they request recommendations, respond using the HTML table format described above.
`;

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
            This demo is powered by the Gemini API with Google Search grounding. Ask it to find a product or book a trip.
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Example: "Find me the best laptop for coding under ₹30,000"
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
                  {msg.sender === 'ai' ? (
                    <div
                      className="text-sm md:text-base leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeAndFixHTML(msg.text)
                      }}
                    />
                  ) : (
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  )}

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
                if (e.key === 'Enter' && !isLoading) handleSendMessage();
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
