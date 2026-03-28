'use client'

import { motion } from 'framer-motion'
import { PROJECTS } from '@/lib/constants'
import ProjectCard from './ProjectCard'

export default function WorkSection() {
  return (
    <section id="work" style={{
      position: 'relative', zIndex: 10,
      minHeight: '100svh',
      padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)',
      background: 'transparent',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.25em', color: 'var(--text-3)',
            display: 'block', marginBottom: '1rem',
          }}>
            002 — WORK
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0,
          }}>
            Things I&apos;ve shipped.
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
