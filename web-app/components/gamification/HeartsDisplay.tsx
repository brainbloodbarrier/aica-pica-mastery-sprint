'use client'

import { useHearts } from '@/context/HeartsContext'
import { Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HeartsDisplay() {
  const { hearts, maxHearts, timeUntilRefill } = useHearts()

  // Format time until refill
  const formatTime = (seconds: number): string => {
    if (seconds === 0) return 'Full'

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Hearts Display */}
      <div className="flex items-center gap-1">
        <AnimatePresence mode="popLayout">
          {Array.from({ length: maxHearts }).map((_, index) => {
            const isFilled = index < hearts
            return (
              <motion.div
                key={index}
                initial={{ scale: 1 }}
                animate={{
                  scale: isFilled ? 1 : 0.8,
                  opacity: isFilled ? 1 : 0.3
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFilled
                      ? 'fill-red-500 text-red-500'
                      : 'fill-gray-300 text-gray-300'
                  }`}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Hearts Count and Refill Timer */}
      <div className="flex flex-col items-center gap-1 text-sm">
        <span className="font-semibold text-gray-700">
          {hearts}/{maxHearts} Hearts
        </span>
        {hearts < maxHearts && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gray-500"
          >
            Next in {formatTime(timeUntilRefill)}
          </motion.span>
        )}
      </div>
    </div>
  )
}

// Compact version for navigation bar
export function HeartsDisplayCompact() {
  const { hearts, maxHearts, timeUntilRefill } = useHearts()

  const formatTime = (seconds: number): string => {
    if (seconds === 0) return ''
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxHearts }).map((_, index) => (
          <Heart
            key={index}
            className={`w-4 h-4 ${
              index < hearts
                ? 'fill-red-500 text-red-500'
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
      {hearts < maxHearts && timeUntilRefill > 0 && (
        <span className="text-xs text-gray-500">
          {formatTime(timeUntilRefill)}
        </span>
      )}
    </motion.div>
  )
}

// Animated heart loss
export function HeartLossAnimation({ onComplete }: { onComplete?: () => void }) {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 1 }}
      animate={{
        scale: [1, 1.5, 0],
        opacity: [1, 1, 0],
        y: [-50, -100, -150],
      }}
      transition={{ duration: 1 }}
      onAnimationComplete={onComplete}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <Heart className="w-16 h-16 fill-red-500 text-red-500" />
    </motion.div>
  )
}

// Animated heart refill
export function HeartRefillAnimation({ onComplete }: { onComplete?: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.5, 1],
        opacity: [0, 1, 1],
      }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={onComplete}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <Heart className="w-16 h-16 fill-red-500 text-red-500" />
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
      >
        <Heart className="w-16 h-16 fill-red-500 text-red-500" />
      </motion.div>
    </motion.div>
  )
}
