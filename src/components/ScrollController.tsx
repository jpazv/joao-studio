'use client'
import { useEffect, useRef } from 'react'

const SECTIONS = ['hero', 'about', 'work', 'contact']
const DURATION = 1600 // ms — slow, void-like
const EASE = (t: number) => t < 0.5
  ? 4 * t * t * t
  : 1 - Math.pow(-2 * t + 2, 3) / 2 // easeInOutCubic

export default function ScrollController() {
  const isScrolling = useRef(false)
  const current = useRef(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const els = SECTIONS
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    // Sync current index to actual scroll position
    const syncCurrent = () => {
      let closest = 0
      let minDist = Infinity
      els.forEach((el, i) => {
        const dist = Math.abs(el.getBoundingClientRect().top)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      current.current = closest
    }

    const goTo = (index: number) => {
      if (index < 0 || index >= els.length) return
      if (isScrolling.current) {
        if (raf.current) cancelAnimationFrame(raf.current)
        isScrolling.current = false
      }

      current.current = index
      isScrolling.current = true

      const start = window.scrollY
      const target = els[index].offsetTop
      const dist = target - start
      const t0 = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - t0) / DURATION, 1)
        window.scrollTo(0, start + dist * EASE(progress))
        if (progress < 1) {
          raf.current = requestAnimationFrame(tick)
        } else {
          isScrolling.current = false
        }
      }

      raf.current = requestAnimationFrame(tick)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling.current) return
      syncCurrent()
      goTo(current.current + (e.deltaY > 0 ? 1 : -1))
    }

    // Touch support
    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return
      const delta = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(delta) < 30) return
      syncCurrent()
      goTo(current.current + (delta > 0 ? 1 : -1))
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return null
}
