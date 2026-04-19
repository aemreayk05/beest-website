'use client';

import { motion } from 'framer-motion';

interface Props {
  text?: string;
  className?: string;
  speed?: number;
  outlineText?: boolean;
  textSizeClass?: string; // font boyutu override
}

export default function BeestMarquee({ 
  text = "BEEST STUDIO • DIGITAL ARCHITECTS • ", 
  className = "",
  speed = 40,
  outlineText = false,
  textSizeClass = "text-[3rem] md:text-[5rem] lg:text-[7rem]",
}: Props) {
  // Ultra geniş ekranlarda dahi boşluk kalmaması adına metni defalarca tekrarlıyoruz
  const repeatedText = Array(12).fill(text).join("");

  return (
    <div className={`relative w-full overflow-hidden flex ${className} select-none pointer-events-none`}>
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: [0, "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: speed 
        }}
      >
        {/* Metni iki kez ardışık yazdırıyoruz ki x="-50%" olduğunda kesintisiz loop oluşsun */}
        <div className="flex">
            <span 
                className={`pr-8 font-black uppercase tracking-tighter ${textSizeClass} ${outlineText ? 'text-transparent' : ''}`}
                style={outlineText ? { WebkitTextStroke: '2px rgba(127,0,255,0.4)' } : { color: 'currentColor' }}
            >
              {repeatedText}
            </span>
            <span 
                className={`pr-8 font-black uppercase tracking-tighter ${textSizeClass} ${outlineText ? 'text-transparent' : ''}`}
                style={outlineText ? { WebkitTextStroke: '2px rgba(127,0,255,0.4)' } : { color: 'currentColor' }}
            >
              {repeatedText}
            </span>
        </div>
      </motion.div>
    </div>
  );
}
