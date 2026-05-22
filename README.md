# stoptap-web

Marketing site for **StopTap**, served at https://stoptap.in.

Single-page React site (React 18 + Babel standalone + Tailwind, all via CDN — **no build step**), served by nginx in one container on the shared Coolify server (Dockerfile, port 80, routed via Traefik).

## Structure
```
Dockerfile            nginx:alpine serving /site
nginx.conf            clean URLs, /jsx mime, /health
site/
  index.html          page shell: meta, Tailwind config, fonts, FAQ JSON-LD, script tags
  app.jsx             root component + theming
  sections.jsx        Nav, Hero, HowItWorks, FAQ, Footer, MobileStickyCTA, ...
  components.jsx       atoms: Logo, CTAButton, PhoneHero, STORE_LINKS + useAppLink
  tweaks-panel.jsx     dev-only editor (stays hidden in production)
  og.png / favicon.png brand images
  privacy/index.html   privacy policy (linked from the footer + used for store listings)
```

## Edit the download targets
The Download / "Find My Subscriptions" CTAs route through `useAppLink()` (device
detection). Update the three constants at the top of `site/components.jsx`:

```js
const STORE_LINKS = {
  ios:     'https://apps.apple.com/in/app/stoptap/id000000000',         // replace after iOS submission
  android: 'https://play.google.com/store/apps/details?id=com.valuegarageupihelp.app',
  web:     'https://www.upihelp.npci.org.in/',                          // desktop fallback
};
```

## Still placeholder (from the design brief)
- iOS App Store ID (no iOS build yet)
- Footer: founder names, Terms/Security links, Twitter/X, contact email
- Swap the in-browser dev React/Babel for a real build if you want production-optimised JS

## Deploy
Coolify builds from this repo's Dockerfile. Push to `main`, then redeploy.
