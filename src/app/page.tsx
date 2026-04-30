import LPHeader from '@/components/lp/LPHeader'
import HeroSection from '@/components/lp/HeroSection'
import GallerySection from '@/components/lp/GallerySection'
import HowItWorksSection from '@/components/lp/HowItWorksSection'
import FeaturesSection from '@/components/lp/FeaturesSection'
import TestimonialsSection from '@/components/lp/TestimonialsSection'
import PricingSection from '@/components/lp/PricingSection'
import FAQSection from '@/components/lp/FAQSection'
import CTASection from '@/components/lp/CTASection'
import LPFooter from '@/components/lp/LPFooter'
import SectionDivider from '@/components/lp/SectionDivider'

export default function Home() {
  return (
    <div className="lp-page flex min-h-screen flex-col" style={{ fontFamily: 'var(--font-lp-sans)' }}>
      <LPHeader />
      <main className="flex-1">
        <HeroSection />
        <SectionDivider />
        <GallerySection />
        <SectionDivider />
        <div className="lp-section-alt">
          <HowItWorksSection />
        </div>
        <SectionDivider />
        <FeaturesSection />
        <SectionDivider />
        <div className="lp-section-alt">
          <TestimonialsSection />
        </div>
        <SectionDivider />
        <PricingSection />
        <SectionDivider />
        <FAQSection />
        <CTASection />
      </main>
      <LPFooter />
    </div>
  )
}
