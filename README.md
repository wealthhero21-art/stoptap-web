# stoptap-web

Marketing site for **StopTap**, served at https://stoptap.in.

- Static site (HTML/CSS/JS), served by nginx in a single container on the shared
  Coolify server (Dockerfile build pack, port 80, routed via Traefik).
- The **Download app** CTA detects the visitor's device and redirects:
  - Android → Google Play
  - iOS → App Store
  - Desktop → the web version (UPI Help portal)

## Edit the download targets
The three URLs live in one place at the bottom of `site/index.html`:

```js
var LINKS = {
  android: "https://play.google.com/store/apps/details?id=com.valuegarageupihelp.app",
  ios: "https://apps.apple.com/app/idXXXXXXXXX",   // replace after first App Store submission
  desktop: "https://www.upihelp.npci.org.in/"
};
```

The Android link already uses the real package id and will work once the app is
published. Replace the iOS placeholder ID after the app's first App Store build.

## Structure
```
Dockerfile          nginx:alpine serving /site
nginx.conf          clean URLs + /health
site/
  index.html        landing page (inline CSS/JS)
  privacy/index.html  privacy policy (linked from listings)
  assets/           logo, icon, og image, screenshots
```

## Deploy
Coolify app builds from this repo's Dockerfile. Push to `main`, then redeploy
(Coolify auto-deploys on push if enabled, or trigger via API/dashboard).
