'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  color: 'blue' | 'green' | 'purple' | 'red' | 'yellow'
  trend?: {
    value: number
    positive: boolean
  }
}

export function StatsCard({ icon: Icon, label, value, color, trend }: StatsCardProps) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    red: 'text-red-600 bg-red-100',
    yellow: 'text-yellow-600 bg-yellow-100',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card variant="default" className="relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
            <Icon size={28} />
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>

            {trend && (
              <p className={`text-xs mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% vs último período
              </p>
            )}
          </div>
        </div>

        {/* Decorative background */}
        <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full ${colorClasses[color]} opacity-10`} />
      </Card>
    </motion.div>
  )
}
