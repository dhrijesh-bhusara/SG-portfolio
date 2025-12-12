import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LuxArch | Luxury Interior Architecture Studio',
  description: 'Premium architectural design and interior spaces for discerning clients. Ultra-minimalist, modern aesthetics.',
  keywords: ['architecture', 'interior design', 'luxury', 'minimalist', 'premium'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
