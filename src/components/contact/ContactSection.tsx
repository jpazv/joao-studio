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
        width: 'min(600px, 100vw)', height: 'min(600px, 100vw)',
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
          href="https://mail.google.com/mail/?view=cm&to=jpazevedomoreiraa@gmail.com"
          target="_blank" rel="noopener noreferrer"
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
        <SocialIcon href="https://linkedin.com/in/jpazv" label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </SocialIcon>
        <SocialIcon href="https://twitter.com/jp_azv" label="X / Twitter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
        </SocialIcon>
        <SocialIcon href="https://wa.me/5588999981111" label="WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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
