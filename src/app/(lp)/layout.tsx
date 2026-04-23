import LPHeader from '@/components/lp/LPHeader'
import LPFooter from '@/components/lp/LPFooter'

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <LPHeader />
      <main className="flex-1">{children}</main>
      <LPFooter />
    </div>
  )
}
