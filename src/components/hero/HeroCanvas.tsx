'use client'

import { useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Effects, PerformanceMonitor } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import ParticleField from './ParticleField'

extend({ UnrealBloomPass })

// Module-level ref: scroll progress 0→1 over 3 viewport heights.
// Written by DOM scroll listener, read by useFrame — zero re-renders.
const scroll = { progress: 0 }

function CameraScroll() {
  const { camera } = useThree()

  useFrame(() => {
    const targetZ = 5.5 - scroll.progress * 5.5
    camera.position.z += (targetZ - camera.position.z) * 0.03
  })

  return null
}

export default function HeroCanvas() {
  const [dpr, setDpr] = useState(1)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight
      scroll.progress = totalScrollable > 0 ? Math.min(window.scrollY / totalScrollable, 1) : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Delay void appearance so text fades in first
    const t = setTimeout(() => setVisible(true), 900)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(t)
    }
  }, [])

  return (
    <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <Canvas
        frameloop="always"
        dpr={dpr}
        camera={{ position: [0, 0, 5.5], fov: 60 }}
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
          {/* Fog matches --bg so distant particles dissolve naturally */}
          <fog attach="fog" args={['#05010f', 40, 90]} />
          <CameraScroll />
          <ParticleField />
          <Effects disableGamma>
            {/* @ts-expect-error drei extends R3F JSX */}
            <unrealBloomPass threshold={0} strength={1.6} radius={0.4} />
          </Effects>
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}
