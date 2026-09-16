# Local website fonts

These WOFF2 files are served from this folder. The website makes no requests to a font CDN.

- **Inter variable, Latin, weights 100–900**: paragraphs, navigation, labels, buttons and form controls.
  - Source: https://fontsource.org/fonts/inter/cdn
  - Download: https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@5.3.0/latin-wght-normal.woff2
- **Manrope variable, Latin, weights 200–800**: headings.
  - Source: https://fontsource.org/fonts/manrope/cdn
  - Download: https://cdn.jsdelivr.net/fontsource/fonts/manrope:vf@5.3.0/latin-wght-normal.woff2

Both use the SIL Open Font License 1.1. Their original license notices are included alongside the font files. Keep the notices when distributing the fonts. The Latin subsets suit the current English website; add language subsets if new scripts are introduced.

Font families are declared with `@font-face` in `../css/styles.css`. Font display uses `swap` to keep text readable while fonts load. Variable files provide multiple weights without downloading separate files for each weight.
