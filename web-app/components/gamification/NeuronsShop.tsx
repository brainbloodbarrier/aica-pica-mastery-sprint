'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Heart, Shield, Sparkles, X, Check } from 'lucide-react'
import { useNeurons, NEURON_COSTS } from '@/context/NeuronsContext'
import { useHearts } from '@/context/HeartsContext'
import { Button } from '@/components/ui/Button'

interface ShopItem {
  id: string
  name: string
  description: string
  cost: number
  icon: React.ElementType
  color: string
  action: () => boolean
}

export default function NeuronsShop() {
  const { neurons, spendNeurons } = useNeurons()
  const { buyHeart, buyFreeze, hearts, maxHearts, freezesAvailable } = useHearts()
  const [purchasingItem, setPurchasingItem] = useState<string | null>(null)
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null)

  const shopItems: ShopItem[] = [
    {
      id: 'heart',
      name: 'Coração Extra',
      description: 'Ganhe 1 coração instantaneamente',
      cost: NEURON_COSTS.BUY_HEART,
      icon: Heart,
      color: 'text-red-500',
      action: () => {
        if (hearts >= maxHearts) {
          alert('Você já tem o máximo de corações!')
          return false
        }
        const success = spendNeurons(NEURON_COSTS.BUY_HEART, 'Comprar coração')
        if (success) {
          buyHeart(NEURON_COSTS.BUY_HEART)
        }
        return success
      },
    },
    {
      id: 'freeze',
      name: 'Proteção de Streak',
      description: 'Protege seu streak por 1 dia',
      cost: NEURON_COSTS.BUY_STREAK_FREEZE,
      icon: Shield,
      color: 'text-blue-500',
      action: () => {
        if (freezesAvailable >= 3) {
          alert('Você já tem o máximo de proteções!')
          return false
        }
        const success = spendNeurons(NEURON_COSTS.BUY_STREAK_FREEZE, 'Comprar proteção de streak')
        if (success) {
          buyFreeze(NEURON_COSTS.BUY_STREAK_FREEZE)
        }
        return success
      },
    },
    {
      id: 'hint',
      name: 'Dica (Em breve)',
      description: 'Revela uma dica para a questão atual',
      cost: NEURON_COSTS.BUY_HINT,
      icon: Sparkles,
      color: 'text-yellow-500',
      action: () => false, // Coming soon
    },
  ]

  const handlePurchase = async (item: ShopItem) => {
    if (neurons < item.cost) {
      alert(`Neurônios insuficientes! Você precisa de ${item.cost} neurônios.`)
      return
    }

    setPurchasingItem(item.id)

    // Simulate purchase delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const success = item.action()

    if (success) {
      setPurchaseSuccess(item.id)
      setTimeout(() => setPurchaseSuccess(null), 2000)
    }

    setPurchasingItem(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Loja de Neurônios</h2>
        <p className="text-gray-600">Use seus neurônios para comprar power-ups e vantagens</p>

        {/* Balance Display */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
          <Brain className="w-5 h-5 text-purple-600" />
          <span className="font-bold text-purple-900">{neurons.toLocaleString()} Neurônios</span>
        </div>
      </div>

      {/* Shop Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shopItems.map((item) => {
          const canAfford = neurons >= item.cost
          const isDisabled = item.id === 'hint' // Coming soon items

          return (
            <motion.div
              key={item.id}
              whileHover={canAfford && !isDisabled ? { scale: 1.02 } : {}}
              className={`relative bg-white rounded-xl border-2 p-6 transition-all ${
                canAfford && !isDisabled
                  ? 'border-purple-200 hover:border-purple-400 hover:shadow-lg'
                  : 'border-gray-200 opacity-60'
              }`}
            >
              {/* Success Checkmark */}
              <AnimatePresence>
                {purchaseSuccess === item.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 bg-green-500 rounded-xl flex items-center justify-center z-10"
                  >
                    <Check className="w-12 h-12 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Item Icon */}
              <div className={`mb-4 ${item.color}`}>
                <item.icon className="w-12 h-12" />
              </div>

              {/* Item Details */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>

              {/* Cost and Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="font-bold text-purple-900">{item.cost}</span>
                </div>

                <Button
                  variant={canAfford && !isDisabled ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford || isDisabled || purchasingItem === item.id}
                  className="text-sm"
                >
                  {purchasingItem === item.id ? (
                    <span className="flex items-center gap-1">
                      <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                      Comprando...
                    </span>
                  ) : isDisabled ? (
                    'Em breve'
                  ) : (
                    'Comprar'
                  )}
                </Button>
              </div>

              {/* Additional Info */}
              {item.id === 'heart' && hearts >= 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  Corações: {hearts}/{maxHearts}
                </div>
              )}
              {item.id === 'freeze' && freezesAvailable >= 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  Proteções ativas: {freezesAvailable}/3
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Dicas para ganhar neurônios:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Responda questões corretamente (+{NEURON_COSTS.BUY_HINT} neurônios)</li>
          <li>• Complete módulos (+50 neurônios)</li>
          <li>• Mantenha seu streak diário (bônus variável)</li>
          <li>• Desbloqueie conquistas (50-500 neurônios)</li>
        </ul>
      </div>
    </div>
  )
}
