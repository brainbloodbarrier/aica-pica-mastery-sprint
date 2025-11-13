'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface ConfidenceRatingProps {
  onRate: (confidence: number) => void
  show: boolean
}

const confidenceLevels = [
  { value: 1, label: 'Chutei', emoji: '😰', color: 'bg-red-100 hover:bg-red-200 border-red-300', selectedColor: 'bg-red-300 border-red-500' },
  { value: 2, label: 'Inseguro', emoji: '😕', color: 'bg-orange-100 hover:bg-orange-200 border-orange-300', selectedColor: 'bg-orange-300 border-orange-500' },
  { value: 3, label: 'Meio certo', emoji: '😐', color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300', selectedColor: 'bg-yellow-300 border-yellow-500' },
  { value: 4, label: 'Confiante', emoji: '😊', color: 'bg-blue-100 hover:bg-blue-200 border-blue-300', selectedColor: 'bg-blue-300 border-blue-500' },
  { value: 5, label: 'Certeza!', emoji: '🤩', color: 'bg-green-100 hover:bg-green-200 border-green-300', selectedColor: 'bg-green-300 border-green-500' },
]

export function ConfidenceRating({ onRate, show }: ConfidenceRatingProps) {
  const [selectedConfidence, setSelectedConfidence] = useState<number | null>(null)

  const handleSelect = (value: number) => {
    setSelectedConfidence(value)
    setTimeout(() => {
      onRate(value)
      setSelectedConfidence(null)
    }, 500)
  }

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 shadow-xl border border-purple-200 mb-6"
    >
      <h3 className="text-lg font-bold mb-2 text-gray-800">Como você se sente sobre sua resposta?</h3>
      <p className="text-sm text-gray-600 mb-4">Isso nos ajuda a personalizar sua revisão</p>

      <div className="grid grid-cols-5 gap-3">
        {confidenceLevels.map((level) => {
          const isSelected = selectedConfidence === level.value

          return (
            <motion.button
              key={level.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(level.value)}
              className={`
                p-3 rounded-xl border-2 transition-all transform
                ${isSelected ? level.selectedColor : level.color}
                cursor-pointer
                ${isSelected ? 'ring-2 ring-purple-400 ring-offset-2' : ''}
                flex flex-col items-center justify-center
              `}
            >
              <motion.div
                className="text-3xl mb-1"
                animate={isSelected ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {level.emoji}
              </motion.div>
              <div className="text-xs font-bold">{level.label}</div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-purple-600 rounded-full mt-1"
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {selectedConfidence && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-gray-600">
            {selectedConfidence <= 2 && '📚 Vamos revisar isso em breve!'}
            {selectedConfidence === 3 && '📖 Bom trabalho! Revisaremos em alguns dias.'}
            {selectedConfidence >= 4 && '🎯 Excelente! Você está dominando o conteúdo!'}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
