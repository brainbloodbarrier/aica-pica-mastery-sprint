'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface FeedbackProps {
  isCorrect: boolean
  explanation: string
  source: string
}

export function Feedback({ isCorrect, explanation, source }: FeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        variant="bordered"
        className={`mb-6 ${isCorrect ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'}`}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <CheckCircle className="flex-shrink-0 text-green-600 mt-1" size={28} />
          ) : (
            <XCircle className="flex-shrink-0 text-red-600 mt-1" size={28} />
          )}
          <div className="flex-1">
            <h3 className={`text-lg font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '🎉 Correto!' : '❌ Incorreto'}
            </h3>
            <p className="text-gray-700 mb-3 leading-relaxed">{explanation}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen size={16} />
              <span className="font-medium">Fonte: {source}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
