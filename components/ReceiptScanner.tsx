'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react';
import { extractReceiptData } from '@/lib/ai-utils';

export default function ReceiptScanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setResult(null);

    try {
      const data = await extractReceiptData(file);
      setResult(data);
    } catch (error) {
      console.error('Error processing receipt:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl hover:shadow-cyan-500/50 transition-shadow z-50 animate-glow"
      >
        <Upload className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl glass rounded-2xl p-8 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gradient">AI Receipt Scanner</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!isProcessing && !result && (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                    isDragging ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold mb-2">Upload or Drag Receipt</p>
                      <p className="text-sm text-gray-400">Support for PDF and Image files</p>
                    </div>
                    <label className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-medium cursor-pointer hover:opacity-90 transition-opacity">
                      Choose File
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
              )}

              {isProcessing && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-16 h-16 text-cyan-400 animate-spin mb-4" />
                  <p className="text-lg font-semibold">AI is Processing Your Receipt...</p>
                  <p className="text-sm text-gray-400 mt-2">Extracting transaction details</p>
                </div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <div>
                      <p className="font-semibold">Receipt Processed Successfully</p>
                      <p className="text-sm text-gray-300">{result.aiSummary}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-1">Date</p>
                      <p className="font-semibold">{result.date}</p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-1">Merchant</p>
                      <p className="font-semibold">{result.merchant}</p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-1">Amount</p>
                      <p className="font-semibold text-cyan-400 text-xl">₹{result.amount}</p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-1">Category</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        {result.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setResult(null);
                        setIsOpen(false);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      Save Transaction
                    </button>
                    <button
                      onClick={() => setResult(null)}
                      className="px-6 py-3 glass-hover rounded-xl font-medium"
                    >
                      Scan Another
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
