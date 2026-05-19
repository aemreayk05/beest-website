export const SITE_SECTIONS = {
  hero: 'hero',
  hizmetler: 'hizmetler',
  nedenBiz: 'neden-biz',
  projeler: 'projeler',
  surec: 'surec',
  paketler: 'paketler',
  iletisim: 'iletisim',
} as const;

/** Müşteri pillar'ları (hero hariç — nav hash'lerinde kullan) */
export type PillarSectionId = Exclude<
  (typeof SITE_SECTIONS)[keyof typeof SITE_SECTIONS],
  'hero'
>;

export function homeHash(section: PillarSectionId): string {
  return `/#${section}`;
}

export type LaunchCampaignSection = 'paketler' | 'iletisim';
