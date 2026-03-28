'use client'

import { useRef, useEffect, useState } from 'react'

interface GlitchTextProps {
  children: string
  className?: string
  loop?: boolean
}

export default function GlitchText({ children, className = '', loop = false }: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(false)

  // Only run glitch animation when element is visible
  useEffect(() => {
    if (!loop) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loop])

  return (
    <span
      ref={ref}
      className={`${loop ? (active ? 'glitch-loop' : '') : 'glitch'} ${className}`}
      data-text={children}
    >
      {children}
    </span>
  )
}
