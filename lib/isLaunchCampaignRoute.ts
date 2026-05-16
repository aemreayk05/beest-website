export function isLaunchCampaignRoute(pathname: string): boolean {
    if (pathname.startsWith('/admin')) return false;
    if (pathname === '/') return true;
    if (pathname === '/fiyatlandirma') return true;
    return false;
}
