'use client'

import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })

const COUNT = 8000

const PARAMS = { emergence: 0.32, scale: 2.2, speed: 0.8, detail: 4 }

// Burst phase: starts at 3.2 (particles form huge sphere), decays to 1 (normal size)
// Resets each module load (page load), decays over ~120 frames ≈ 2s at 60fps
let burstPhase = 3.2

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  const { inclinations, azimuths, posArr, colArr } = useMemo(() => {
    burstPhase = 3.2 // reset on mount
    const golden = 2.3999632297
    const inclinations = new Float32Array(COUNT)
    const azimuths = new Float32Array(COUNT)
    const posArr = new Float32Array(COUNT * 3)
    const colArr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      inclinations[i] = Math.acos(1.0 - 2.0 * (i + 0.5) / COUNT)
      azimuths[i] = golden * i
      // start clustered at center — explosion flies outward
      posArr[i * 3]     = (Math.random() - 0.5) * 0.4
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 0.4
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 0.4
    }
    return { inclinations, azimuths, posArr, colArr }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const geo = pointsRef.current.geometry
    const pos = geo.attributes.position as THREE.BufferAttribute
    const col = geo.attributes.color as THREE.BufferAttribute

    const time = state.clock.getElapsedTime()
    const { emergence, scale, speed, detail } = PARAMS
    const st = time * speed

    // Decay burst: 3.2 → 1.0 over ~120 frames
    if (burstPhase > 1.0) burstPhase = Math.max(1.0, burstPhase - 0.018)

    const c1 = Math.cos(st * 0.12), s1 = Math.sin(st * 0.12)
    const c2 = Math.cos(st * 0.08), s2 = Math.sin(st * 0.08)
    const breath = 1.0 + 0.04 * Math.sin(st * 0.35)

    for (let i = 0; i < COUNT; i++) {
      const inclination = inclinations[i]
      const azimuth = azimuths[i]
      const sinI = Math.sin(inclination)
      const ux = sinI * Math.cos(azimuth)
      const uy = sinI * Math.sin(azimuth)
      const uz = Math.cos(inclination)

      const n1 = Math.sin(ux * detail + st * 0.7) * Math.sin(uy * detail * 1.3 + st * 0.5) * Math.sin(uz * detail * 0.9 + st * 0.9)
      const n2 = Math.sin(ux * detail * 2.1 + uz * detail * 1.7 + st * 1.1) * 0.5
      const n3 = Math.sin(uy * detail * 2.7 + ux * detail * 1.4 + st * 0.6) * 0.25
      const noise = (n1 + n2 + n3) * emergence

      const tendrilPhase = Math.sin(azimuth * 3.0 + st * 0.3) * Math.sin(inclination * 5.0 + st * 0.4)
      const tendril = Math.pow(Math.max(0.0, tendrilPhase), 6.0) * emergence
      const r = (scale * (1.0 + noise * 0.5) + tendril * scale * 0.8) * burstPhase

      const px = ux * r, py = uy * r, pz = uz * r
      const rx = px * c1 - pz * s1
      const rz1 = px * s1 + pz * c1
      const ry = py * c2 - rz1 * s2
      const rz = py * s2 + rz1 * c2

      const tx = rx * breath
      const ty = ry * breath
      const tz = rz * breath

      // Lerp current → target — faster during burst explosion
      const lerpSpeed = burstPhase > 1.0 ? 0.14 : 0.08
      const i3 = i * 3
      posArr[i3]     += (tx - posArr[i3])     * lerpSpeed
      posArr[i3 + 1] += (ty - posArr[i3 + 1]) * lerpSpeed
      posArr[i3 + 2] += (tz - posArr[i3 + 2]) * lerpSpeed

      const t = i / COUNT
      const hue = (0.55 + t * 0.35 + noise * 0.15 + st * 0.015) % 1.0
      const sat = 0.65 + 0.35 * Math.abs(Math.sin(t * 8.0 + st * 0.7))
      const lum = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(inclination * 4.0 + st * 0.8 + noise * 3.0))

      // HSL → RGB inline (no THREE.Color allocation per frame)
      const h6 = hue * 6
      const s = sat, l = lum
      const c = (1 - Math.abs(2 * l - 1)) * s
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

      pos.array[i3]     = posArr[i3]
      pos.array[i3 + 1] = posArr[i3 + 1]
      pos.array[i3 + 2] = posArr[i3 + 2]
      col.array[i3]     = colArr[i3]
      col.array[i3 + 1] = colArr[i3 + 1]
      col.array[i3 + 2] = colArr[i3 + 2]
    }

    pos.needsUpdate = true
    col.needsUpdate = true
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
