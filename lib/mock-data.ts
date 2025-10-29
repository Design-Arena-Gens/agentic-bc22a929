import { Transaction, Receipt } from './ai-utils';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-10-28',
    description: 'Starbucks Coffee',
    category: 'Food & Dining',
    amount: 450,
    method: 'Credit Card'
  },
  {
    id: '2',
    date: '2025-10-28',
    description: 'Uber Ride',
    category: 'Transportation',
    amount: 280,
    method: 'Wallet'
  },
  {
    id: '3',
    date: '2025-10-27',
    description: 'Amazon Order',
    category: 'Shopping',
    amount: 2599,
    method: 'UPI'
  },
  {
    id: '4',
    date: '2025-10-27',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 649,
    method: 'Credit Card'
  },
  {
    id: '5',
    date: '2025-10-26',
    description: 'Grocery Store',
    category: 'Groceries',
    amount: 1850,
    method: 'Debit Card'
  },
  {
    id: '6',
    date: '2025-10-26',
    description: 'Pizza Hut',
    category: 'Food & Dining',
    amount: 890,
    method: 'UPI'
  },
  {
    id: '7',
    date: '2025-10-25',
    description: 'Gas Station',
    category: 'Transportation',
    amount: 1500,
    method: 'Credit Card'
  },
  {
    id: '8',
    date: '2025-10-25',
    description: 'Pharmacy',
    category: 'Healthcare',
    amount: 380,
    method: 'Cash'
  }
];

export const mockReceipts: Receipt[] = [
  {
    id: 'r1',
    date: '2025-10-28',
    merchant: 'Starbucks Coffee',
    amount: 450,
    category: 'Food & Dining',
    fileUrl: '/receipts/sample.pdf',
    fileType: 'pdf',
    aiSummary: 'Purchase at Starbucks Coffee for ₹450. Items: 1x Cappuccino (₹350), 1x Croissant (₹100). Payment via Credit Card ending in 4242.'
  },
  {
    id: 'r2',
    date: '2025-10-27',
    merchant: 'Amazon',
    amount: 2599,
    category: 'Shopping',
    fileUrl: '/receipts/amazon.pdf',
    fileType: 'image',
    aiSummary: 'Amazon order #402-8234567-8234567. Wireless Mouse (₹1,299) and USB Cable (₹1,300). Delivered on Oct 27, 2025.'
  }
];

export const mockCreditCards = [
  {
    id: '1',
    name: 'Sapphire Reserve',
    last4: '4242',
    balance: 15420,
    limit: 100000,
    type: 'visa',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600'
  },
  {
    id: '2',
    name: 'Platinum Rewards',
    last4: '8888',
    balance: 8200,
    limit: 50000,
    type: 'mastercard',
    gradient: 'from-emerald-400 via-cyan-500 to-blue-500'
  },
  {
    id: '3',
    name: 'Gold Cashback',
    last4: '1234',
    balance: 3100,
    limit: 30000,
    type: 'amex',
    gradient: 'from-blue-400 via-purple-500 to-pink-500'
  }
];

export const mockSpendingData = [
  { name: 'Mon', amount: 850 },
  { name: 'Tue', amount: 1200 },
  { name: 'Wed', amount: 2100 },
  { name: 'Thu', amount: 980 },
  { name: 'Fri', amount: 3400 },
  { name: 'Sat', amount: 2800 },
  { name: 'Sun', amount: 1500 }
];

export const mockCategoryData = [
  { name: 'Food & Dining', value: 5200, color: '#06b6d4' },
  { name: 'Shopping', value: 3800, color: '#3b82f6' },
  { name: 'Transportation', value: 2100, color: '#10b981' },
  { name: 'Entertainment', value: 1500, color: '#8b5cf6' },
  { name: 'Groceries', value: 2800, color: '#14b8a6' },
  { name: 'Healthcare', value: 800, color: '#f59e0b' }
];

export interface SplitGroup {
  id: string;
  name: string;
  members: string[];
  expenses: SplitExpense[];
  totalAmount: number;
}

export interface SplitExpense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: string;
}

export const mockSplitGroups: SplitGroup[] = [
  {
    id: 'g1',
    name: 'Weekend Trip',
    members: ['You', 'Alice', 'Bob', 'Charlie'],
    totalAmount: 12000,
    expenses: [
      {
        id: 'e1',
        description: 'Hotel Booking',
        amount: 8000,
        paidBy: 'You',
        splitBetween: ['You', 'Alice', 'Bob', 'Charlie'],
        date: '2025-10-25'
      },
      {
        id: 'e2',
        description: 'Dinner',
        amount: 4000,
        paidBy: 'Alice',
        splitBetween: ['You', 'Alice', 'Bob', 'Charlie'],
        date: '2025-10-26'
      }
    ]
  },
  {
    id: 'g2',
    name: 'Office Lunch',
    members: ['You', 'David', 'Emma'],
    totalAmount: 1500,
    expenses: [
      {
        id: 'e3',
        description: 'Pizza Order',
        amount: 1500,
        paidBy: 'David',
        splitBetween: ['You', 'David', 'Emma'],
        date: '2025-10-28'
      }
    ]
  }
];
