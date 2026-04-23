import LPHeader from '@/components/lp/LPHeader'
import LPFooter from '@/components/lp/LPFooter'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LPHeader />
      <main className="min-h-screen bg-white">{children}</main>
      <LPFooter />
    </>
  )
}
