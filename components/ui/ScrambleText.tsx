'use client';

import { useEffect, useState } from 'react';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

interface ScrambleTextProps {
    text: string;
    duration?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
    startDelay?: number;
}

export default function ScrambleText({
    text,
    duration = 50, // frames per scramble
    delay = 30, // interval in ms
    className = '',
    onComplete,
    startDelay = 0
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let frame = 0;
        let interval: NodeJS.Timeout;
        let startTimeout: NodeJS.Timeout;

        const startAnimation = () => {
            setIsAnimating(true);
            interval = setInterval(() => {
                let scrambled = '';
                let isFinished = true;

                for (let i = 0; i < text.length; i++) {
                    // Decide if this character should be revealed
                    const revealFrame = (i * (duration / text.length));
                    if (frame >= revealFrame) {
                        scrambled += text[i];
                    } else {
                        scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
                        isFinished = false;
                    }
                }

                setDisplayText(scrambled);
                frame++;

                if (isFinished) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    if (onComplete) onComplete();
                }
            }, delay);
        };

        if (startDelay > 0) {
            startTimeout = setTimeout(startAnimation, startDelay);
        } else {
            startAnimation();
        }

        return () => {
            clearInterval(interval);
            clearTimeout(startTimeout);
        };
    }, [text, duration, delay, startDelay, onComplete]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
}
