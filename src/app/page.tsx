import LPHeader from '@/components/lp/LPHeader'
import HeroSection from '@/components/lp/HeroSection'
import GallerySection from '@/components/lp/GallerySection'
import HowItWorksSection from '@/components/lp/HowItWorksSection'
import FeaturesSection from '@/components/lp/FeaturesSection'
import PricingSection from '@/components/lp/PricingSection'
import FAQSection from '@/components/lp/FAQSection'
import CTASection from '@/components/lp/CTASection'
import LPFooter from '@/components/lp/LPFooter'

export default function Home() {
  return (
    <div className="lp-page flex min-h-screen flex-col" style={{ fontFamily: 'var(--font-lp-sans)' }}>
      <LPHeader />
      <main className="flex-1">
        <HeroSection />
        <GallerySection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <LPFooter />
    </div>
  )
}
