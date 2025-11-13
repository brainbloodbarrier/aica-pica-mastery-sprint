'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Shield, TrendingUp, Calendar, Award } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { useHearts } from '@/context/HeartsContext'
import { useNeurons } from '@/context/NeuronsContext'

export function EnhancedStreakCounter() {
  const { gameState } = useGame()
  const { freezesAvailable } = useHearts()
  const { neurons, spendNeurons } = useNeurons()
  const [showDetails, setShowDetails] = useState(false)

  const streak = gameState.streak.currentStreak
  const lastActivity = gameState.streak.lastActivityDate
  const longestStreak = gameState.streak.longestStreak

  // Determine fire intensity based on streak
  const getFireIntensity = () => {
    if (streak === 0) return { fires: 0, color: 'text-gray-400', glow: '' }
    if (streak < 3) return { fires: 1, color: 'text-orange-400', glow: 'drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]' }
    if (streak < 7) return { fires: 2, color: 'text-orange-500', glow: 'drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]' }
    if (streak < 30) return { fires: 3, color: 'text-orange-600', glow: 'drop-shadow-[0_0_16px_rgba(234,88,12,0.7)]' }
    if (streak < 100) return { fires: 4, color: 'text-red-600', glow: 'drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]' }
    return { fires: 5, color: 'text-blue-600', glow: 'drop-shadow-[0_0_25px_rgba(37,99,235,0.9)]' }
  }

  const { fires, color, glow } = getFireIntensity()

  // Get motivational message based on streak
  const getMotivationalMessage = () => {
    if (streak === 0) return 'Comece sua sequência hoje!'
    if (streak === 1) return 'Ótimo começo! Continue amanhã!'
    if (streak < 3) return 'Continue assim! 🔥'
    if (streak < 7) return 'Você está pegando fogo! 🔥🔥'
    if (streak < 14) return 'Uma semana completa! Incrível! 🔥🔥🔥'
    if (streak < 30) return 'Imparável! Continue queimando! 🔥🔥🔥🔥'
    if (streak < 100) return 'Lendário! Um mês de dedicação! 🔥🔥🔥🔥🔥'
    return '🌟 MÍTICO! Você é uma lenda! 🌟'
  }

  const handleBuyFreeze = async () => {
    const cost = 50
    if (neurons >= cost) {
      const success = spendNeurons(cost, 'Comprar proteção de streak')
      if (success) {
        // Freeze will be added through hearts context
      }
    }
  }

  return (
    <div className="relative">
      {/* Main Streak Display */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowDetails(!showDetails)}
        className={`
          relative p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl
          border-2 border-orange-200 cursor-pointer transition-all
          ${streak > 0 ? 'shadow-lg' : 'shadow-md'}
        `}
      >
        {/* Fire Animation */}
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <motion.div
              animate={{
                scale: streak > 0 ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: streak > 0 ? Infinity : 0,
                repeatType: 'reverse',
              }}
              className="relative"
            >
              {/* Fire icons based on intensity */}
              <div className="flex items-center">
                {Array.from({ length: Math.min(fires, 5) }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`${color} ${glow}`}
                  >
                    <Flame className={`w-${6 + i} h-${6 + i}`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Streak number */}
            <motion.div
              key={streak}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-2 -right-2 bg-white rounded-full px-2 py-1 shadow-md"
            >
              <span className={`text-xl font-bold ${color}`}>{streak}</span>
            </motion.div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">
              {streak > 0 ? `${streak} dias de streak!` : 'Sem streak ativo'}
            </h3>
            <p className="text-sm text-gray-600">{getMotivationalMessage()}</p>
          </div>
        </div>

        {/* Streak Protection */}
        {freezesAvailable > 0 && (
          <div className="flex items-center gap-2 mt-3 p-2 bg-blue-50 rounded-lg">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">
              {freezesAvailable} proteção(ões) disponível(is)
            </span>
          </div>
        )}

        {/* Streak milestones */}
        {streak > 0 && (
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
            {streak >= 7 && (
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-yellow-600" />
                <span>Semana</span>
              </div>
            )}
            {streak >= 30 && (
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-purple-600" />
                <span>Mês</span>
              </div>
            )}
            {streak >= 100 && (
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-blue-600" />
                <span>Centenário</span>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Expanded Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-white rounded-xl border border-gray-200"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-semibold text-gray-700">Streak Atual</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{streak} dias</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">Maior Streak</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{longestStreak} dias</p>
              </div>
            </div>

            {/* Last Activity */}
            <div className="p-3 bg-blue-50 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">
                  Última atividade: {lastActivity ? new Date(lastActivity).toLocaleDateString('pt-BR') : 'Nunca'}
                </span>
              </div>
            </div>

            {/* Buy Freeze Button */}
            {freezesAvailable < 3 && (
              <button
                onClick={handleBuyFreeze}
                disabled={neurons < 50}
                className={`
                  w-full p-3 rounded-lg font-semibold transition-all
                  ${neurons >= 50
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Comprar Proteção (50 🧠)</span>
                </div>
              </button>
            )}

            {/* Streak Rewards Info */}
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-2">Próximas Recompensas:</h4>
              <div className="space-y-1">
                {streak < 7 && (
                  <div className="text-xs text-purple-700">
                    • 7 dias: 50 neurônios + Badge Guerreiro Semanal
                  </div>
                )}
                {streak < 30 && (
                  <div className="text-xs text-purple-700">
                    • 30 dias: 200 neurônios + Badge Imparável
                  </div>
                )}
                {streak < 100 && (
                  <div className="text-xs text-purple-700">
                    • 100 dias: 1000 neurônios + Badge Lendário
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
