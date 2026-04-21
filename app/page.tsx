import Hero from '@/components/sections/Hero';
import Hizmetler from '@/components/sections/Hizmetler';
import NedenBiz from '@/components/sections/NedenBiz';
import Projects from '@/components/sections/Projects';
import CalismaGecisi from '@/components/sections/CalismaGecisi';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import BeestMarquee from '@/components/ui/BeestMarquee';

export default function Home() {
  return (
    <main className="bg-[#F3F3F3]">
      <Hero />
      <Hizmetler />
      <BeestMarquee className="py-4 text-[#111111]" speed={50} />
      <NedenBiz />
      <BeestMarquee className="py-2 opacity-30 text-[#111111]" text="BEEST: GROWTH PARTNERS • " outlineText={true} speed={60} />
      <Projects />
      <CalismaGecisi />
      <Pricing />
      <BeestMarquee className="py-8 bg-[#111111] text-[#7F00FF]" text="READY TO BUILD WITH BEEST? • " speed={60} />
      <Contact />
    </main>
  );
}
