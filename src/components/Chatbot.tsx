import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Mock bot reply
    setTimeout(() => {
      const botMessage: ChatMessage = {
        sender: 'bot',
        text: "Thanks for your message! A support agent will be with you shortly."
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300">
          {/* Header */}
          <div className="bg-[#40E0D0] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">Support Chat</h3>
            <button
              onClick={toggleChat}
              className="hover:bg-[#2BC4BC] p-1 rounded-full"
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
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-[#40E0D0] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-2 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-lg outline-none text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-[#40E0D0] text-white p-2 rounded-lg hover:bg-[#2BC4BC]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-[#40E0D0] text-white p-4 rounded-full shadow-lg hover:bg-[#2BC4BC] hover:scale-110 transition-all duration-200"
        >
          <MessageSquare className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}

export default Chatbot;
