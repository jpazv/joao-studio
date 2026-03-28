'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Project } from '@/lib/constants'

const TRAFFIC = ['#FF5F57', '#FEBC2E', '#28C840']

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ animation: `float-gentle ${6 + index * 0.8}s ease-in-out ${index * 0.9}s infinite` }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16,1,0.3,1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          background: 'var(--glass)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          border: `1px solid ${hovered ? 'var(--glass-border-hover)' : 'var(--glass-border)'}`,
          boxShadow: hovered ? 'var(--shadow-window-hover)' : 'var(--shadow-window)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, box-shadow 0.35s',
          cursor: 'pointer',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* macOS title bar */}
        <div style={{
          padding: '11px 14px',
          borderBottom: `1px solid ${hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)'}`,
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.025)',
          transition: 'border-color 0.25s',
          userSelect: 'none',
        }}>
          {TRAFFIC.map(c => (
            <div key={c} style={{
              width: 11, height: 11, borderRadius: '50%', background: c,
              opacity: hovered ? 1 : 0.5,
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }} />
          ))}
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 500,
            color: 'rgba(255,255,255,0.4)', marginLeft: '8px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {project.name}
          </span>
          <span style={{
            marginLeft: 'auto', flexShrink: 0,
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.22)',
          }}>
            {project.year}
          </span>
        </div>

        {/* Content area */}
        <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
            color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.01em', margin: 0,
          }}>
            {project.name}
          </h3>

          <p style={{
            fontFamily: 'var(--font-sans)', fontWeight: 400,
            fontSize: '0.875rem', color: 'rgba(255,255,255,0.48)',
            lineHeight: 1.65, margin: 0, flex: 1,
          }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 400,
                color: 'rgba(255,255,255,0.38)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '2px 7px', borderRadius: '5px',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          <motion.a
            href={project.link} target="_blank" rel="noopener noreferrer"
            whileHover={{ x: 2 }}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.8rem',
              color: hovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px',
              transition: 'color 0.2s', width: 'fit-content', cursor: 'pointer',
            }}
          >
            View project <span style={{ fontSize: '0.75rem' }}>↗</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
