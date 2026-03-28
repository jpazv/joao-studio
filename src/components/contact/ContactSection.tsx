'use client'

import { motion } from 'framer-motion'

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '44px', height: '44px',
        border: '1px solid var(--border)', borderRadius: '6px',
        color: 'var(--text-3)', textDecoration: 'none',
        transition: 'color 0.2s, border-color 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--text-1)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--text-3)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {children}
    </motion.a>
  )
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100svh',
        padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        gap: '2.5rem',
        background: 'transparent',
      }}
    >
      {/* Soft purple ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(123,47,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Label */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          letterSpacing: '0.25em', color: 'var(--text-3)', zIndex: 1,
        }}
      >
        003 — CONTACT
      </motion.span>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{ zIndex: 1 }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          color: 'var(--text-1)',
          lineHeight: 1.05, letterSpacing: '-0.02em',
        }}>
          Let&apos;s build<br />
          <span style={{ color: 'var(--text-1)' }}>something.</span>
        </h2>
      </motion.div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontFamily: 'var(--font-sans)', fontWeight: 300,
          fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
          color: 'var(--text-2)',
          maxWidth: '48ch', lineHeight: 1.8, zIndex: 1,
        }}
      >
        Open for projects, collabs, and conversations about the agentic future.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', justifyContent: 'center', zIndex: 1 }}
      >
        <a
          href="mailto:joao@email.com"
          style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.9rem',
            padding: '10px 24px',
            background: 'rgba(123,47,255,0.9)', border: '1px solid rgba(123,47,255,0.6)',
            color: '#fff', borderRadius: 'var(--radius-sm)',
            textDecoration: 'none', cursor: 'pointer', backdropFilter: 'blur(8px)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 12px rgba(123,47,255,0.3)',
            transition: 'background 0.15s, transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(123,47,255,1)'
            el.style.transform = 'translateY(-1px)'
            el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.35), 0 8px 24px rgba(123,47,255,0.4)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(123,47,255,0.9)'
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 4px 12px rgba(123,47,255,0.3)'
          }}
        >
          Send message
        </a>
        <a
          href="https://github.com/jpazv"
          target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.9rem',
            padding: '10px 24px',
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text-2)', borderRadius: 'var(--radius-sm)',
            textDecoration: 'none', cursor: 'pointer', backdropFilter: 'blur(8px)',
            transition: 'background 0.15s, border-color 0.15s, color 0.15s, transform 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(255,255,255,0.12)'
            el.style.borderColor = 'rgba(255,255,255,0.2)'
            el.style.color = 'var(--text-1)'
            el.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(255,255,255,0.07)'
            el.style.borderColor = 'rgba(255,255,255,0.12)'
            el.style.color = 'var(--text-2)'
            el.style.transform = 'translateY(0)'
          }}
        >
          View GitHub
        </a>
      </motion.div>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        style={{ display: 'flex', gap: '0.75rem', zIndex: 1 }}
      >
        <SocialIcon href="https://github.com/jpazv" label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </SocialIcon>
        <SocialIcon href="https://instagram.com/pixelresearches" label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        </SocialIcon>
        <SocialIcon href="https://linkedin.com/in/joao-azevedo" label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </SocialIcon>
      </motion.div>

      {/* Footer — macOS dock bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{
          zIndex: 1, marginTop: '1rem',
          display: 'flex', alignItems: 'center', gap: '1px',
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '14px',
          padding: '10px 20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {[
          '© 2026 João Paulo Azevedo',
          'Built with Next.js',
          'Designed in the void',
        ].map((item, i, arr) => (
          <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.38)', letterSpacing: '0.01em',
              padding: '0 10px',
            }}>
              {item}
            </span>
            {i < arr.length - 1 && (
              <span style={{
                width: '1px', height: '12px',
                background: 'rgba(255,255,255,0.15)',
                display: 'inline-block',
              }} />
            )}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
