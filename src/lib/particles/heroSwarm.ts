import * as THREE from 'three'

// Casberry-style behavior function signature:
// (i, count, target, color, time, THREE) => void

export function heroSwarmBehavior(
  i: number,
  count: number,
  target: THREE.Vector3,
  color: THREE.Color,
  time: number,
  mouseX: number,
  mouseY: number
): void {
  // Sphere formation with drift
  const phi = Math.acos(-1 + (2 * i) / count)
  const theta = Math.sqrt(count * Math.PI) * phi

  const radius = 2.8 + Math.sin(time * 0.3 + i * 0.01) * 0.4

  target.set(
    radius * Math.sin(phi) * Math.cos(theta + time * 0.05),
    radius * Math.cos(phi) + Math.sin(time * 0.2 + i * 0.005) * 0.3,
    radius * Math.sin(phi) * Math.sin(theta + time * 0.05)
  )

  // Mouse repulsion (subtle)
  const mx = mouseX * 3
  const my = mouseY * 3
  const dx = target.x - mx
  const dy = target.y - my
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist < 1.5) {
    const force = (1.5 - dist) / 1.5
    target.x += (dx / dist) * force * 0.4
    target.y += (dy / dist) * force * 0.4
  }

  // Color: blend between purple-core and cyan-accent based on position
  const t = (Math.sin(time * 0.5 + i * 0.02) + 1) / 2
  color.setHex(t > 0.5 ? 0x7b2fff : 0x00ffd1)
}
