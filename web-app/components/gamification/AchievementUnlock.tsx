'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import { Achievement } from '@/lib/types'
import { Card } from '@/components/ui/Card'

interface AchievementUnlockProps {
  achievement: Achievement | null
  onClose: () => void
}

export function AchievementUnlock({ achievement, onClose }: AchievementUnlockProps) {
  if (!achievement) return null

  const tierColors = {
    bronze: 'from-amber-700 to-amber-500',
    silver: 'from-gray-400 to-gray-200',
    gold: 'from-yellow-500 to-yellow-300',
    platinum: 'from-blue-400 to-purple-600',
  }

  const tierText = {
    bronze: 'Bronze',
    silver: 'Prata',
    gold: 'Ouro',
    platinum: 'Platina',
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-md w-full"
        >
          <Card variant="default" className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="text-center pt-8 pb-6">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="inline-block mb-4"
              >
                <Trophy size={64} className="text-yellow-500" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🎉 Conquista Desbloqueada!
              </h2>

              <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${tierColors[achievement.tier]} text-white text-sm font-bold mb-4`}>
                {tierText[achievement.tier]}
              </div>

              <div className="text-6xl mb-4">
                {achievement.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {achievement.name}
              </h3>

              <p className="text-gray-600 mb-4">
                {achievement.description}
              </p>

              <div className="bg-blue-100 rounded-lg p-3">
                <p className="text-blue-800 font-bold">
                  +{achievement.xpReward} XP
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
