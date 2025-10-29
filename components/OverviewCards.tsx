'use client';

import { motion } from 'framer-motion';
import { Wallet, TrendingDown, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';

const cards = [
  {
    title: 'Total Balance',
    amount: '₹45,280',
    change: '+12.5%',
    trend: 'up',
    icon: Wallet,
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    title: 'Monthly Spending',
    amount: '₹18,450',
    change: '-5.2%',
    trend: 'down',
    icon: TrendingDown,
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'AI Predicted Next Month',
    amount: '₹20,295',
    change: '+10% buffer',
    trend: 'up',
    icon: TrendingUp,
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    title: 'Wallet',
    amount: '₹12,450',
    change: 'Add Money',
    trend: 'neutral',
    icon: Plus,
    gradient: 'from-emerald-500 to-cyan-600'
  }
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="glass-hover rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              {card.trend !== 'neutral' && (
                <ArrowUpRight className={`w-5 h-5 ${card.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`} />
              )}
            </div>
            <h3 className="text-sm text-gray-400 mb-2">{card.title}</h3>
            <p className="text-3xl font-bold mb-2">{card.amount}</p>
            <p className={`text-sm font-medium ${
              card.trend === 'up' ? 'text-emerald-400' :
              card.trend === 'down' ? 'text-red-400' :
              'text-cyan-400'
            }`}>
              {card.change}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
