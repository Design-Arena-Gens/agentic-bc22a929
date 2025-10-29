'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  Receipt,
  CreditCard,
  Users,
  Settings,
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Receipt, label: 'Receipts', active: false },
  { icon: CreditCard, label: 'Cards', active: false },
  { icon: Users, label: 'Splitwise', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-72 glass border-r border-white/10 z-50 flex flex-col",
          "lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold">
              AI
            </div>
            <div>
              <h2 className="font-bold text-gradient">FinanceAI</h2>
              <p className="text-xs text-gray-400">Smart Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                activeItem === item.label
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400"
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium flex-1 text-left">{item.label}</span>
              {activeItem === item.label && (
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              )}
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="glass-hover rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">AI Credits</span>
              <span className="text-xs text-cyan-400">85%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">850 / 1000 requests</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
