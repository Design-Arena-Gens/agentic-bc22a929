'use client';

import { motion } from 'framer-motion';
import { Filter, Download } from 'lucide-react';
import { Transaction } from '@/lib/ai-utils';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          Recent Transactions
        </h3>
        <div className="flex gap-2">
          <button className="glass-hover px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="glass-hover px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Description</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Category</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <td className="py-4 px-4 text-sm text-gray-300">{transaction.date}</td>
                <td className="py-4 px-4 text-sm font-medium">{transaction.description}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {transaction.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-bold text-right">₹{transaction.amount.toLocaleString()}</td>
                <td className="py-4 px-4 text-sm text-gray-400">{transaction.method}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
