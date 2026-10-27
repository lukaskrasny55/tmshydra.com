// Smaller WebP variants (-640 / -1280) are generated at build time by
// scripts/optimize-project-images.mjs next to every full-size (1920px) WebP.
// Cards and gallery tiles use these so mobile visitors don't download
// 500-850 KB photos for a 350 px wide tile. The full-size file is only used
// for the lightbox.
const variant = (src: string, w: number) => src.replace(/\.webp$/i, `-${w}.webp`);

export const imgVariants = (src: string) => ({
  src: variant(src, 1280),
  srcSet: `${variant(src, 640)} 640w, ${variant(src, 1280)} 1280w`,
});
