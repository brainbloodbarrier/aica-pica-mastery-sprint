'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Calendar, TrendingUp, AlertCircle, Target, BookOpen } from 'lucide-react'
import { useReview } from '@/context/ReviewContext'
import { Progress } from '@/components/ui/Progress'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export function ReviewDashboard() {
  const router = useRouter()
  const {
    dueQuestions,
    upcomingReviews,
    recommendations,
    getModuleMastery,
    getWeakAreas,
  } = useReview()

  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  // Get weak areas
  const weakAreas = getWeakAreas()

  // Calculate overall mastery across all modules
  const overallMastery = Array.from({ length: 10 }, (_, i) => getModuleMastery(i + 1))
    .reduce((sum, mastery) => sum + mastery, 0) / 10

  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return 'Hoje'
    if (date.toDateString() === tomorrow.toDateString()) return 'Amanhã'

    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Questions Due Today */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-gray-800">Para Hoje</h3>
          </div>
          <p className="text-3xl font-bold text-red-600">{dueQuestions.length}</p>
          <p className="text-sm text-gray-600">questões para revisar</p>
        </motion.div>

        {/* Overall Mastery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Maestria Geral</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{Math.round(overallMastery)}%</p>
          <Progress value={overallMastery} color="purple" size="sm" className="mt-2" />
        </motion.div>

        {/* Weak Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-gray-800">Áreas Fracas</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{weakAreas.length}</p>
          <p className="text-sm text-gray-600">questões com baixa maestria</p>
        </motion.div>

        {/* Total Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-800">Total</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {Array.from(upcomingReviews.values()).reduce((sum, items) => sum + items.length, 0)}
          </p>
          <p className="text-sm text-gray-600">revisões nos próximos 7 dias</p>
        </motion.div>
      </div>

      {/* Study Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-white rounded-xl border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recomendações de Estudo</h2>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`
                  p-4 rounded-lg border-l-4
                  ${rec.type === 'urgent' ? 'bg-red-50 border-red-500' :
                    rec.type === 'review' ? 'bg-blue-50 border-blue-500' :
                    rec.type === 'practice' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-green-50 border-green-500'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold
                      ${rec.type === 'urgent' ? 'text-red-700' :
                        rec.type === 'review' ? 'text-blue-700' :
                        rec.type === 'practice' ? 'text-yellow-700' :
                        'text-green-700'}
                    `}>
                      {rec.message}
                    </p>
                    {rec.moduleId && (
                      <p className="text-sm text-gray-600 mt-1">
                        Foco no Módulo {rec.moduleId}
                      </p>
                    )}
                  </div>
                  {rec.type !== 'mastered' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/review')}
                    >
                      Revisar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Upcoming Reviews Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-white rounded-xl border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Calendário de Revisões</h2>
          <Calendar className="w-5 h-5 text-gray-600" />
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from(upcomingReviews.entries()).map(([dateStr, items]) => {
            const isSelected = selectedDay === dateStr
            const hasItems = items.length > 0
            const isToday = dateStr === new Date().toISOString().split('T')[0]

            return (
              <motion.button
                key={dateStr}
                whileHover={hasItems ? { scale: 1.05 } : {}}
                whileTap={hasItems ? { scale: 0.95 } : {}}
                onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                disabled={!hasItems}
                className={`
                  p-3 rounded-lg border-2 transition-all
                  ${isSelected ? 'border-purple-500 bg-purple-50' :
                    hasItems ? 'border-gray-200 bg-white hover:border-gray-300' :
                    'border-gray-100 bg-gray-50 cursor-not-allowed'}
                  ${isToday ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
                `}
              >
                <div className="text-xs font-medium text-gray-600 mb-1">
                  {formatDate(dateStr)}
                </div>
                <div className={`text-lg font-bold
                  ${hasItems ? 'text-purple-600' : 'text-gray-400'}
                `}>
                  {items.length}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Selected Day Details */}
        {selectedDay && upcomingReviews.get(selectedDay) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-purple-50 rounded-lg"
          >
            <h3 className="font-semibold text-purple-900 mb-2">
              {formatDate(selectedDay)} - {upcomingReviews.get(selectedDay)!.length} questões
            </h3>
            <div className="space-y-2">
              {upcomingReviews.get(selectedDay)!.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700">
                      Módulo {item.moduleId} - Questão #{item.questionId.slice(-4)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Maestria:</span>
                    <Progress value={item.mastery} color="purple" size="xs" className="w-16" />
                  </div>
                </div>
              ))}
              {upcomingReviews.get(selectedDay)!.length > 5 && (
                <p className="text-sm text-purple-700 text-center">
                  e mais {upcomingReviews.get(selectedDay)!.length - 5} questões...
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Module Mastery Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 bg-white rounded-xl border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Maestria por Módulo</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }, (_, i) => {
            const moduleId = i + 1
            const mastery = getModuleMastery(moduleId)
            const color = mastery >= 80 ? 'green' : mastery >= 50 ? 'yellow' : 'red'

            return (
              <div key={moduleId} className="text-center">
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-gray-700">Módulo {moduleId}</h4>
                </div>
                <div className="relative">
                  <svg className="w-20 h-20 mx-auto">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${mastery * 2.26} 226`}
                      strokeDashoffset="0"
                      className={`
                        transform -rotate-90 origin-center transition-all duration-500
                        ${color === 'green' ? 'text-green-500' :
                          color === 'yellow' ? 'text-yellow-500' :
                          'text-red-500'}
                      `}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-lg font-bold
                      ${color === 'green' ? 'text-green-600' :
                        color === 'yellow' ? 'text-yellow-600' :
                        'text-red-600'}
                    `}>
                      {Math.round(mastery)}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Start Review Button */}
      {dueQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/review')}
            className="px-8 py-4 text-lg"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Iniciar Revisão ({dueQuestions.length} questões)
          </Button>
        </motion.div>
      )}
    </div>
  )
}
