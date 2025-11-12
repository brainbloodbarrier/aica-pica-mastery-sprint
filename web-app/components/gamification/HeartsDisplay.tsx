'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useGame } from '@/context/GameContext'

export function HeartsDisplay() {
  const { gameState } = useGame()
  const [timeToRefill, setTimeToRefill] = useState('')

  useEffect(() => {
    const calculateTimeToRefill = () => {
      if (gameState.hearts >= 5) {
        setTimeToRefill('')
        return
      }

      const lastRefill = new Date(gameState.lastHeartRefill)
      const now = new Date()
      const fourHours = 4 * 60 * 60 * 1000
      const timeSinceRefill = now.getTime() - lastRefill.getTime()
      const timeUntilRefill = fourHours - (timeSinceRefill % fourHours)

      const hours = Math.floor(timeUntilRefill / (60 * 60 * 1000))
      const minutes = Math.floor((timeUntilRefill % (60 * 60 * 1000)) / (60 * 1000))

      setTimeToRefill(`${hours}h ${minutes}m`)
    }

    calculateTimeToRefill()
    const interval = setInterval(calculateTimeToRefill, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [gameState.hearts, gameState.lastHeartRefill])

  const heartArray = Array.from({ length: 5 }, (_, i) => i < gameState.hearts)

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {heartArray.map((filled, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Heart
              size={24}
              className={filled ? 'fill-red-500 text-red-500' : 'text-gray-300'}
            />
          </motion.div>
        ))}
      </div>

      {gameState.hearts < 5 && timeToRefill && (
        <span className="text-xs text-gray-500 ml-2">
          +1 em {timeToRefill}
        </span>
      )}
    </div>
  )
}
