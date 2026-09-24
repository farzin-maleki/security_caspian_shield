# Security Caspian Shield Ltd

A responsive corporate website using semantic HTML, external CSS and vanilla JavaScript. No frameworks or build step. Font Awesome 7.3.1 is loaded from cdnjs for interface icons.

## Structure

```text
index.html                    # Homepage at the project root
dist/                         # Supporting pages and shared assets
  about.html
  services.html
  security-guard.html
  mobile-patrol.html
  door-supervisor.html
  event-security.html
  construction-security.html
  contact.html
  quote.html
  assets/
    css/styles.css            # Brand tokens, components, responsive rules
    css/motion.css            # Headline, image, menu and hover animations
    js/data.js                # Company contacts and reusable service data
    js/site.js                # Shared navigation/footer, cards, form behaviour
    js/motion.js              # Heading line wrappers and one-time scroll reveals
    fonts/                    # Local Inter and Manrope WOFF2 files and licenses
    images/logo.webp           # Supplied original logo
    images/team.webp
    images/site-officer.webp
    images/premises.webp
```

Open `index.html` directly, or use a local static server such as Live Server. Every page is a separate HTML document with its own title, description and main content. Shared components load through deferred scripts. No client-side router is used. For ordinary static hosting, upload the root `index.html` and the `dist` folder together, preserving this layout. Do not upload repository metadata or development scripts.


## Editing

- Colours, typography and spacing: `dist/assets/css/styles.css`.
- Local fonts and their licenses: `dist/assets/fonts/`. Inter is used for body and small text; Manrope is used for headings.
- Page entrance and hover effects: `dist/assets/css/motion.css`. Headlines reveal in sequence, photographs uncover horizontally, and cards enter in short groups. `dist/assets/js/motion.js` handles heading wrappers and one-time scroll reveals. Reduced-motion preferences disable these effects; keyboard focus cancels active reveals so controls remain accessible.
- Contact details and shared service cards/options: `dist/assets/js/data.js`.
- Shared navigation/footer and interactions: `dist/assets/js/site.js`.
- All interface icons use Font Awesome `<i>` elements. Each page loads `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css`; an internet connection is needed for these icons. Instagram, WhatsApp and telephone links retain accessible names and hover titles. Their targets still come from `data.js`.
- Page-specific content: the separate HTML files. Detailed service prose is also retained in the data file for reuse; keep it aligned when editing.

## Quote requests

The form validates required fields, email format and phone length, supports service preselection, and shows an enquiry preview. Visitors choose email or WhatsApp, review the prepared message and send it themselves. The site never claims delivery. There is no backend inbox or automatic mail delivery, and no analytics or browser storage of personal details. An email application is required for mailto links. No enquiry was sent during testing.

## Content sources

Company name, logo, services and visual direction were supplied by the user.

Profile: https://www.instagram.com/security_caspian_shield/

The profile displayed GLJ Safeguard Ltd, with older Aras Security posts. The user confirmed previous branding and authorised use of profile content. Its bio includes “Protecting your peace of mind”, Door Supervisors, Retail Security, Events Security and CP Security. No unverified staff names, accreditations, company statistics or operating-region claims have been added.

Photographs saved locally:

- `team.webp`: https://www.instagram.com/security_caspian_shield/p/DJGn9Mmgxpx/ (1 May 2025)
- `site-officer.webp`: https://www.instagram.com/security_caspian_shield/p/DIM1OZhAXlk/ (8 April 2025)
- `premises.webp`: https://www.instagram.com/security_caspian_shield/p/DILiP6bAkQN/ (8 April 2025)

The premises-sign photograph supplies 07532 817 131 and info@arassecurity.co.uk, together with a WhatsApp symbol. The number is normalised to +44 7532 817131. These are historic public contacts the user authorised using; current reachability and WhatsApp availability have not been independently verified. Update phone, whatsapp and email in data.js when replacement contacts are available. Photographs retain original branding; the About page identifies them as archive imagery.
