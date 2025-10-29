'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { AIInsight } from '@/lib/ai-utils';

interface AIInsightsSectionProps {
  insights: AIInsight[];
}

const iconMap = {
  warning: AlertCircle,
  tip: Sparkles,
  info: TrendingUp,
  success: Target
};

const colorMap = {
  warning: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
  tip: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
  info: 'from-blue-500/20 to-purple-500/20 border-blue-500/30',
  success: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/30'
};

export default function AIInsightsSection({ insights }: AIInsightsSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-gradient">AI Insights</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.type];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-hover rounded-xl p-5 bg-gradient-to-br ${colorMap[insight.type]} border`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{insight.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4" />
                    <h3 className="font-semibold text-sm">{insight.title}</h3>
                  </div>
                  <p className="text-sm text-gray-300">{insight.message}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
