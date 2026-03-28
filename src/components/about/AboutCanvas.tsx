'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Effects, PerformanceMonitor } from '@react-three/drei'
import CubeField from './CubeField'

function FrameDriver({ active }: { active: boolean }) {
  const { invalidate } = useThree()
  useFrame(() => { if (active) invalidate() })
  return null
}

export default function AboutCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [dpr, setDpr] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas
        frameloop="demand"
        dpr={dpr}
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: false,
        }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(d => Math.max(0.75, d - 0.25))}
          onIncline={() => setDpr(d => Math.min(1.5, d + 0.25))}
        >
          <FrameDriver active={visible} />
          <fog attach="fog" args={['#0d0720', 1.8]} />
          <CubeField />
          <Effects disableGamma>
            {/* @ts-expect-error drei extends R3F JSX */}
            <unrealBloomPass threshold={0} strength={1.2} radius={0.6} />
          </Effects>
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}
