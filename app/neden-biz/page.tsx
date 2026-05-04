import NedenBiz from '@/components/sections/NedenBiz';
import Contact from '@/components/sections/Contact';
import { client } from '@/sanity/lib/client';

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

export default async function NedenBizPage() {
    const whyUsReasons = await getWhyUs();

    return (
        <main className="bg-[#F3F3F3] min-h-screen pt-24">
            <div className="lg:hidden">
                <NedenBiz reasons={whyUsReasons} />
                <Contact />
            </div>
            <div className="hidden lg:flex items-center justify-center min-h-[60vh] text-center">
                <p className="text-xl text-black/60">Bu sayfa mobil görünüm içindir. Lütfen ana sayfaya dönün.</p>
            </div>
        </main>
    );
}
