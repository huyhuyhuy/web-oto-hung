import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'

export const metadata: Metadata = {
  title: 'Hùng Nguyễn - V I N F A S T - Xe Điện VinFast Chính Hãng',
  description: 'Showroom VinFast uy tín, chuyên bán xe điện VinFast. Đăng ký lái thử miễn phí, tư vấn nhiệt tình, giá tốt nhất thị trường.',
  keywords: 'VinFast, xe điện, VF8, VF9, VFe34, bán xe VinFast, đăng ký lái thử',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
