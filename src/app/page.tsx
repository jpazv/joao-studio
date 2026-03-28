import Navbar from '@/components/nav/Navbar'
import HeroSection from '@/components/hero/HeroSection'
import AboutSection from '@/components/about/AboutSection'
import WorkSection from '@/components/work/WorkSection'
import ContactSection from '@/components/contact/ContactSection'
import LenisProvider from '@/components/LenisProvider'

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
    </LenisProvider>
  )
}
