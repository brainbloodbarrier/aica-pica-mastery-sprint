'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/cn'

interface OptionsProps {
  options: string[]
  selectedOption: number | null
  correctAnswer: number
  showFeedback: boolean
  onSelect: (index: number) => void
}

export function Options({
  options,
  selectedOption,
  correctAnswer,
  showFeedback,
  onSelect,
}: OptionsProps) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F']

  return (
    <div className="space-y-3 mb-6">
      {options.map((option, index) => {
        const isSelected = selectedOption === index
        const isCorrect = index === correctAnswer
        const isWrong = showFeedback && isSelected && !isCorrect

        let bgColor = 'bg-white hover:bg-gray-50'
        let borderColor = 'border-gray-300'
        let textColor = 'text-gray-800'

        if (showFeedback) {
          if (isCorrect) {
            bgColor = 'bg-green-100'
            borderColor = 'border-green-600'
            textColor = 'text-green-900'
          } else if (isWrong) {
            bgColor = 'bg-red-100'
            borderColor = 'border-red-600'
            textColor = 'text-red-900'
          }
        } else if (isSelected) {
          bgColor = 'bg-blue-100'
          borderColor = 'border-blue-600'
          textColor = 'text-blue-900'
        }

        return (
          <motion.button
            key={index}
            whileHover={!showFeedback ? { scale: 1.02 } : {}}
            whileTap={!showFeedback ? { scale: 0.98 } : {}}
            className={cn(
              'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-3',
              bgColor,
              borderColor,
              textColor,
              showFeedback && 'cursor-default'
            )}
            onClick={() => !showFeedback && onSelect(index)}
            disabled={showFeedback}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm">
              {letters[index]}
            </span>
            <span className="flex-1 font-medium">{option}</span>
            {showFeedback && isCorrect && (
              <Check className="flex-shrink-0 text-green-600" size={24} />
            )}
            {showFeedback && isWrong && (
              <X className="flex-shrink-0 text-red-600" size={24} />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
