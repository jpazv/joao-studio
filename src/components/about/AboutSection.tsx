'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { STACK, STATS } from '@/lib/constants'

const enter = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
})

function StackLine({ name, tooltip, color, delay }: {
  name: string; tooltip: string; color: string; delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.2rem 0' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={visible ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay, type: 'spring', stiffness: 400, damping: 20 }}
        style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0,
          boxShadow: hovered ? `0 0 6px ${color}` : 'none', transition: 'box-shadow 0.2s' }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.04, duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: hovered ? 'var(--text-1)' : 'var(--text-2)',
          transition: 'color 0.15s',
        }}
      >
        {name}
      </motion.span>

      {hovered && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12 }}
          style={{
            position: 'absolute', bottom: 'calc(100% + 6px)', left: 0,
            background: 'rgba(14,10,30,0.98)', border: '1px solid var(--border)',
            padding: '0.3rem 0.6rem', borderRadius: '4px',
            fontFamily: 'var(--font-sans)', fontSize: '0.7rem',
            color: 'var(--text-1)', whiteSpace: 'nowrap',
            zIndex: 20, pointerEvents: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          }}
        >
          {tooltip}
        </motion.div>
      )}
    </div>
  )
}

export default function AboutSection() {
  return (
    /*
      NEGATIVE MARGIN: pulls this section up into the hero's bottom vignette.
      Creates the illusion of "emerging" from the particle field.
    */
    <section
      id="about"
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100svh',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)',
        /*
          Top is fully transparent: particles (fixed canvas behind, z:0) show through.
          As camera moves forward during scroll, particles surround the emerging content.
          Background solidifies at ~35% down so text stays readable.
        */
        background: 'transparent',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5rem' }}>

        {/* ── TOP: Label + Headline + Bio ── */}
        <div className="float">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
          style={{ maxWidth: '640px' }}
        >
          <motion.span variants={enter(0)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.25em', color: 'var(--text-3)', display: 'block', marginBottom: '1.5rem',
          }}>
            001 — ABOUT
          </motion.span>

          <motion.h2 variants={enter(0.1)} style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', color: 'var(--text-1)',
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem',
          }}>
            Engineered for<br />
            <span style={{ color: 'var(--text-1)' }}>the agentic era.</span>
          </motion.h2>

          <motion.p variants={enter(0.2)} style={{
            fontFamily: 'var(--font-sans)', fontWeight: 300,
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            color: 'var(--text-2)', lineHeight: 1.85, marginBottom: '2rem',
          }}>
            I work at the intersection of AI infrastructure and exceptional UX.
            Building autonomous agents and wrapping them in interfaces that feel inevitable.
            LLMs as core architecture — not features.
          </motion.p>

          {/* Stats — macOS info pill style */}
          <motion.div variants={enter(0.3)} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {STATS.map(stat => (
              <div key={stat.label} style={{
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '20px',
                backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'baseline', gap: '0.35rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: '0.95rem', color: 'var(--text-1)',
                }}>{stat.value}</span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
                  color: 'var(--text-3)',
                }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        </div>

        {/* ── STACK GRID ── */}
        <div className="float-b">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        >
          {/* Terminal — macOS window glass style */}
          <div style={{
            background: 'var(--glass)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-window)',
          }}>
            <div style={{
              padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.025)',
            }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.75 }} />
              ))}
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: 'var(--text-3)', marginLeft: '6px',
              }}>~/stack</span>
            </div>

            <div style={{
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
            }}>
              {STACK.map((group, gi) => (
                <div key={group.label}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                    letterSpacing: '0.2em', color: 'var(--text-3)', marginBottom: '0.6rem',
                    textTransform: 'uppercase',
                  }}>
                    {group.label}
                  </div>
                  {group.items.map((tech, ti) => (
                    <StackLine
                      key={tech.name} name={tech.name}
                      tooltip={tech.tooltip} color={tech.color}
                      delay={gi * 0.06 + ti * 0.03}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        </div>

      </div>

      {/* Divider */}
      <div style={{
        maxWidth: '1100px', margin: '5rem auto 0',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
      }} />
    </section>
  )
}
