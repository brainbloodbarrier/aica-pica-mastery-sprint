# AICA-PICA Mastery Sprint - Web App

Sistema gamificado de aprendizado interativo para dominar a anatomia microcirúrgica das artérias AICA e PICA.

## 🚀 Features

- ✅ **10 Módulos Progressivos** - Caminho estruturado desde conceitos básicos até maestria cirúrgica
- ✅ **130 Questões Validadas** - Baseadas em Rhoton's Microsurgical Anatomy
- ✅ **Gamificação Avançada** - Sistema de XP, níveis (1-7), streaks diários e conquistas
- ✅ **8 Badges Exclusivos** - Desbloqueáveis ao completar módulos específicos
- ✅ **10 Conquistas** - De bronze até platina, com recompensas de XP
- ✅ **Dashboard Interativo** - Visualização completa do progresso e estatísticas
- ✅ **Animações Fluídas** - Confetti, level-ups e celebrações
- ✅ **Progresso Persistente** - LocalStorage mantém seu avanço entre sessões
- ✅ **Mobile Responsive** - Funciona perfeitamente em todos os dispositivos

## 📋 Pré-requisitos

- Node.js 18+ (recomendado: 20.x)
- npm ou yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🔧 Instalação

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📦 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm start            # Servidor de produção
npm run lint         # Executa ESLint
```

## 🏗️ Estrutura do Projeto

```
web-app/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page
│   ├── dashboard/           # Dashboard
│   └── module/[id]/         # Quiz por módulo
├── components/              # Componentes React
│   ├── ui/                 # UI base
│   ├── quiz/               # Sistema de quiz
│   ├── gamification/       # XP, levels, streaks
│   ├── celebration/        # Animações
│   └── dashboard/          # Dashboard components
├── context/                # Estado global
├── data/                   # Módulos, questões, conquistas
├── hooks/                  # React hooks customizados
└── lib/                    # Tipos, utils, constants
```

## 🎮 Como Usar

1. **Landing Page** - Visualize features e clique em "Começar Agora"
2. **Dashboard** - Veja seu progresso e selecione um módulo
3. **Quiz** - Responda questões e receba feedback
4. **Gamificação** - Ganhe XP, suba de nível, mantenha streaks

## 🎨 Tecnologias

- Next.js 14 + TypeScript
- TailwindCSS + Framer Motion
- React Context API + LocalStorage
- Lucide React Icons

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

Ou conecte seu repositório GitHub ao Vercel.

## 📝 Conteúdo Educacional

### AICA (17 slides)
- 4 segmentos anatômicos
- Ramos críticos
- Síndrome lateral pontina
- Aplicações cirúrgicas

### PICA (20 slides)
- 5 segmentos anatômicos
- Alças características
- Síndrome de Wallenberg
- Variações anatômicas

## 👨‍⚕️ Créditos

**Conteúdo**: Baseado em Dr. Albert L. Rhoton Jr.'s Microsurgical Anatomy

---

**Desenvolvido com ❤️ para educação médica de excelência**
