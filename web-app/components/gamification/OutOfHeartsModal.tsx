'use client'

import { useHearts } from '@/context/HeartsContext'
import { Heart, Clock, Brain, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface OutOfHeartsModalProps {
  isOpen: boolean
  onClose: () => void
  neurons?: number
  onBuyHeart?: () => void
}

export default function OutOfHeartsModal({
  isOpen,
  onClose,
  neurons = 0,
  onBuyHeart,
}: OutOfHeartsModalProps) {
  const { timeUntilRefill, buyHeart } = useHearts()
  const [isPurchasing, setIsPurchasing] = useState(false)

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  const handleBuyHeart = async () => {
    setIsPurchasing(true)

    // Simulate purchase delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const success = buyHeart(20) // Cost: 20 neurons
    if (success && onBuyHeart) {
      onBuyHeart()
    }

    setIsPurchasing(false)
    onClose()
  }

  const canAffordHeart = neurons >= 20

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 m-4">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Heart className="w-20 h-20 fill-gray-300 text-gray-300" />
                </motion.div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Out of Hearts!
              </h2>

              {/* Description */}
              <p className="text-center text-gray-600 mb-8">
                You've run out of hearts. Choose an option to continue learning:
              </p>

              {/* Options */}
              <div className="space-y-4">
                {/* Wait for Refill */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Wait for Refill</h3>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Hearts refill automatically every 4 hours
                  </p>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatTime(timeUntilRefill)}
                    </div>
                    <div className="text-xs text-blue-500 mt-1">
                      until next heart
                    </div>
                  </div>
                </div>

                {/* Buy with Neurons */}
                <div className={`border-2 rounded-xl p-4 ${
                  canAffordHeart
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Brain className={`w-6 h-6 ${
                      canAffordHeart ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <h3 className={`font-semibold ${
                      canAffordHeart ? 'text-purple-900' : 'text-gray-500'
                    }`}>
                      Buy with Neurons
                    </h3>
                  </div>
                  <p className={`text-sm mb-3 ${
                    canAffordHeart ? 'text-purple-700' : 'text-gray-500'
                  }`}>
                    Get 1 heart instantly
                  </p>
                  <button
                    onClick={handleBuyHeart}
                    disabled={!canAffordHeart || isPurchasing}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      canAffordHeart
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isPurchasing ? (
                      <span>Purchasing...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Brain className="w-5 h-5" />
                        <span>20 Neurons</span>
                      </span>
                    )}
                  </button>
                  {!canAffordHeart && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      You have {neurons} neurons (need 20)
                    </p>
                  )}
                </div>

                {/* Coming Soon: Watch Ad */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 opacity-60">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <h3 className="font-semibold text-gray-500">Watch Ad</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    Watch a short video to get a heart
                  </p>
                  <button
                    disabled
                    className="w-full py-3 rounded-lg font-semibold bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full mt-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
