// AI utility functions for the finance dashboard

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  method: string;
}

export interface Receipt {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  fileUrl: string;
  fileType: 'pdf' | 'image';
  aiSummary: string;
}

export interface AIInsight {
  type: 'warning' | 'tip' | 'info' | 'success';
  title: string;
  message: string;
  icon: string;
}

export function detectCategory(description: string): string {
  const keywords: Record<string, string[]> = {
    'Food & Dining': ['burger', 'pizza', 'restaurant', 'cafe', 'food', 'starbucks', 'mcdonald'],
    'Transportation': ['uber', 'lyft', 'gas', 'fuel', 'parking', 'metro', 'taxi'],
    'Shopping': ['amazon', 'walmart', 'target', 'mall', 'store', 'shopping'],
    'Entertainment': ['netflix', 'spotify', 'movie', 'concert', 'game', 'entertainment'],
    'Bills & Utilities': ['electric', 'water', 'internet', 'phone', 'bill', 'utility'],
    'Healthcare': ['pharmacy', 'doctor', 'hospital', 'medical', 'health'],
    'Groceries': ['grocery', 'supermarket', 'whole foods', 'trader joe'],
  };

  const lowerDesc = description.toLowerCase();

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => lowerDesc.includes(word))) {
      return category;
    }
  }

  return 'Other';
}

export function generateAIInsights(transactions: Transaction[]): AIInsight[] {
  const insights: AIInsight[] = [];

  // Calculate spending by category
  const categorySpending: Record<string, number> = {};
  transactions.forEach(t => {
    categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
  });

  // Find top spending category
  const topCategory = Object.entries(categorySpending)
    .sort(([, a], [, b]) => b - a)[0];

  if (topCategory && topCategory[1] > 1000) {
    insights.push({
      type: 'warning',
      title: 'High Spending Alert',
      message: `You're spending heavily on ${topCategory[0]} this week (₹${topCategory[1].toLocaleString()})`,
      icon: '⚠️'
    });
  }

  // Savings tip
  insights.push({
    type: 'tip',
    title: 'AI Budget Tip',
    message: 'Consider setting a monthly limit for dining out to save ₹5,000',
    icon: '💡'
  });

  // Positive reinforcement
  if (transactions.length > 0) {
    insights.push({
      type: 'success',
      title: 'Great Job!',
      message: 'You saved 15% more this month compared to last month',
      icon: '🎉'
    });
  }

  // Quick summary
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  insights.push({
    type: 'info',
    title: 'Week Summary',
    message: `Total spending: ₹${totalSpent.toLocaleString()} across ${transactions.length} transactions`,
    icon: '📊'
  });

  return insights;
}

export function predictNextMonthSpending(transactions: Transaction[]): number {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  // Simple prediction: current month average + 10% buffer
  return Math.round(total * 1.1);
}

export async function extractReceiptData(file: File): Promise<Partial<Receipt>> {
  // Simulate AI extraction
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    date: new Date().toISOString().split('T')[0],
    merchant: 'AI Detected Merchant',
    amount: Math.floor(Math.random() * 1000) + 50,
    category: detectCategory(file.name),
    aiSummary: 'AI has successfully extracted transaction details from your receipt. The merchant, amount, and category have been automatically detected.',
    fileType: file.type.includes('pdf') ? 'pdf' : 'image'
  };
}

export function processVoiceCommand(transcript: string): {
  type: 'query' | 'expense' | 'unknown';
  data?: any;
  response: string;
} {
  const lowerTranscript = transcript.toLowerCase();

  // Check if it's an expense recording
  const expenseMatch = lowerTranscript.match(/spent.*?(\d+).*?on\s+(.+)/);
  if (expenseMatch) {
    const amount = parseInt(expenseMatch[1]);
    const description = expenseMatch[2];
    return {
      type: 'expense',
      data: {
        amount,
        description,
        category: detectCategory(description)
      },
      response: `Got it! I've recorded ₹${amount} spent on ${description}. Category: ${detectCategory(description)}`
    };
  }

  // Check if it's a query
  if (lowerTranscript.includes('top spending') || lowerTranscript.includes('most spent')) {
    return {
      type: 'query',
      response: 'Your top spending category this month is Food & Dining with ₹8,500 spent.'
    };
  }

  if (lowerTranscript.includes('balance') || lowerTranscript.includes('total')) {
    return {
      type: 'query',
      response: 'Your current balance is ₹45,280. You have ₹12,450 in your wallet.'
    };
  }

  return {
    type: 'unknown',
    response: "I'm here to help with your finances. Try asking about your spending, balance, or say something like 'I spent 100 rupees on burger'"
  };
}
