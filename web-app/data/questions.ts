import { Question } from '@/lib/types'

/**
 * Sample questions for Module 1: Posterior Circulation Overview
 *
 * Note: This file contains a subset of questions for demonstration.
 * Full question bank (130 questions) will be migrated from the notebook.
 */

export const SAMPLE_QUESTIONS: Question[] = [
  // Module 1: Posterior Circulation Overview
  {
    id: 'mod1_q1',
    type: 'multiple_choice',
    question: 'Qual artéria é considerada a artéria cerebelar MAIS complexa, tortuosa e variável em curso e área de suprimento?',
    options: [
      'AICA (Anteroinferior Cerebellar Artery)',
      'PICA (Posteroinferior Cerebellar Artery)',
      'SCA (Superior Cerebellar Artery)',
      'PCA (Posterior Cerebral Artery)',
    ],
    correctAnswer: 1,
    explanation: 'A PICA tem o curso mais complexo, tortuoso e variável de todas as artérias cerebelares. Ela forma alças características (caudal e cranial) e possui alta variabilidade em sua origem e território de suprimento.',
    source: 'PICA_content.json - Slide 1',
    difficulty: 'easy',
    tags: ['posterior-circulation', 'pica', 'overview'],
    moduleId: 1,
  },
  {
    id: 'mod1_q2',
    type: 'multiple_choice',
    question: 'A AICA origina-se de qual artéria?',
    options: [
      'Artéria vertebral',
      'Artéria basilar',
      'Artéria carótida interna',
      'Artéria cerebral posterior',
    ],
    correctAnswer: 1,
    explanation: 'A AICA origina-se da artéria basilar, mais comumente da metade inferior. Em 72% dos casos surge como tronco único, 26% como artérias duplicadas e 2% como artérias triplicadas.',
    source: 'AICA_content.json - Slide 2',
    difficulty: 'easy',
    tags: ['aica', 'origin', 'basilar-artery'],
    moduleId: 1,
  },
  {
    id: 'mod1_q3',
    type: 'multiple_choice',
    question: 'Qual estrutura anatômica é intimamente relacionada ao curso da AICA no ângulo pontocerebelar?',
    options: [
      'Nervo trigêmeo (NC V)',
      'Nervos facial e vestibulococlear (NC VII e VIII)',
      'Nervo glossofaríngeo (NC IX)',
      'Nervo acessório (NC XI)',
    ],
    correctAnswer: 1,
    explanation: 'A AICA cursa através do ângulo pontocerebelar central em íntima relação com os nervos facial (VII) e vestibulococlear (VIII). Ela pode bifurcar-se próximo ao complexo nervoso facial-vestibulococlear.',
    source: 'AICA_content.json - Slide 1',
    difficulty: 'medium',
    tags: ['aica', 'cranial-nerves', 'cpa'],
    moduleId: 1,
  },
  {
    id: 'mod1_q4',
    type: 'multiple_choice',
    question: 'Em que porcentagem dos casos a AICA se origina como tronco único?',
    options: [
      '26%',
      '50%',
      '72%',
      '82%',
    ],
    correctAnswer: 2,
    explanation: 'Em 72% dos casos, a AICA origina-se como tronco único da artéria basilar. Em 26% surge como artérias duplicadas e em 2% como artérias triplicadas.',
    source: 'AICA_content.json - Slide 2',
    difficulty: 'medium',
    tags: ['aica', 'quantitative', 'origin-patterns'],
    moduleId: 1,
  },
  {
    id: 'mod1_q5',
    type: 'multiple_choice',
    question: 'Qual é a principal relevância cirúrgica da AICA?',
    options: [
      'Marcador crítico em cirurgias do ângulo pontocerebelar',
      'Fornece acesso ao quarto ventrículo',
      'Ponto de referência para cirurgias do clivus',
      'Indica a localização do nervo trigêmeo',
    ],
    correctAnswer: 0,
    explanation: 'A AICA é um marcador crítico em cirurgias do ângulo pontocerebelar e deve ser identificada e preservada durante ressecções de neurinoma do acústico e outras cirurgias do APC.',
    source: 'AICA_content.json - Slide 1',
    difficulty: 'medium',
    tags: ['aica', 'surgical', 'cpa-surgery'],
    moduleId: 1,
  },
]

// Export empty arrays for other modules (to be populated)
export const MODULE_QUESTIONS: Record<number, Question[]> = {
  1: SAMPLE_QUESTIONS,
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
}
