'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { calculateLevel } from '@/lib/utils'
import { LEVELS } from '@/lib/constants'

interface LevelBadgeProps {
  xp: number
  size?: 'sm' | 'md' | 'lg'
}

export function LevelBadge({ xp, size = 'md' }: LevelBadgeProps) {
  const currentLevel = calculateLevel(xp)

  const sizes = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="flex flex-col items-center gap-2"
    >
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold">{currentLevel.icon}</span>
      </div>
      <div className="text-center">
        <p className={`${textSizes[size]} font-bold text-gray-800`}>
          Nível {currentLevel.level}
        </p>
        <p className={`${textSizes[size]} text-gray-600`}>
          {currentLevel.name}
        </p>
      </div>
    </motion.div>
  )
}
