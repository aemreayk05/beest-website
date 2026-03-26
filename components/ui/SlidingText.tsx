'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface SlidingTextProps {
    texts: string[];
    currentIndex: number;
    className?: string;
}

export default function SlidingText({ texts, currentIndex, className = '' }: SlidingTextProps) {
    const textVariants = {
        initial: { y: '100%', opacity: 0 },
        animate: {
            y: '0%',
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1] as const, // Swiss-style premium ease
            },
        },
        exit: {
            y: '-100%',
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1] as const,
            },
        },
    };

    return (
        <div className={`relative overflow-hidden inline-flex ${className}`} style={{ verticalAlign: 'bottom' }}>
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={currentIndex}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="inline-block whitespace-nowrap"
                >
                    {texts[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
