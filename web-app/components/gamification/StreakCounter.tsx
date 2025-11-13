'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { isStreakActive } from '@/lib/utils'

interface StreakCounterProps {
  streak: number
  lastStreakDate: string
}

export function StreakCounter({ streak, lastStreakDate }: StreakCounterProps) {
  const isActive = lastStreakDate && isStreakActive(lastStreakDate)

  const getStreakColor = () => {
    if (streak >= 30) return 'from-purple-500 to-pink-500'
    if (streak >= 14) return 'from-orange-500 to-red-500'
    if (streak >= 7) return 'from-yellow-500 to-orange-500'
    return 'from-gray-400 to-gray-500'
  }

  const getMotivationMessage = () => {
    if (streak === 0) return 'Comece sua jornada hoje!'
    if (streak < 7) return `Continue! Faltam ${7 - streak} dias para a próxima conquista!`
    if (streak < 14) return 'Você está pegando fogo! 🔥'
    if (streak < 30) return 'Impressionante! Continue assim!'
    return 'LENDÁRIO! Você é imparável! 🏆'
  }

  return (
    <Card variant="gradient" className="relative overflow-hidden">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-4"
      >
        <motion.div
          animate={isActive ? {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${getStreakColor()} flex items-center justify-center shadow-lg`}
        >
          <Flame className="text-white" size={32} />
        </motion.div>

        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">Sequência Diária</p>
          <p className="text-3xl font-bold text-gray-800 mb-1">
            {streak} {streak === 1 ? 'dia' : 'dias'}
          </p>
          <p className="text-xs text-gray-600">{getMotivationMessage()}</p>
        </div>
      </motion.div>

      {/* Decorative flames */}
      {streak >= 7 && (
        <div className="absolute top-0 right-0 opacity-10">
          <Flame size={80} className="text-orange-500" />
        </div>
      )}
    </Card>
  )
}
