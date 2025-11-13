'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Lock, Check, Play, Clock, Trophy } from 'lucide-react'
import { Module } from '@/lib/types'

interface ModuleGridProps {
  modules: Module[]
  moduleScores: Record<number, number>
}

export function ModuleGrid({ modules, moduleScores }: ModuleGridProps) {
  const router = useRouter()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {modules.map((module) => {
        const isCompleted = module.id in moduleScores
        const score = moduleScores[module.id]
        const isLocked = module.locked

        return (
          <motion.div key={module.id} variants={item}>
            <Card
              variant={isLocked ? 'bordered' : 'default'}
              hoverable={!isLocked}
              onClick={() => !isLocked && router.push(`/module/${module.id}`)}
              className={`relative ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {isLocked ? (
                  <Lock className="text-gray-400" size={24} />
                ) : isCompleted ? (
                  <Check className="text-green-600" size={28} />
                ) : (
                  <Play className="text-blue-600" size={24} />
                )}
              </div>

              {/* Module Info */}
              <div className="pr-12">
                <div className="text-sm font-bold text-blue-600 mb-1">
                  Módulo {module.id}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {module.description}
                </p>

                {/* Metadata */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={14} />
                    <span>{module.duration}</span>
                  </div>

                  {module.badge && (
                    <div className="flex items-center gap-2 text-xs text-yellow-600">
                      <Trophy size={14} />
                      <span className="font-semibold">{module.badge}</span>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-bold text-green-600">
                        Pontuação: {score}%
                      </p>
                    </div>
                  )}

                  {isLocked && module.prerequisite && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Complete o Módulo {module.prerequisite} primeiro
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
