'use client';

import { motion } from 'framer-motion';
import { CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { mockCreditCards } from '@/lib/mock-data';

export default function CreditCardsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % mockCreditCards.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + mockCreditCards.length) % mockCreditCards.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-cyan-400" />
          My Cards
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="glass-hover p-2 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="glass-hover p-2 rounded-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-6 transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {mockCreditCards.map((card) => (
            <motion.div
              key={card.id}
              className="min-w-full sm:min-w-[400px] h-56 rounded-2xl p-6 relative overflow-hidden cursor-pointer group"
              whileHover={{ scale: 1.02 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative z-10 h-full flex flex-col justify-between text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Card Balance</p>
                    <p className="text-3xl font-bold">₹{card.balance.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="opacity-90">Credit Used</span>
                      <span className="font-medium">{((card.balance / card.limit) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(card.balance / card.limit) * 100}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs opacity-90 mb-1">{card.name}</p>
                      <p className="text-lg font-mono tracking-wider">•••• {card.last4}</p>
                    </div>
                    <div className="text-xs opacity-90">
                      <p>Limit</p>
                      <p className="font-semibold">₹{(card.limit / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {mockCreditCards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
