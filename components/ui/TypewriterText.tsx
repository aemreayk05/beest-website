'use client';

/**
 * TypewriterText
 * Pure-CSS typewriter effect with animated gradient and blinking caret.
 * Words cycle: STRONG → CREATIVE → BOLD → UNIQUE (infinite)
 *
 * All CSS lives in globals.css to prevent SSR/client hydration mismatches.
 * Design: gradient #7F00FF → #00c2ff → #e54cff → #ffc640 clipped to text.
 */

interface TypewriterTextProps {
    /** Extra classes forwarded to the root span */
    className?: string;
}

export default function TypewriterText({ className = '' }: TypewriterTextProps) {
    return (
        <span className={`typewriter-root ${className}`} aria-hidden="true">
            <span className="typewriter-words" />
        </span>
    );
}
