'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Canvas renders as position:fixed — escapes this section's layout,
// covers the full viewport as a persistent background layer.
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const enter = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
})

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Fixed particle canvas — mounts here, renders globally */}
      <HeroCanvas />

      {/* Vignette: darkens only the center area for text contrast, transparent at edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(8,5,16,0.65) 0%, rgba(8,5,16,0.15) 65%, transparent 100%)',
      }} />
      {/* No bottom gradient — sections below handle their own fade-in smoothly */}

      {/* Content — wrapped in float so whole block levitates */}
      <div className="float" style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <motion.div
        initial="hidden" animate="show"
        style={{
          textAlign: 'center',
          padding: '0 clamp(1.5rem, 5vw, 4rem)', maxWidth: '800px', width: '100%',
        }}
      >
        {/* Eyebrow */}
        <motion.div variants={enter(0.3)} style={{ marginBottom: '2rem' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
          }}>
            AI Agents &nbsp;·&nbsp; Frontend Engineer
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={enter(0.45)} style={{ margin: '0 0 1.75rem', lineHeight: 1 }}>
          <span style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 8vw, 7rem)', color: 'var(--text-1)', letterSpacing: '-0.03em', lineHeight: 1 }}>Building ideas</span>
          <span style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 8vw, 7rem)', color: 'var(--text-1)', letterSpacing: '-0.03em', lineHeight: 1 }}>into reality</span>
          <span style={{
            display: 'block',
            width: 'clamp(40px, 8vw, 80px)',
            height: '2px',
            background: 'var(--cyan)',
            margin: '1.25rem auto 0',
            opacity: 0.9,
          }} />
        </motion.h1>

        {/* Bio */}
        <motion.p variants={enter(0.6)} style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          fontWeight: 300,
          color: 'var(--text-2)',
          lineHeight: 1.7,
          maxWidth: '42ch',
          margin: '0 auto 2.5rem',
          letterSpacing: '0.01em',
        }}>
          I build autonomous agents and interfaces<br />that feel like the future.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={enter(0.75)}
          style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {/* Primary — macOS filled button */}
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500,
              fontSize: '0.9rem',
              padding: '10px 24px',
              background: 'rgba(123,47,255,0.9)',
              border: '1px solid rgba(123,47,255,0.6)',
              color: '#fff', cursor: 'pointer',
              borderRadius: 'var(--radius-sm)',
              backdropFilter: 'blur(8px)',
              transition: 'background 0.15s, transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 12px rgba(123,47,255,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(123,47,255,1)'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.35), 0 8px 24px rgba(123,47,255,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(123,47,255,0.9)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 4px 12px rgba(123,47,255,0.3)'
            }}
          >
            Explore Work
          </button>

          {/* Secondary — macOS ghost button */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500,
              fontSize: '0.9rem',
              padding: '10px 24px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--text-2)', cursor: 'pointer',
              borderRadius: 'var(--radius-sm)',
              backdropFilter: 'blur(8px)',
              transition: 'background 0.15s, border-color 0.15s, color 0.15s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.color = 'var(--text-1)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = 'var(--text-2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Contact
          </button>
        </motion.div>
      </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, var(--text-3), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
