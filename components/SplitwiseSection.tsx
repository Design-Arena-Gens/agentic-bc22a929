'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { mockSplitGroups } from '@/lib/mock-data';

export default function SplitwiseSection() {
  const calculateBalance = () => {
    let youOwe = 0;
    let owedToYou = 0;

    mockSplitGroups.forEach(group => {
      group.expenses.forEach(expense => {
        const splitAmount = expense.amount / expense.splitBetween.length;
        if (expense.paidBy === 'You') {
          owedToYou += splitAmount * (expense.splitBetween.length - 1);
        } else {
          youOwe += splitAmount;
        }
      });
    });

    return { youOwe, owedToYou };
  };

  const { youOwe, owedToYou } = calculateBalance();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-gradient">Splitwise AI</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass rounded-2xl p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown className="w-10 h-10 text-red-400" />
            <span className="text-xs font-medium text-red-400">You Owe</span>
          </div>
          <p className="text-3xl font-bold text-red-400">₹{youOwe.toFixed(0)}</p>
          <p className="text-sm text-gray-400 mt-2">Across 2 groups</p>
        </div>

        <div className="glass rounded-2xl p-6 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Owed to You</span>
          </div>
          <p className="text-3xl font-bold text-emerald-400">₹{owedToYou.toFixed(0)}</p>
          <p className="text-sm text-gray-400 mt-2">From 3 people</p>
        </div>

        <div className="glass rounded-2xl p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <Plus className="w-10 h-10 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-400">Total</span>
          </div>
          <p className="text-3xl font-bold text-cyan-400">₹{(youOwe + owedToYou).toFixed(0)}</p>
          <button className="mt-2 text-sm text-cyan-400 hover:underline">Create Group</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSplitGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="glass-hover rounded-2xl p-6 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">{group.name}</h3>
                  <p className="text-sm text-gray-400">{group.members.length} members</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-xl font-bold text-cyan-400">₹{group.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-3">
              {group.expenses.map(expense => (
                <div key={expense.id} className="glass rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{expense.description}</span>
                    <span className="font-bold text-cyan-400">₹{expense.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Paid by {expense.paidBy}</span>
                    <span>{expense.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 glass-hover rounded-lg text-sm font-medium text-cyan-400">
              AI Settlement Suggestions
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
