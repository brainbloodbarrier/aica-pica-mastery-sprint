'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Award, TrendingUp, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getEncouragementMessage } from '@/lib/utils'

interface ModuleCompleteProps {
  show: boolean
  moduleTitle: string
  score: number
  passPercentage: number
  earnedXP: number
  badge?: string
  onContinue: () => void
  onRetry?: () => void
}

export function ModuleComplete({
  show,
  moduleTitle,
  score,
  passPercentage,
  earnedXP,
  badge,
  onContinue,
  onRetry,
}: ModuleCompleteProps) {
  if (!show) return null

  const passed = score >= passPercentage
  const encouragement = getEncouragementMessage(score)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="max-w-2xl w-full"
      >
        <Card variant="default" className="relative">
          <div className="text-center py-8 px-6">
            {/* Status Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-6"
            >
              {passed ? (
                <CheckCircle size={80} className="text-green-500 mx-auto" />
              ) : (
                <X size={80} className="text-red-500 mx-auto" />
              )}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-3xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}
            >
              {passed ? '🎉 Módulo Completo!' : '😔 Quase Lá!'}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-700 mb-6"
            >
              {moduleTitle}
            </motion.p>

            {/* Score */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-6"
            >
              <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {score}%
              </p>
              <p className="text-gray-600">{encouragement}</p>
              {!passed && (
                <p className="text-sm text-gray-500 mt-2">
                  Necessário: {passPercentage}% para passar
                </p>
              )}
            </motion.div>

            {/* Rewards */}
            {passed && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4 mb-6"
              >
                <div className="flex items-center justify-center gap-3 bg-blue-100 rounded-lg p-4">
                  <TrendingUp className="text-blue-600" size={24} />
                  <span className="text-lg font-bold text-blue-800">
                    +{earnedXP} XP
                  </span>
                </div>

                {badge && (
                  <div className="flex items-center justify-center gap-3 bg-yellow-100 rounded-lg p-4">
                    <Award className="text-yellow-600" size={24} />
                    <span className="text-lg font-bold text-yellow-800">
                      Badge: {badge}
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center"
            >
              {!passed && onRetry && (
                <Button variant="secondary" onClick={onRetry}>
                  Tentar Novamente
                </Button>
              )}
              <Button
                variant={passed ? 'success' : 'primary'}
                onClick={onContinue}
              >
                {passed ? 'Próximo Módulo' : 'Voltar ao Dashboard'}
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
