'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, MessageCircle, Send } from 'lucide-react';
import { processVoiceCommand } from '@/lib/ai-utils';

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    setMessages([...messages, { type: 'user', text: inputText }]);
    const result = processVoiceCommand(inputText);

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'ai', text: result.response }]);
    }, 500);

    setInputText('');
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setIsListening(false);
        const sampleInput = "What's my top spending category?";
        setMessages([...messages, { type: 'user', text: sampleInput }]);
        const result = processVoiceCommand(sampleInput);
        setTimeout(() => {
          setMessages((prev) => [...prev, { type: 'ai', text: result.response }]);
        }, 500);
      }, 2000);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-2xl hover:shadow-emerald-500/50 transition-shadow z-50"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20, y: 20 }}
            className="fixed bottom-28 left-8 w-96 h-[500px] glass rounded-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-xs text-gray-400">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">👋 Hi! I'm your AI finance assistant</p>
                  <div className="space-y-2 text-sm text-left">
                    <div className="glass rounded-lg p-3">
                      <p className="font-medium mb-1">Try asking:</p>
                      <ul className="text-gray-400 space-y-1">
                        <li>• "What's my top spending?"</li>
                        <li>• "Show my balance"</li>
                        <li>• "I spent 100 on burger"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                        : 'glass text-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={toggleListening}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-600 hover:opacity-90'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Mic className="w-4 h-4" />
                  {isListening ? 'Listening...' : 'Hold to Speak'}
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
