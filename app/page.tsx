'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AIInsightsSection from '@/components/AIInsightsSection';
import OverviewCards from '@/components/OverviewCards';
import ChartsSection from '@/components/ChartsSection';
import TransactionsTable from '@/components/TransactionsTable';
import CreditCardsCarousel from '@/components/CreditCardsCarousel';
import SplitwiseSection from '@/components/SplitwiseSection';
import ReceiptScanner from '@/components/ReceiptScanner';
import VoiceAssistant from '@/components/VoiceAssistant';
import ThemeToggle from '@/components/ThemeToggle';
import { mockTransactions } from '@/lib/mock-data';
import { generateAIInsights } from '@/lib/ai-utils';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const insights = generateAIInsights(mockTransactions);

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <AIInsightsSection insights={insights} />
          <OverviewCards />
          <ChartsSection />
          <CreditCardsCarousel />
          <TransactionsTable transactions={mockTransactions} />
          <SplitwiseSection />
        </main>
      </div>

      <ReceiptScanner />
      <VoiceAssistant />
      <ThemeToggle />
    </div>
  );
}
