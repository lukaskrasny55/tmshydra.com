
export const ROUTE_PATHS = {
  home: '/',
  about: '/o-nas',
  services: '/sluzby',
  otherServices: '/ostatne-sluzby',
  projects: '/realizacie',
  tech: '/technologie',
  contact: '/kontakt',
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
  [ROUTE_PATHS.privacyPolicy]: 'privacy-policy',
  [ROUTE_PATHS.terms]: 'terms',
};

export const getSlugForPath = (pathname: string): string =>
  SLUG_BY_PATH[pathname] ?? 'home';
