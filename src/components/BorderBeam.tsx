import React from 'react'
import { motion } from 'framer-motion'

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  reverse?: boolean
  initialOffset?: number
  glowIntensity?: number
  beamBorderRadius?: number
  speedMultiplier?: number
  className?: string
  style?: React.CSSProperties
}

export const BorderBeam = ({
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#c8791a',
  colorTo = '#e8a84b',
  reverse = false,
  initialOffset = 0,
  glowIntensity = 0,
  beamBorderRadius,
  speedMultiplier = 1,
  className,
  style,
}: BorderBeamProps) => {
  const actualDuration = duration / speedMultiplier

  const glowEffect =
    glowIntensity > 0
      ? `0 0 ${glowIntensity * 5}px ${glowIntensity * 2}px ${colorFrom}`
      : undefined

  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        border: '2px solid transparent',
        WebkitMaskImage:
          'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
        WebkitMaskClip: 'padding-box, border-box',
        WebkitMaskComposite: 'destination-in',
        maskImage:
          'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
        maskClip: 'padding-box, border-box',
        maskComposite: 'intersect',
      }}
    >
      <motion.div
        className={className}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          offsetPath: `rect(0 auto auto 0 round ${beamBorderRadius ?? size}px)`,
          opacity: 1,
          boxShadow: glowEffect,
          borderRadius: beamBorderRadius ? `${beamBorderRadius}px` : undefined,
          ...style,
        } as React.CSSProperties & Record<string, unknown>}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: actualDuration,
          delay: -delay,
        }}
      />
    </div>
  )
}