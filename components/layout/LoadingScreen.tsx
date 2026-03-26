'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isUnmounted, setIsUnmounted] = useState(false);

    useEffect(() => {
        // Spline / Model yüklemesini simüle eden sayaç
        // 0'dan 100'e estetik bir hızda çıkması hedeflenir. Toplam ~2.5sn

        let currentStatus = 0;
        const intervalId = setInterval(() => {
            // Rastgele ama mantıklı artışlar
            const increment = Math.floor(Math.random() * 15) + 5;
            currentStatus += increment;

            if (currentStatus >= 100) {
                currentStatus = 100;
                setProgress(currentStatus);
                clearInterval(intervalId);

                // %100 olduktan hemen sonra kaybolma animasyonunu (fade-out) tetikle
                setTimeout(() => {
                    setIsFadingOut(true);

                    // CSS transition süresi kadar bekleyip DOM'dan sonsuza dek sil
                    setTimeout(() => {
                        setIsUnmounted(true);
                    }, 800); // 800ms duration
                }, 300); // %100 de ekranda 300ms kal
            } else {
                setProgress(currentStatus);
            }
        }, 150);

        return () => clearInterval(intervalId);
    }, []);

    if (isUnmounted) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111] transition-opacity duration-800 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            <div className="flex flex-col items-center">
                {/* Logo / Marka */}
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest mb-8">
                    BEEST<span className="text-[#7F00FF]">.</span>
                </h1>

                {/* Progress Yüzdesi */}
                <div className="text-white/40 text-sm tracking-[0.3em] font-medium mb-4 w-16 text-center">
                    {progress}%
                </div>

                {/* İlerleme Çubuğu (Proses Bar) */}
                <div className="w-48 md:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#7F00FF] transition-all duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
