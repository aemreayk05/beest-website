'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const defaultWords = ["Creative", "Systems", "Studio", "Digital"];

export default function PremiumTyping({
    wordsList = defaultWords,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenWords = 2000,
}: {
    wordsList?: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetweenWords?: number;
}) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleType = () => {
            const currentFullWord = wordsList[currentWordIndex];
            
            if (isDeleting) {
                // Remove a character
                setCurrentText(currentFullWord.substring(0, currentText.length - 1));
            } else {
                // Add a character
                setCurrentText(currentFullWord.substring(0, currentText.length + 1));
            }

            // State Checks
            if (!isDeleting && currentText === currentFullWord) {
                // Word completes typing, wait then delete
                timeout = setTimeout(() => setIsDeleting(true), delayBetweenWords);
            } else if (isDeleting && currentText === '') {
                // Deletion completes, move to next word
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % wordsList.length);
            } else {
                // Normal typing wait times
                const speed = isDeleting ? deletingSpeed : typingSpeed;
                // Add slight randomness for a natural premium feel
                const randomSpeed = speed + (Math.random() - 0.5) * 30;
                timeout = setTimeout(handleType, randomSpeed);
            }
        };

        timeout = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, wordsList, typingSpeed, deletingSpeed, delayBetweenWords]);

    return (
        <span
            style={{
                display: 'inline-grid',
                alignItems: 'center',
                color: '#7F00FF',
                textShadow: '0 0 30px rgba(127,0,255,0.3)',
                whiteSpace: 'nowrap',
                textAlign: 'left',
                fontFamily: "'Proxima Nova', 'Montserrat', sans-serif"
            }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
        >
            {/* Görünmez Kelimeler: Grid alanının genişliğini en uzun kelimeye göre kilitler */}
            {wordsList.map((word, idx) => (
                <span key={idx} style={{ visibility: 'hidden', gridArea: '1/1', userSelect: 'none' }}>
                    {word}
                    {/* Cursor için boşluk toleransı */}
                    &nbsp; 
                </span>
            ))}

            {/* Gerçek Animasyonlu Metin */}
            <span style={{ gridArea: '1/1', display: 'flex', alignItems: 'center' }}>
                {currentText}
                {/* Blinking Cursor */}
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    style={{
                        display: 'inline-block',
                        width: '4px',
                        height: '1em',
                        backgroundColor: '#7F00FF',
                        marginLeft: '8px',
                        boxShadow: '0 0 10px #7F00FF',
                    }}
                />
            </span>
        </span>
    );
}
