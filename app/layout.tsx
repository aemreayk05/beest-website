import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import MobileNavbar from "@/components/layout/MobileNavbar";
import DesktopBlogButton from "@/components/layout/DesktopBlogButton";
export const metadata: Metadata = {
  metadataBase: new URL('https://beeststudio.com'),
  title: "Beest Studio — Premium Dijital Deneyimler",
  description:
    "İsviçre stili hassasiyetle strateji, marka, web tasarımı ve geliştirme alanlarında üst düzey dijital deneyimler üretiyoruz.",
  keywords: ["yaratıcı ajans", "web tasarımı", "marka kimliği", "dijital deneyim", "beest studio"],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Beest Studio — Premium Dijital Deneyimler",
    description:
      "Strateji, marka, web tasarımı ve dijital geliştirme alanlarında üst düzey deneyimler.",
    url: 'https://beeststudio.com',
    siteName: 'Beest Studio',
    locale: 'tr_TR',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Beest Studio — Premium Dijital Deneyimler",
    description: "İsviçre stili hassasiyetle üst düzey dijital deneyimler üretiyoruz.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Agency",
  "name": "Beest Studio",
  "url": "https://beeststudio.com",
  "logo": "https://beeststudio.com/favicon.ico",
  "description": "Strateji, marka, web tasarımı ve geliştirme alanlarında üst düzey dijital deneyimler.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Levent, Büyükdere Cd. No:1",
    "addressLocality": "Beşiktaş",
    "addressRegion": "İstanbul",
    "postalCode": "34330",
    "addressCountry": "TR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-212-000-00-00",
    "contactType": "customer service",
    "email": "hello@beeststudio.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-dirty-white text-jet-black antialiased flex flex-col min-h-screen">
        <MobileNavbar />
        <DesktopBlogButton />
        <LoadingScreen />
        <SmoothScroll>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
