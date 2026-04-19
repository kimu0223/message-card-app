import LPHeader from '@/components/lp/LPHeader'
import HeroSection from '@/components/lp/HeroSection'
import HowItWorksSection from '@/components/lp/HowItWorksSection'
import FeaturesSection from '@/components/lp/FeaturesSection'
import PricingSection from '@/components/lp/PricingSection'
import FAQSection from '@/components/lp/FAQSection'
import CTASection from '@/components/lp/CTASection'
import LPFooter from '@/components/lp/LPFooter'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LPHeader />
      <main className="flex-1">
        <HeroSection />
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
