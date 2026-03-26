import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";

export const metadata: Metadata = {
  title: "Beest Systems Agency — Premium Dijital Deneyimler",
  description:
    "İsviçre stili hassasiyetle strateji, marka, web tasarımı ve geliştirme alanlarında üst düzey dijital deneyimler üretiyoruz.",
  keywords: ["yaratıcı ajans", "web tasarımı", "marka kimliği", "dijital deneyim"],
  openGraph: {
    title: "Beest Systems Agency — Premium Dijital Deneyimler",
    description:
      "Strateji, marka, web tasarımı ve dijital geliştirme alanlarında üst düzey deneyimler.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="bg-dirty-white text-jet-black antialiased flex flex-col min-h-screen">
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
