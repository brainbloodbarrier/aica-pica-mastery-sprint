'use client'

import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'

interface ConfettiProps {
  active: boolean
  duration?: number
}

export function Confetti({ active, duration = 3000 }: ConfettiProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [show, setShow] = useState(active)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (active) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [active, duration])

  if (!show || dimensions.width === 0) return null

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.3}
    />
  )
}
