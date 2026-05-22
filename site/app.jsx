// Main StopTap app — composes nav, hero, sections + tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "silent",
  "accent": "#EF7102"
}/*EDITMODE-END*/;

const HEADLINE_OPTIONS = [
  { value: 'silent',    label: 'Stop the silent tap…' },
  { value: 'trial',     label: '₹499 OTT trial…' },
  { value: 'oneScreen', label: 'Every UPI AutoPay…' },
];

const ACCENT_OPTIONS = ['#EF7102', '#E0457B', '#5B6FE0', '#0E7490', '#018136'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // Push accent into CSS so the whole page picks it up via the `orange` Tailwind alias
  // We override key bindings of the orange color via a single style tag.
  React.useEffect(() => {
    const id = '__stoptap_accent';
    let el = document.getElementById(id);
    if (!el) { el = document.createElement('style'); el.id = id; document.head.appendChild(el); }
    const a = t.accent;
    el.textContent = `
      .text-orange{color:${a} !important}
      .bg-orange{background-color:${a} !important}
      .bg-orange\\/10{background-color:${a}1a !important}
      .bg-orange\\/15{background-color:${a}26 !important}
      .border-orange{border-color:${a} !important}
      .hover\\:bg-orange2:hover{background-color:${shade(a,-12)} !important}
      .shadow-cta{box-shadow:0 1px 0 rgba(255,255,255,.25) inset, 0 8px 24px -6px ${a}99 !important}
    `;
  }, [t.accent]);

  return (
    <>
      <Nav />
      <main>
        <Hero headline={t.headline} />
        <ProblemStrip />
        <HowItWorks />
        <Categories />
        <TrustStrip />
        <Honesty />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakSelect
          label="Headline"
          value={t.headline}
          options={HEADLINE_OPTIONS}
          onChange={(v) => setTweak('headline', v)}
        />
        <TweakSection label="Brand" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak('accent', v)}
        />
      </TweaksPanel>
    </>
  );
}

// Lighten/darken hex by percent. -12 = 12% darker.
function shade(hex, percent) {
  const n = parseInt(hex.replace('#',''), 16);
  let r = (n >> 16) & 0xff, g = (n >> 8) & 0xff, b = n & 0xff;
  const p = percent / 100;
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + (p < 0 ? c * p : (255 - c) * p))));
  r = f(r); g = f(g); b = f(b);
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
