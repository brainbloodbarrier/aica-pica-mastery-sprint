'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Trophy, Check } from 'lucide-react'
import { Achievement, getAchievementColor, getAchievementGradient } from '@/lib/achievements'
import { Progress } from '@/components/ui/Progress'

interface AchievementCardProps {
  achievement: Achievement
  progress?: number
  unlocked?: boolean
  onClick?: () => void
}

export function AchievementCard({
  achievement,
  progress = 0,
  unlocked = false,
  onClick,
}: AchievementCardProps) {
  const color = getAchievementColor(achievement.tier)
  const gradient = getAchievementGradient(achievement.tier)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl border-2 p-4 cursor-pointer
        transition-all duration-300
        ${unlocked ? color : 'border-gray-300 bg-gray-50'}
      `}
    >
      {/* Unlocked shine effect */}
      {unlocked && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
        />
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`
          relative p-3 rounded-lg
          ${unlocked ? `bg-gradient-to-br ${gradient}` : 'bg-gray-200'}
        `}>
          <span className="text-2xl">{achievement.icon}</span>
          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
              <Lock className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-bold ${unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
              {achievement.name}
            </h3>
            {unlocked && (
              <Check className="w-4 h-4 text-green-600" />
            )}
          </div>

          <p className={`text-sm mb-2 ${unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
            {achievement.description}
          </p>

          {/* Progress bar */}
          {!unlocked && progress > 0 && (
            <div className="mb-2">
              <Progress
                value={progress}
                showLabel
                color="gray"
                size="sm"
              />
            </div>
          )}

          {/* Rewards */}
          <div className="flex items-center gap-4 text-xs">
            <div className={`flex items-center gap-1 ${unlocked ? 'text-purple-600' : 'text-gray-400'}`}>
              <Trophy className="w-3 h-3" />
              <span>{achievement.reward.xp} XP</span>
            </div>
            <div className={`flex items-center gap-1 ${unlocked ? 'text-purple-600' : 'text-gray-400'}`}>
              <span>🧠</span>
              <span>{achievement.reward.neurons} neurônios</span>
            </div>
          </div>

          {/* Unlock date */}
          {unlocked && achievement.unlockedAt && (
            <p className="text-xs text-gray-500 mt-2">
              Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>

        {/* Tier badge */}
        <div className={`
          px-2 py-1 rounded-full text-xs font-bold uppercase
          ${unlocked
            ? achievement.tier === 'bronze' ? 'bg-orange-200 text-orange-800'
            : achievement.tier === 'silver' ? 'bg-gray-200 text-gray-800'
            : achievement.tier === 'gold' ? 'bg-yellow-200 text-yellow-800'
            : 'bg-purple-200 text-purple-800'
            : 'bg-gray-200 text-gray-500'
          }
        `}>
          {achievement.tier}
        </div>
      </div>
    </motion.div>
  )
}

// Achievement unlock animation modal
interface AchievementUnlockModalProps {
  achievement: Achievement | null
  isOpen: boolean
  onClose: () => void
}

export function AchievementUnlockModal({
  achievement,
  isOpen,
  onClose,
}: AchievementUnlockModalProps) {
  if (!isOpen || !achievement) return null

  const gradient = getAchievementGradient(achievement.tier)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="relative max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Confetti effect */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: 0,
              }}
              transition={{
                duration: 1 + Math.random(),
                ease: 'easeOut',
              }}
              className={`absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-br ${gradient} rounded-full`}
            />
          ))}
        </motion.div>

        {/* Content */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`inline-flex p-6 bg-gradient-to-br ${gradient} rounded-full mb-4`}
          >
            <span className="text-5xl">{achievement.icon}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Conquista Desbloqueada!
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-semibold text-gray-800 mb-2"
          >
            {achievement.name}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-6"
          >
            {achievement.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-6 mb-6"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-900">+{achievement.reward.xp} XP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <span className="font-bold text-purple-900">+{achievement.reward.neurons}</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors"
          >
            Continuar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
