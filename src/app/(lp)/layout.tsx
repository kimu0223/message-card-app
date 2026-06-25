import LPHeader from '@/components/lp/LPHeader'
import LPFooter from '@/components/lp/LPFooter'
import MobileStickyCTA from '@/components/lp/MobileStickyCTA'

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <LPHeader />
      <main className="flex-1">{children}</main>
      <LPFooter />
      {/* ガイド等の (lp) 配下ページにも追従CTAを表示。home は (lp) 外なので二重マウントしない */}
      <MobileStickyCTA />
    </div>
  )
}
