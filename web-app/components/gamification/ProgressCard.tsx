'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { Trophy, Target, CheckCircle } from 'lucide-react'

interface ProgressCardProps {
  completedModules: number
  totalModules: number
  accuracy: number
  badges: string[]
}

export function ProgressCard({
  completedModules,
  totalModules,
  accuracy,
  badges,
}: ProgressCardProps) {
  const progressPercentage = (completedModules / totalModules) * 100

  return (
    <Card variant="gradient">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Target className="text-blue-600" size={24} />
        Progresso Geral
      </h3>

      <div className="space-y-4">
        {/* Module Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 font-medium">Módulos Completos</span>
            <span className="text-sm font-bold text-blue-600">
              {completedModules} / {totalModules}
            </span>
          </div>
          <Progress value={progressPercentage} color="blue" size="md" />
        </div>

        {/* Accuracy */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 font-medium">Taxa de Acerto</span>
            <span className="text-sm font-bold text-green-600">
              {accuracy}%
            </span>
          </div>
          <Progress value={accuracy} color="green" size="md" />
        </div>

        {/* Badges */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="text-yellow-500" size={18} />
            <span className="text-sm text-gray-600 font-medium">Badges Conquistados</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.length > 0 ? (
              badges.map((badge, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-md"
                >
                  {badge}
                </motion.span>
              ))
            ) : (
              <span className="text-xs text-gray-500 italic">
                Nenhum badge conquistado ainda
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
