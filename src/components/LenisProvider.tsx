'use client'

// Lenis removido — dois RAF loops (Lenis + R3F) competindo no main thread causam scroll jank.
// Usando CSS scroll-behavior nativo que é GPU-accelerated e não interfere com R3F.
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
