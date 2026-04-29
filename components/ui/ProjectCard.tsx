import Image from 'next/image';

interface ProjectCardProps {
    baslik: string;
    musteri: string;
    kategori: string[];
    resim: string;
    link?: string;
}

export default function ProjectCard({
    baslik,
    musteri,
    kategori,
    resim,
    link = '#',
}: ProjectCardProps) {
    return (
        <a
            href={link}
            className="group relative flex flex-col w-[85vw] md:w-[60vw] lg:w-[40vw] lg:max-w-[640px] shrink-0 bg-white rounded-[2rem] p-4 lg:p-5 transition-transform duration-500 ease-out hover:-translate-y-2 pointer-events-auto"
            style={{
                boxShadow: '0 10px 40px -10px rgba(127,0,255,0.08)',
            }}
        >
            {/* Resim Alanı */}
            <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-[#F3F3F3] mb-5">
                {resim ? (
                    <Image
                        src={resim}
                        alt={`${baslik} Projesi - ${musteri}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                        unoptimized={resim.endsWith('.svg')}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EDE8F5] to-[#D9CCF0] opacity-50 flex items-center justify-center">
                        <span className="text-[#7F00FF]/40 font-bold tracking-widest uppercase text-xs">Görsel Bekleniyor</span>
                    </div>
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 border-[2px] border-transparent rounded-[1.5rem] transition-colors duration-500 group-hover:border-[#7F00FF]/30 pointer-events-none" />
            </div>

            {/* Metin ve Etiket Alanı */}
            <div className="flex flex-col flex-1 px-2 lg:px-4">
                <div className="flex justify-between items-start mb-4 gap-4">
                    <div>
                        <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#7F00FF] mb-2">
                            {musteri}
                        </p>
                        <h3 className="text-lg lg:text-2xl font-black leading-tight tracking-tight text-[#111111] group-hover:text-[#7F00FF] transition-colors duration-300">
                            {baslik}
                        </h3>
                    </div>
                    {/* Sağ Üst Ok */}
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-[#F3F3F3] text-[#111111] group-hover:bg-[#7F00FF] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-black/5">
                    <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
                        {kategori.map((k) => (
                            <li
                                key={k}
                                className="px-3 py-1 text-[0.65rem] font-semibold rounded-full border border-[#7F00FF]/20 text-[#7F00FF] bg-[#7F00FF]/5"
                            >
                                {k}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </a >
    );
}
