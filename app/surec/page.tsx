import CalismaGecisi from '@/components/sections/CalismaGecisi';
import Contact from '@/components/sections/Contact';

export default function SurecPage() {
    return (
        <main className="bg-[#F3F3F3] min-h-screen pt-24 overflow-hidden">
            <div className="lg:hidden">
                <CalismaGecisi />
                <Contact />
            </div>
            <div className="hidden lg:flex items-center justify-center min-h-[60vh] text-center px-6">
                <p className="text-xl text-black/60">Bu sayfa mobil görünüm içindir. Lütfen ana sayfaya dönün.</p>
            </div>
        </main>
    );
}
