import LPHeader from '@/components/lp/LPHeader'
import ScrollDriver from '@/components/lp/ScrollDriver'
import BrandBackground from '@/components/lp/BrandBackground'
import HeroDepthInkwash, { ArrivalLine } from '@/components/lp/HeroDepthInkwash'
import MizuhikiRibbon from '@/components/lp/MizuhikiRibbon'
import InstantDemoSection from '@/components/lp/InstantDemoSection'
import GallerySection from '@/components/lp/GallerySection'
import HowItWorksSection from '@/components/lp/HowItWorksSection'
import FeaturesSection from '@/components/lp/FeaturesSection'
import PricingSection from '@/components/lp/PricingSection'
import FAQSection from '@/components/lp/FAQSection'
import CTASection from '@/components/lp/CTASection'
import LPFooter from '@/components/lp/LPFooter'
import MobileStickyCTA from '@/components/lp/MobileStickyCTA'

export default function Home() {
  return (
    <div className="lp-page flex min-h-screen flex-col" style={{ fontFamily: 'var(--font-lp-sans)' }}>
      <ScrollDriver />
      <BrandBackground />
      <LPHeader />
      <main className="flex-1" style={{ position: 'relative', zIndex: 1 }}>
        {/* HERO: dark depth-travel space that fades into the light washi world */}
        <HeroDepthInkwash />

        {/* LOWER: light ink-wash region, threaded by the mizuhiki ribbon */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <MizuhikiRibbon />
          <ArrivalLine />
          <InstantDemoSection />
          <GallerySection />
          <HowItWorksSection />
          <FeaturesSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </div>
      </main>
      <LPFooter />
      <MobileStickyCTA />
    </div>
  )
}
