'use client'

import React from 'react'
import { Card } from '@/components/ui/Card'
import { Question as QuestionType } from '@/lib/types'

interface QuestionProps {
  question: QuestionType
  questionNumber: number
  totalQuestions: number
}

export function Question({ question, questionNumber, totalQuestions }: QuestionProps) {
  const difficultyColors = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    hard: 'text-red-600 bg-red-100',
  }

  return (
    <Card variant="gradient" className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          Questão {questionNumber} de {totalQuestions}
        </span>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${difficultyColors[question.difficulty]}`}>
          {question.difficulty === 'easy' && 'Fácil'}
          {question.difficulty === 'medium' && 'Médio'}
          {question.difficulty === 'hard' && 'Difícil'}
        </span>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4 leading-relaxed">
        {question.question}
      </h2>

      {question.type === 'clinical_vignette' && (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4 rounded">
          <p className="text-sm text-gray-700 italic">📋 Vinheta Clínica</p>
        </div>
      )}
    </Card>
  )
}
