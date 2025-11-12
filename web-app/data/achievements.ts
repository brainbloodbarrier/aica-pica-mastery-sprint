import { Achievement } from '@/lib/types'

export const ACHIEVEMENTS: Achievement[] = [
  // Bronze Tier
  {
    id: 'first_steps',
    name: 'Primeiros Passos',
    description: 'Complete seu primeiro módulo',
    icon: '🥉',
    tier: 'bronze',
    xpReward: 20,
    unlocked: false,
  },
  {
    id: 'early_bird',
    name: 'Madrugador',
    description: 'Estude antes das 8h da manhã',
    icon: '🌅',
    tier: 'bronze',
    xpReward: 20,
    unlocked: false,
  },

  // Silver Tier
  {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Acerte 100% das questões em um módulo',
    icon: '🥈',
    tier: 'silver',
    xpReward: 50,
    unlocked: false,
  },
  {
    id: 'speed_demon',
    name: 'Velocista',
    description: 'Complete um módulo em menos de 30 minutos',
    icon: '⚡',
    tier: 'silver',
    xpReward: 50,
    unlocked: false,
  },
  {
    id: 'streak_warrior',
    name: 'Guerreiro da Sequência',
    description: 'Mantenha uma sequência de 7 dias',
    icon: '🔥',
    tier: 'silver',
    xpReward: 75,
    unlocked: false,
  },

  // Gold Tier
  {
    id: 'halfway_hero',
    name: 'Herói da Metade',
    description: 'Complete 5 módulos',
    icon: '🥇',
    tier: 'gold',
    xpReward: 100,
    unlocked: false,
  },
  {
    id: 'comeback_king',
    name: 'Rei do Retorno',
    description: 'Retorne após perder uma sequência e alcance 10 dias',
    icon: '👑',
    tier: 'gold',
    xpReward: 150,
    unlocked: false,
  },

  // Platinum Tier
  {
    id: 'perfect_score',
    name: 'Pontuação Perfeita',
    description: '100% de acurácia em todos os módulos',
    icon: '💎',
    tier: 'platinum',
    xpReward: 300,
    unlocked: false,
  },
  {
    id: 'legend_30',
    name: 'Lenda dos 30 Dias',
    description: 'Mantenha uma sequência de 30 dias consecutivos',
    icon: '🏆',
    tier: 'platinum',
    xpReward: 500,
    unlocked: false,
  },
  {
    id: 'master_surgeon',
    name: 'Cirurgião Mestre',
    description: 'Complete todos os 10 módulos com 90%+ de média',
    icon: '⚕️',
    tier: 'platinum',
    xpReward: 500,
    unlocked: false,
  },
]
