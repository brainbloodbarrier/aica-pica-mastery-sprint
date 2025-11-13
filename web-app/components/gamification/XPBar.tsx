'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/Progress'
import { calculateXPProgress } from '@/lib/utils'
import { Zap } from 'lucide-react'

interface XPBarProps {
  xp: number
  animated?: boolean
}

export function XPBar({ xp, animated = true }: XPBarProps) {
  const [displayXP, setDisplayXP] = useState(xp)
  const { current, required, percentage } = calculateXPProgress(displayXP)

  useEffect(() => {
    if (animated && xp !== displayXP) {
      const duration = 500
      const steps = 20
      const increment = (xp - displayXP) / steps
      let step = 0

      const interval = setInterval(() => {
        step++
        setDisplayXP(prev => {
          const newValue = prev + increment
          if (step >= steps) {
            clearInterval(interval)
            return xp
          }
          return newValue
        })
      }, duration / steps)

      return () => clearInterval(interval)
    }
  }, [xp, displayXP, animated])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="text-yellow-500" size={20} />
          <span className="text-sm font-semibold text-gray-700">Experiência</span>
        </div>
        <span className="text-sm font-bold text-blue-600">
          {Math.round(displayXP)} XP
        </span>
      </div>

      <Progress value={percentage} color="blue" size="md" />

      <p className="text-xs text-gray-500 mt-2 text-center">
        {current} / {required} XP para o próximo nível
      </p>
    </motion.div>
  )
}
