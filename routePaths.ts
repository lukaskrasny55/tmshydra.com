
export const ROUTE_PATHS = {
  home: '/',
  about: '/o-nas',
  services: '/sluzby',
  otherServices: '/ostatne-sluzby',
  projects: '/realizacie',
  tech: '/technologie',
  contact: '/kontakt',
  faq: '/caste-otazky',
  blog: '/blog',
  priceLanding: '/hydroizolacia-plochej-strechy-cena',
  sosLanding: '/oprava-zatekajucej-strechy',
  privacyPolicy: '/ochrana-osobnych-udajov',
  terms: '/obchodne-podmienky',
} as const;

const SLUG_BY_PATH: Record<string, string> = {
  [ROUTE_PATHS.home]: 'home',
  [ROUTE_PATHS.about]: 'about',
  [ROUTE_PATHS.services]: 'services',
  [ROUTE_PATHS.otherServices]: 'other-services',
  [ROUTE_PATHS.projects]: 'projects',
  [ROUTE_PATHS.tech]: 'tech',
  [ROUTE_PATHS.contact]: 'contact',
  [ROUTE_PATHS.faq]: 'faq',
  [ROUTE_PATHS.blog]: 'blog',
  [ROUTE_PATHS.priceLanding]: 'price-landing',
  [ROUTE_PATHS.sosLanding]: 'sos-landing',
  [ROUTE_PATHS.privacyPolicy]: 'privacy-policy',
  [ROUTE_PATHS.terms]: 'terms',
};

export const getSlugForPath = (pathname: string): string =>
  SLUG_BY_PATH[pathname] ?? 'home';

export const PATH_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_BY_PATH).map(([path, slug]) => [slug, path])
);
