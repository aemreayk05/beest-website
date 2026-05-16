'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LaunchCampaignModal from '@/components/marketing/LaunchCampaignModal';
import { useLaunchCampaignTrigger } from '@/hooks/useLaunchCampaignTrigger';
import { isLaunchCampaignRoute } from '@/lib/isLaunchCampaignRoute';
import { goToHomeSection } from '@/lib/launchCampaignNavigation';
import { trackLaunchCampaignEvent } from '@/lib/launchCampaignAnalytics';

export default function LaunchCampaignRoot() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [routeAllowed, setRouteAllowed] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const allowed =
            isLaunchCampaignRoute(pathname) &&
            !(pathname === '/fiyatlandirma' && window.innerWidth >= 1024);

        setRouteAllowed(allowed);
    }, [mounted, pathname]);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        trackLaunchCampaignEvent('launch_modal_shown');
    }, []);

    useLaunchCampaignTrigger({
        enabled: mounted && routeAllowed && !isOpen,
        onTrigger: handleOpen,
    });

    const handleClose = useCallback(() => {
        setIsOpen(false);
        trackLaunchCampaignEvent('launch_modal_closed');
    }, []);

    const handleDismiss = useCallback(() => {
        setIsOpen(false);
        trackLaunchCampaignEvent('launch_modal_closed');
    }, []);

    const handlePrimaryCta = useCallback(() => {
        trackLaunchCampaignEvent('launch_modal_primary_cta_clicked');
        setIsOpen(false);
        goToHomeSection('pricing', pathname, router.push);
    }, [pathname, router]);

    const handleSecondaryCta = useCallback(() => {
        trackLaunchCampaignEvent('launch_modal_secondary_cta_clicked');
        setIsOpen(false);
        goToHomeSection('contact', pathname, router.push);
    }, [pathname, router]);

    if (!mounted || !routeAllowed) return null;

    return (
        <LaunchCampaignModal
            isOpen={isOpen}
            onClose={handleClose}
            onDismiss={handleDismiss}
            onPrimaryCta={handlePrimaryCta}
            onSecondaryCta={handleSecondaryCta}
        />
    );
}
