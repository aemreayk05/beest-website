'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ─── Words that cycle before the brand reveal ───────────────────────────────
const WORDS = ['Strong', 'Creative', 'Digital', 'Bold'] as const;

const WORD_DURATION = 2400;   // ms each word stays visible
const TRANSITION_S  = 0.42;  // seconds for in/out animation

const enterVariants = {
    initial: { opacity: 0, y: '60%', filter: 'blur(6px)' },
    animate: {
        opacity: 1,
        y: '0%',
        filter: 'blur(0px)',
        transition: {
            duration: TRANSITION_S,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
    exit: {
        opacity: 0,
        y: '-50%',
        filter: 'blur(4px)',
        transition: {
            duration: TRANSITION_S * 0.8,
            ease: [0.55, 0, 0.45, 1] as [number, number, number, number],
        },
    },
};

interface HeroWordCycleProps {
    onComplete: () => void;
}

export default function HeroWordCycle({ onComplete }: HeroWordCycleProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => {
            const next = index + 1;
            if (next >= WORDS.length) {
                onComplete();
            } else {
                setIndex(next);
            }
        }, WORD_DURATION);
        return () => clearTimeout(t);
    }, [index, onComplete]);

    const word = WORDS[index];

    return (
        /*
         * Inline-flex container: inherits the line height of "Be",
         * clips the y-slide so words don't overflow above/below.
         * No position:absolute, no translateY tricks — just flex centering.
         */
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                overflow: 'hidden',
                /* Tall enough to contain the largest word + slide movement */
                height: '1.3em',
                /* Wide enough for CREATIVE (longest word) — prevents layout shift */
                minWidth: '8ch',
                /* Sit on the same center-line as the "Be" text */
                verticalAlign: 'middle',
            }}
            aria-live="polite"
            aria-atomic="true"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={word}
                    variants={enterVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        color: '#7F00FF',
                        /* No position:absolute — stays in flex flow */
                    }}
                >
                    {word}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
