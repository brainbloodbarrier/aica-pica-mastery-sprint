'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Brain, Target, Trophy, Zap, BookOpen, Award } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: Brain,
      title: 'Aprendizado Interativo',
      description: '130 questões médicas validadas sobre anatomia AICA/PICA',
    },
    {
      icon: Zap,
      title: 'Gamificação Avançada',
      description: 'Sistema de XP, níveis, streaks e conquistas para manter você motivado',
    },
    {
      icon: Target,
      title: '10 Módulos Progressivos',
      description: 'Caminho estruturado desde conceitos básicos até maestria cirúrgica',
    },
    {
      icon: Trophy,
      title: 'Badges & Conquistas',
      description: 'Desbloqueie badges exclusivos e conquistas de bronze até platina',
    },
    {
      icon: BookOpen,
      title: 'Conteúdo Validado',
      description: 'Baseado em Rhoton\'s Microsurgical Anatomy - padrão ouro em neuroanatomia',
    },
    {
      icon: Award,
      title: 'Certificação Final',
      description: 'Certificado de maestria AICA/PICA ao completar todos os módulos',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Brain size={48} className="text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              AICA-PICA Mastery Sprint
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
              Domine a anatomia microcirúrgica das artérias AICA e PICA através de um sistema gamificado de aprendizado interativo
            </p>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Sistema de educação médica profissional com 130 questões validadas, gamificação avançada e progresso personalizado
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/dashboard')}
                className="text-lg"
              >
                Começar Agora 🚀
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-lg"
              >
                Saiba Mais
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: '10', label: 'Módulos' },
              { value: '130', label: 'Questões' },
              { value: '12-16h', label: 'Duração' },
              { value: '8', label: 'Badges' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Por que escolher AICA-PICA Mastery Sprint?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma plataforma completa que combina rigor acadêmico com engagement de nível Duolingo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card variant="default" hoverable className="h-full">
                  <div className="flex flex-col items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                      <feature.icon className="text-blue-600" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="gradient" className="text-center py-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Pronto para dominar AICA e PICA?
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Comece sua jornada de aprendizado hoje e torne-se um especialista em anatomia cerebelar
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/dashboard')}
                className="text-lg"
              >
                Iniciar Mastery Sprint 🎯
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            AICA-PICA Mastery Sprint © 2025 | Educação Médica Gamificada
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Conteúdo baseado em Rhoton's Microsurgical Anatomy
          </p>
        </div>
      </footer>
    </div>
  )
}
