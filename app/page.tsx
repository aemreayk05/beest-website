import Hero from '@/components/sections/Hero';
import Hizmetler from '@/components/sections/Hizmetler';
import NedenBiz from '@/components/sections/NedenBiz';
import Projects from '@/components/sections/Projects';
import CalismaGecisi from '@/components/sections/CalismaGecisi';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import BeestMarquee from '@/components/ui/BeestMarquee';
import QuickAccessCard from '@/components/ui/QuickAccessCard';
import { client } from '@/sanity/lib/client';

async function getServices() {
  try {
    const query = `*[_type == "service"] | order(no asc) {
      _id,
      no,
      baslik,
      aciklama,
      etiketler,
      "gorsel": gorsel.asset->url
    }`;
    return await client.fetch(query, {}, { next: { revalidate: 30 } });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [];
  }
}

async function getWhyUs() {
  try {
    const query = `*[_type == "whyUs"] | order(no asc) {
      _id,
      no,
      tag,
      iconName,
      title,
      desc
    }`;
    return await client.fetch(query, {}, { next: { revalidate: 30 } });
  } catch (error) {
    console.error("Sanity fetch error (WhyUs):", error);
    return [];
  }
}

async function getProjects() {
  try {
    const query = `*[_type == "project"] | order(orderNo asc) {
      _id,
      baslik,
      musteri,
      kategori,
      "resim": resim.asset->url,
      link
    }`;
    return await client.fetch(query, {}, { next: { revalidate: 30 } });
  } catch (error) {
    console.error("Sanity fetch error (Projects):", error);
    return [];
  }
}

export default async function Home() {
  const services = await getServices();
  const whyUsReasons = await getWhyUs();
  const projects = await getProjects();

  return (
    <main className="bg-[#F3F3F3] overflow-clip">
      <Hero />
      
      <Hizmetler services={services} />
      
      <div className="hidden lg:block">
        <BeestMarquee className="py-4 text-[#111111]" speed={50} />
      </div>

      {/* Neden Biz — Desktop scroll-dial + Mobil inline story */}
      <NedenBiz reasons={whyUsReasons} />

      <div className="hidden lg:block">
        <BeestMarquee className="py-2 opacity-30 text-[#111111]" text="BEEST: GROWTH PARTNERS • " outlineText={true} speed={60} />
      </div>

      <Projects projects={projects} />

      {/* Masaüstü Çalışma Geçişi */}
      <div className="hidden lg:block">
        <CalismaGecisi />
      </div>

      {/* Mobil Çalışma Süreci Hızlı Erişim Kartı */}
      <QuickAccessCard
        titleLine1="Yol"
        titleLine2="Haritası"
        outlineLine={1}
        imageSrc="/calisma_surecimiz.jpeg"
        href="/surec"
        className="max-lg:my-6 relative z-20"
      />

      <Pricing />
      
      <div className="hidden lg:block">
        <BeestMarquee className="py-6 lg:py-8 bg-[#111111] text-[#7F00FF]" text="READY TO BUILD WITH BEEST? • " speed={60} />
      </div>
      
      <Contact />
    </main>
  );
}
