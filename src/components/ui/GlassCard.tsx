'use client'

import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  glowTop?: boolean
}

export default function GlassCard({ children, className = '', style, glowTop = false }: GlassCardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(13, 7, 32, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--border)',
        borderTop: glowTop
          ? '1px solid transparent'
          : '1px solid var(--border)',
        backgroundImage: glowTop
          ? 'linear-gradient(rgba(13,7,32,0.7), rgba(13,7,32,0.7)), linear-gradient(90deg, var(--purple-core), var(--cyan-accent))'
          : undefined,
        backgroundOrigin: glowTop ? 'border-box' : undefined,
        backgroundClip: glowTop ? 'padding-box, border-box' : undefined,
        position: 'relative',
        ...style,
      }}
    >
      {glowTop && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, var(--purple-core), var(--cyan-accent))',
          }}
        />
      )}
      {children}
    </div>
  )
}
