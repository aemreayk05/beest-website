export type LaunchCampaignSection = 'pricing' | 'contact';

export function scrollToHomeSection(section: LaunchCampaignSection): void {
    if (typeof window === 'undefined') return;

    const el = document.getElementById(section);
    if (!el) return;

    if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/** Ana sayfadaki #pricing veya #contact bölümüne git */
export function goToHomeSection(
    section: LaunchCampaignSection,
    pathname: string,
    push: (href: string) => void
): void {
    if (pathname === '/') {
        scrollToHomeSection(section);
        return;
    }

    push(`/#${section}`);

    window.setTimeout(() => {
        scrollToHomeSection(section);
    }, 600);
}
