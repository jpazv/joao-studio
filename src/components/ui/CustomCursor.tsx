'use client'

import { useEffect, useRef, useState } from 'react'
import { lerp } from '@/lib/utils'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    document.addEventListener('mousemove', onMove)

    const bindHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bindHover()

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.18)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18)
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) scale(${hovering ? 1.35 : 1})`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [visible, hovering])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
        willChange: 'transform',
      }}
    >
      {/* macOS arrow cursor — SVG idêntico ao original */}
      <svg
        width="28"
        height="32"
        viewBox="0 0 28 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          filter: hovering
            ? 'drop-shadow(0 0 6px rgba(157,92,255,0.9))'
            : 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))',
          transition: 'filter 0.2s',
        }}
      >
        {/* Stroke preto (contorno) — caminho exterior */}
        <path
          d="M4 2 L4 26 L9.5 20.5 L14.5 30 L17.5 28.5 L12.5 19 L20 19 Z"
          fill="black"
          stroke="black"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Fill branco (interior) */}
        <path
          d="M4 2 L4 26 L9.5 20.5 L14.5 30 L17.5 28.5 L12.5 19 L20 19 Z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
