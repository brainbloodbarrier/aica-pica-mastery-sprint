'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'
import { useGame } from '@/context/GameContext'

interface NeuronsDisplayProps {
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function NeuronsDisplay({ showLabel = true, size = 'md' }: NeuronsDisplayProps) {
  const { gameState } = useGame()

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-2 rounded-lg shadow-sm"
    >
      <Brain className="text-purple-600" size={iconSizes[size]} />
      <div className="flex flex-col">
        <span className={`font-bold text-purple-800 ${sizes[size]}`}>
          {gameState.neurons.toLocaleString()}
        </span>
        {showLabel && (
          <span className="text-xs text-purple-600">Neurons</span>
        )}
      </div>
    </motion.div>
  )
}
