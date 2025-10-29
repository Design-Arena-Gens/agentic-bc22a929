'use client';

import { Bell, Search, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-50 px-6 py-4 border-b border-white/10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg">
              AI
            </div>
            <span className="text-xl font-bold text-gradient">FinanceAI</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions, receipts, insights..."
              className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2.5 hover:bg-white/10 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-3 p-2 pl-3 hover:bg-white/10 rounded-xl transition-colors">
            <span className="hidden sm:block text-sm font-medium">John Doe</span>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
