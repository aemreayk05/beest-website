import Hero from '@/components/sections/Hero';
import Hizmetler from '@/components/sections/Hizmetler';
import Projects from '@/components/sections/Projects';
import CalismaGecisi from '@/components/sections/CalismaGecisi';
import NedenBiz from '@/components/sections/NedenBiz';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Hizmetler />
      <NedenBiz />
      <Projects />
      <CalismaGecisi />
      <Pricing />
      <Contact />
    </main>
  );
}
