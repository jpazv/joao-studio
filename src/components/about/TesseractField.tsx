'use client'

import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })

const COUNT = 6000

const PARAMS = { size: 3.2, perspective: 2.625, innerScale: 0.6, pulseSpeed: 0.1 }

export default function TesseractField() {
  const pointsRef = useRef<THREE.Points>(null)

  const { bx, by, bz, seeds, posArr, colArr } = useMemo(() => {
    const bx = new Float32Array(COUNT)
    const by = new Float32Array(COUNT)
    const bz = new Float32Array(COUNT)
    const seeds = new Float32Array(COUNT)
    const posArr = new Float32Array(COUNT * 3)
    const colArr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const seed = i + 1
      seeds[i] = seed
      const rx = Math.sin(seed * 12.9898) * 43758.5453;       bx[i] = (rx - Math.floor(rx)) * 2 - 1
      const ry = Math.sin(seed * 2 * 12.9898) * 43758.5453;   by[i] = (ry - Math.floor(ry)) * 2 - 1
      const rz = Math.sin(seed * 3 * 12.9898) * 43758.5453;   bz[i] = (rz - Math.floor(rz)) * 2 - 1
      posArr[i * 3]     = (Math.random() - 0.5) * 8
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 8
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return { bx, by, bz, seeds, posArr, colArr }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const colAttr = geo.attributes.color as THREE.BufferAttribute

    const time = state.clock.getElapsedTime()
    const { size, perspective, innerScale, pulseSpeed } = PARAMS

    for (let i = 0; i < COUNT; i++) {
      const w = Math.sin(time * pulseSpeed + seeds[i] * 0.001)
      const depth = (w + 1) * 0.5
      const scaleMix = innerScale * depth + (1 - depth)
      let denom = perspective - w
      if (Math.abs(denom) < 0.0001) denom = 0.0001
      const scale4D = (perspective / denom) * size * scaleMix

      const tx = bx[i] * scale4D
      const ty = by[i] * scale4D
      const tz = bz[i] * scale4D

      const i3 = i * 3
      posArr[i3]     += (tx - posArr[i3])     * 0.08
      posArr[i3 + 1] += (ty - posArr[i3 + 1]) * 0.08
      posArr[i3 + 2] += (tz - posArr[i3 + 2]) * 0.08

      // purple → cyan inline HSL→RGB
      const hue = (0.77 * (1 - depth) + 0.48 * depth) % 1
      const lum = 0.45 + 0.25 * Math.sin(time * 2 + i * 0.02)
      const s = 0.95, l = lum
      const c = (1 - Math.abs(2 * l - 1)) * s
      const h6 = hue * 6
      const x = c * (1 - Math.abs(h6 % 2 - 1))
      const m = l - c / 2
      let r_ = 0, g_ = 0, b_ = 0
      if (h6 < 1) { r_ = c; g_ = x }
      else if (h6 < 2) { r_ = x; g_ = c }
      else if (h6 < 3) { g_ = c; b_ = x }
      else if (h6 < 4) { g_ = x; b_ = c }
      else if (h6 < 5) { r_ = x; b_ = c }
      else { r_ = c; b_ = x }
      colArr[i3]     = r_ + m
      colArr[i3 + 1] = g_ + m
      colArr[i3 + 2] = b_ + m

      posAttr.array[i3]     = posArr[i3]
      posAttr.array[i3 + 1] = posArr[i3 + 1]
      posAttr.array[i3 + 2] = posArr[i3 + 2]
      colAttr.array[i3]     = colArr[i3]
      colAttr.array[i3 + 1] = colArr[i3 + 1]
      colAttr.array[i3 + 2] = colArr[i3 + 2]
    }

    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posArr, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colArr, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
