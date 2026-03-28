'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface NeonButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'purple' | 'cyan' | 'outline'
  className?: string
  target?: string
  rel?: string
}

export default function NeonButton({
  children,
  href,
  onClick,
  variant = 'purple',
  className = '',
  target,
  rel,
}: NeonButtonProps) {
  const baseStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 700,
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    padding: '0.75rem 2rem',
    border: '1px solid',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    transition: 'all 0.2s',
    position: 'relative',
    overflow: 'hidden',
  }

  const variants: Record<string, React.CSSProperties> = {
    purple: {
      background: 'var(--purple-core)',
      borderColor: 'var(--purple-glow)',
      color: 'var(--text-primary)',
      animation: 'neon-pulse 2s ease-in-out infinite',
    },
    cyan: {
      background: 'transparent',
      borderColor: 'var(--cyan-accent)',
      color: 'var(--cyan-accent)',
      animation: 'neon-pulse-cyan 2s ease-in-out infinite',
    },
    outline: {
      background: 'transparent',
      borderColor: 'var(--border)',
      color: 'var(--text-muted)',
    },
  }

  const style = { ...baseStyle, ...variants[variant] }

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    style,
    className,
  }

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  )
}
