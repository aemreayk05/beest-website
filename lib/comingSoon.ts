// Yer tutucu mod: Vercel'de COMING_SOON=true iken tüm site "Yakında" ekranına döner.
// Build sırasında okunur; değeri değiştirdikten sonra redeploy gerekir.
export const isComingSoon = process.env.COMING_SOON === 'true';
