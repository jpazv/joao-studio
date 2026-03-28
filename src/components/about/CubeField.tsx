'use client'

import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })

// Perfect cube: 18^3 = 5832 particles
const S = 18
const COUNT = S * S * S
const SEP = 0.32                  // grid spacing (scaled down from original 2.5 @ cam z=100)

export default function CubeField() {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const converged = useRef(false)

  // Pre-compute target grid positions ONCE — never recalculate
  const { posArr, colArr, targets } = useMemo(() => {
    const off = (S * SEP) / 2
    const posArr  = new Float32Array(COUNT * 3)
    const colArr  = new Float32Array(COUNT * 3)
    const targets = new Float32Array(COUNT * 3)

    // Cyan color constant (0x00FFD1 → r=0, g=1, b=0.82)
    const r = 0.0, g = 1.0, b = 0.82

    for (let i = 0; i < COUNT; i++) {
      const iz = Math.floor(i / (S * S))
      const iy = Math.floor((i % (S * S)) / S)
      const ix = i % S
      const tx = ix * SEP - off
      const ty = iy * SEP - off
      const tz = iz * SEP - off
      targets[i * 3]     = tx
      targets[i * 3 + 1] = ty
      targets[i * 3 + 2] = tz
      // Start scattered
      posArr[i * 3]     = (Math.random() - 0.5) * 12
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 12
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 12
      // Depth-based brightness: outer brighter, inner dimmer
      const depth = (Math.abs(tx) + Math.abs(ty) + Math.abs(tz)) / (off * 3)
      const lum = 0.4 + 0.6 * depth
      colArr[i * 3]     = r * lum
      colArr[i * 3 + 1] = g * lum
      colArr[i * 3 + 2] = b * lum
    }
    return { posArr, colArr, targets }
  }, [])

  useFrame((_, delta) => {
    // Once converged: only rotate the group — zero particle work
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
      groupRef.current.rotation.x += delta * 0.08
    }

    if (converged.current || !pointsRef.current) return

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const LERP = Math.min(1, delta * 3)   // delta-based lerp, frame-rate independent
    let totalDiff = 0

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const dx = targets[i3]     - posArr[i3]
      const dy = targets[i3 + 1] - posArr[i3 + 1]
      const dz = targets[i3 + 2] - posArr[i3 + 2]

      posArr[i3]     += dx * LERP
      posArr[i3 + 1] += dy * LERP
      posArr[i3 + 2] += dz * LERP

      posAttr.array[i3]     = posArr[i3]
      posAttr.array[i3 + 1] = posArr[i3 + 1]
      posAttr.array[i3 + 2] = posArr[i3 + 2]

      totalDiff += Math.abs(dx) + Math.abs(dy) + Math.abs(dz)
    }

    posAttr.needsUpdate = true

    // Snap to exact targets and stop all particle updates forever
    if (totalDiff < COUNT * 0.001) {
      for (let i = 0; i < COUNT; i++) {
        posAttr.array[i * 3]     = targets[i * 3]
        posAttr.array[i * 3 + 1] = targets[i * 3 + 1]
        posAttr.array[i * 3 + 2] = targets[i * 3 + 2]
      }
      posAttr.needsUpdate = true
      converged.current = true
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posArr, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colArr, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  )
}
