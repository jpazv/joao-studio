'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (href: string) => {
    setActive(href); setMenuOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16,1,0.3,1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
          height: '52px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(10, 6, 20, 0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'background 0.35s, border-color 0.35s',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          whileHover={{ opacity: 0.65 }}
          transition={{ duration: 0.15 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600, fontSize: '1rem',
            color: 'var(--text-1)', textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          JA
        </motion.a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            <button key={link.href} onClick={() => go(link.href)}
              style={{
                fontFamily: 'var(--font-sans)', fontWeight: 400,
                fontSize: '0.875rem',
                color: active === link.href ? 'var(--text-1)' : 'var(--text-3)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-1)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = active === link.href ? 'var(--text-1)' : 'var(--text-3)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.label.charAt(0) + link.label.slice(1).toLowerCase()}
            </button>
          ))}

          <a href="mailto:joao@email.com"
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500,
              fontSize: '0.825rem',
              color: 'var(--text-1)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '5px 14px', borderRadius: 'var(--radius-sm)',
              textDecoration: 'none', marginLeft: '8px',
              transition: 'background 0.15s, border-color 0.15s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.13)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          >
            Hire me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="flex md:hidden flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
        >
          {[0,1,2].map(i => (
            <motion.span key={i}
              animate={{
                rotate: menuOpen ? (i===0?45:i===2?-45:0) : 0,
                y: menuOpen ? (i===0?8:i===2?-8:0) : 0,
                opacity: menuOpen && i===1 ? 0 : 1,
              }}
              style={{ display: 'block', width: 18, height: 1.5, background: 'var(--text-2)', transformOrigin: 'center' }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(8,5,16,0.92)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              zIndex: 999,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '2rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button key={link.href}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => go(link.href)}
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: '2rem', color: 'var(--text-1)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label.charAt(0) + link.label.slice(1).toLowerCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
