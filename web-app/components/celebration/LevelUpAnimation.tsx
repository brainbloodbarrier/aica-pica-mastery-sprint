'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface LevelUpAnimationProps {
  show: boolean
  level: number
  levelName: string
  onClose: () => void
}

export function LevelUpAnimation({
  show,
  level,
  levelName,
  onClose,
}: LevelUpAnimationProps) {
  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180, y: 100 }}
          animate={{ scale: 1, rotate: 0, y: 0 }}
          exit={{ scale: 0, rotate: 180, y: -100 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-lg w-full"
        >
          <Card variant="default" className="relative overflow-hidden">
            {/* Animated background */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  'linear-gradient(45deg, #8b5cf6, #ec4899)',
                  'linear-gradient(45deg, #ec4899, #3b82f6)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 opacity-10"
            />

            <div className="relative text-center py-12 px-6">
              {/* Sparkles */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="inline-block mb-6"
              >
                <Sparkles size={80} className="text-yellow-500" />
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
              >
                LEVEL UP!
              </motion.h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-2xl font-bold mb-4"
              >
                <TrendingUp size={28} />
                Nível {level}
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-semibold text-gray-800 mb-2"
              >
                {levelName}
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600"
              >
                Parabéns! Você está evoluindo! 🎉
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Continuar
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
