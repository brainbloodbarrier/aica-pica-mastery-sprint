'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useGame } from '@/context/GameContext'
import { ProgressOverview } from '@/components/dashboard/ProgressOverview'
import { ModuleGrid } from '@/components/dashboard/ModuleGrid'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Trophy } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { gameState, modules, updateStreak } = useGame()

  // Update streak on dashboard visit
  useEffect(() => {
    updateStreak()
  }, [updateStreak])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Voltar
            </Button>

            {gameState.badges.length > 0 && (
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
                <Trophy className="text-yellow-600" size={20} />
                <span className="text-sm font-bold text-yellow-800">
                  {gameState.badges.length} {gameState.badges.length === 1 ? 'Badge' : 'Badges'}
                </span>
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Meu Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Bem-vindo de volta! Continue sua jornada de domínio AICA/PICA
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <ProgressOverview />
        </motion.div>

        {/* Modules Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Módulos de Aprendizado</h2>
            <p className="text-gray-600">
              Selecione um módulo para começar ou continuar seu estudo
            </p>
          </div>

          <ModuleGrid
            modules={modules}
            moduleScores={gameState.progress.moduleScores}
          />
        </motion.div>
      </div>
    </div>
  )
}
