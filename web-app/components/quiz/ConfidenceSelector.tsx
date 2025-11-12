'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'

interface ConfidenceSelectorProps {
  onSelect: (confidence: 1 | 2 | 3 | 4 | 5) => void
  isCorrect: boolean
}

export function ConfidenceSelector({ onSelect, isCorrect }: ConfidenceSelectorProps) {
  const confidenceLevels = [
    { value: 1 as const, emoji: '😰', label: 'Chutei', color: 'hover:bg-red-100' },
    { value: 2 as const, emoji: '😕', label: 'Inseguro', color: 'hover:bg-orange-100' },
    { value: 3 as const, emoji: '😐', label: 'Neutro', color: 'hover:bg-yellow-100' },
    { value: 4 as const, emoji: '😊', label: 'Confiante', color: 'hover:bg-green-100' },
    { value: 5 as const, emoji: '🤩', label: 'Certeza', color: 'hover:bg-blue-100' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card variant="bordered" className="bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {isCorrect ? '🎉 Correto!' : '😔 Errou'} - Qual sua confiança?
          </h3>
          <p className="text-sm text-gray-600">
            Isso nos ajuda a programar revisões no momento ideal
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {confidenceLevels.map((level) => (
            <motion.button
              key={level.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(level.value)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white transition-all ${level.color}`}
            >
              <span className="text-3xl mb-1">{level.emoji}</span>
              <span className="text-xs font-semibold text-gray-700">{level.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>← Revisar em 1 dia</span>
          <span>Revisar em 30 dias →</span>
        </div>
      </Card>
    </motion.div>
  )
}
