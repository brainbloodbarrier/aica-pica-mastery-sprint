'use client'

import { useNeurons } from '@/context/NeuronsContext'
import { Brain } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function NeuronsDisplay() {
  const { neurons } = useNeurons()

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl border border-purple-200">
      <Brain className="w-6 h-6 text-purple-600" />
      <div className="flex flex-col">
        <span className="text-xs text-purple-600 font-medium">Neurons</span>
        <span className="text-lg font-bold text-purple-900">{neurons.toLocaleString()}</span>
      </div>
    </div>
  )
}

// Compact version for navigation
export function NeuronsDisplayCompact() {
  const { neurons } = useNeurons()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200"
    >
      <Brain className="w-4 h-4 text-purple-600" />
      <span className="text-sm font-bold text-purple-900">{neurons.toLocaleString()}</span>
    </motion.div>
  )
}

// Neurons earned popup
interface NeuronsEarnedPopupProps {
  amount: number
  reason: string
  show: boolean
  onComplete?: () => void
}

export function NeuronsEarnedPopup({ amount, reason, show, onComplete }: NeuronsEarnedPopupProps) {
  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <Brain className="w-8 h-8" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{amount}</span>
              <span className="text-sm opacity-90">{reason}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Neurons balance with pulse animation on change
export function NeuronsDisplayAnimated() {
  const { neurons } = useNeurons()
  const [previousNeurons, setPreviousNeurons] = useState(neurons)
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    if (neurons !== previousNeurons) {
      setShowPulse(true)
      setPreviousNeurons(neurons)
      const timer = setTimeout(() => setShowPulse(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [neurons, previousNeurons])

  return (
    <motion.div
      animate={showPulse ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl border border-purple-200"
    >
      <motion.div
        animate={showPulse ? { rotate: [0, 360] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Brain className="w-6 h-6 text-purple-600" />
      </motion.div>
      <div className="flex flex-col">
        <span className="text-xs text-purple-600 font-medium">Neurons</span>
        <motion.span
          key={neurons}
          initial={{ scale: 1.2, color: '#7c3aed' }}
          animate={{ scale: 1, color: '#581c87' }}
          className="text-lg font-bold"
        >
          {neurons.toLocaleString()}
        </motion.span>
      </div>
    </motion.div>
  )
}

// Transaction history item
export function TransactionItem({ transaction }: { transaction: any }) {
  const isEarn = transaction.type === 'earn'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${
          isEarn ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <Brain className={`w-4 h-4 ${
            isEarn ? 'text-green-600' : 'text-red-600'
          }`} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{transaction.reason}</span>
          <span className="text-xs text-gray-500">
            {new Date(transaction.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
      <span className={`text-lg font-bold ${
        isEarn ? 'text-green-600' : 'text-red-600'
      }`}>
        {isEarn ? '+' : '-'}{transaction.amount}
      </span>
    </motion.div>
  )
}

// Neurons history list
export function NeuronsHistory() {
  const { transactions } = useNeurons()

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No transactions yet</p>
      ) : (
        <div className="space-y-2">
          {transactions.slice(0, 20).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  )
}
