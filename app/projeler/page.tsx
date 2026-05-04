import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function ProjelerPage() {
    return (
        <main className="bg-[#F3F3F3] min-h-screen pt-24">
            <div className="lg:hidden">
                <Projects />
                <Contact />
            </div>
            <div className="hidden lg:flex items-center justify-center min-h-[60vh] text-center">
                <p className="text-xl text-black/60">Bu sayfa mobil görünüm içindir. Lütfen ana sayfaya dönün.</p>
            </div>
        </main>
    );
}
