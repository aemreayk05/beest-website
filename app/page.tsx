import Hero from '@/components/sections/Hero';
import Hizmetler from '@/components/sections/Hizmetler';
import NedenBiz from '@/components/sections/NedenBiz';
import Projects from '@/components/sections/Projects';
import CalismaGecisi from '@/components/sections/CalismaGecisi';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import BeestMarquee from '@/components/ui/BeestMarquee';
import QuickAccessCard from '@/components/ui/QuickAccessCard';

export default function Home() {
  return (
    <main className="bg-[#F3F3F3] overflow-clip">
      <Hero />
      
      <Hizmetler />
      
      <BeestMarquee className="py-4 text-[#111111]" speed={50} />

      {/* Masaüstü Neden Biz */}
      <div className="hidden lg:block">
        <NedenBiz />
      </div>

      {/* Mobil Neden Biz Hızlı Erişim Kartı */}
      <QuickAccessCard
        title="Neden Biz?"
        description="Fark yaratan yaklaşımımız."
        iconName="Award"
        href="/neden-biz"
        className="max-lg:mb-6 max-lg:mt-4 relative z-20"
      />

      <div className="hidden lg:block">
        <BeestMarquee className="py-2 opacity-30 text-[#111111]" text="BEEST: GROWTH PARTNERS • " outlineText={true} speed={60} />
      </div>

      <Projects />

      {/* Masaüstü Çalışma Geçişi */}
      <div className="hidden lg:block">
        <CalismaGecisi />
      </div>

      {/* Mobil Çalışma Süreci Hızlı Erişim Kartı */}
      <QuickAccessCard
        title="Çalışma Sürecimiz"
        description="Fikirden ürüne giden yol."
        iconName="Layers"
        href="/surec"
        bgColor="bg-[#111111]"
        textColor="text-white"
        iconColor="text-[#7F00FF]"
        className="max-lg:my-6 relative z-20"
      />

      <Pricing />
      
      <BeestMarquee className="py-6 lg:py-8 bg-[#111111] text-[#7F00FF]" text="READY TO BUILD WITH BEEST? • " speed={60} />
      
      <Contact />
    </main>
  );
}
