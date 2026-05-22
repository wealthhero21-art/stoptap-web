// Atoms + shared bits

// ─────────────────────────────────────────────────────────────────────────
// App store routing
// Replace these URLs once the apps are live.
// ─────────────────────────────────────────────────────────────────────────
const STORE_LINKS = {
  ios:     'https://apps.apple.com/in/app/stoptap/id000000000',  // TODO: real App Store ID after first iOS submission
  android: 'https://play.google.com/store/apps/details?id=com.valuegarageupihelp.app',
  web:     'https://www.upihelp.npci.org.in/',  // desktop fallback — opens the UPI Help web service
};

function detectPlatform() {
  if (typeof navigator === 'undefined') return 'web';
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'web';
}

function useAppLink() {
  const [platform, setPlatform] = React.useState('web');
  React.useEffect(() => { setPlatform(detectPlatform()); }, []);
  return { platform, href: STORE_LINKS[platform] || STORE_LINKS.web };
}

const Logo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <linearGradient id="lgst" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2A3590" />
        <stop offset="100%" stopColor="#1B2360" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="64" height="64" rx="14" fill="url(#lgst)" />
    <circle cx="32" cy="32" r="20" fill="none" stroke="#EF7102" strokeWidth="5" />
    <circle cx="32" cy="32" r="11" fill="#FAFAF7" />
    <rect x="26" y="26" width="12" height="12" rx="2.5" fill="#EF7102" />
  </svg>
);

const Wordmark = ({ size = 22, className = "" }) => (
  <span className={`inline-flex items-center gap-2 ${className}`} style={{ fontSize: size, lineHeight: 1 }}>
    <Logo size={size + 8} />
    <span className="font-bold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
      <span className="text-brand">Stop</span><span className="text-orange">Tap</span>
      <span className="text-ink2 font-medium" style={{ fontSize: '0.65em' }}>.in</span>
    </span>
  </span>
);

const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CTAButton = ({ children, variant = "primary", size = "md", className = "", as: As = "button", ...props }) => {
  const sizes = {
    sm: "px-4 py-2 text-[13px] gap-1.5",
    md: "px-5 py-3 text-[15px] gap-2",
    lg: "px-7 py-4 text-[17px] gap-2.5",
  };
  const variants = {
    primary: "bg-orange text-white shadow-cta hover:bg-orange2",
    ghost:   "bg-white text-ink border border-line hover:border-ink/30",
    dark:    "bg-brand text-white hover:bg-brand2",
    white:   "bg-white text-brand hover:bg-bg",
  };
  return (
    <As className={`btn-press ring-focus inline-flex items-center justify-center whitespace-nowrap font-semibold rounded-full ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </As>
  );
};

// Reveal-on-scroll hook — adds .in class when the element enters viewport
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Count-up number for stats
function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1400 }) {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  const startedRef = React.useRef(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-IN');
  return <span ref={ref} className="tnum">{prefix}{display}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────────────
// Hero "phone" with subscription cards. One card cancels every 4s on a loop.
// ─────────────────────────────────────────────────────────────────────────

// Dummy logo glyphs — tiny SVGs that fill the colored tile, white stroke
const GLYPHS = {
  play:    (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>),
  pulse:   (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h3l2-6 4 12 3-9 2 3h4"/></svg>),
  news:    (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="14" rx="1.5"/><path d="M7 9h6M7 12h6M7 15h4" strokeLinecap="round"/></svg>),
  pen:     (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6L8 22H2v-6L14 4z"/><path d="M12 6l6 6"/></svg>),
  cloud:   (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 18a4 4 0 010-8 6 6 0 0111.5 1.5A3.5 3.5 0 0117 18H7z"/></svg>),
  cap:     (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>),
  shield:  (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/></svg>),
  basket:  (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18l-2 11H5L3 9z"/><path d="M8 9l4-6 4 6"/></svg>),
};

const SUBS_POOL = [
  { name: "Streamly+",     cat: "OTT",         amt: 299,  color: "#1F80E0", glyph: 'play'   },
  { name: "PulseFit",      cat: "Fitness",     amt: 1499, color: "#018136", glyph: 'pulse'  },
  { name: "BriefDaily",    cat: "News",        amt: 99,   color: "#C2410C", glyph: 'news'   },
  { name: "Sketchpad",     cat: "Design SaaS", amt: 399,  color: "#0A0E1F", glyph: 'pen'    },
  { name: "PantryPass",    cat: "Grocery",     amt: 199,  color: "#EF7102", glyph: 'basket' },
  { name: "ClipDrive",     cat: "Cloud 200GB", amt: 130,  color: "#5B6FE0", glyph: 'cloud'  },
  { name: "PrepHub",       cat: "Coaching",    amt: 899,  color: "#7C3AED", glyph: 'cap'    },
  { name: "SafeShield",    cat: "Insurance",   amt: 549,  color: "#0E7490", glyph: 'shield' },
];

function SubCard({ sub, anim }) {
  const style = anim === 'out'
    ? { animation: 'slideOutRight 1.1s cubic-bezier(.5,.05,.4,1) forwards' }
    : anim === 'in'
    ? { animation: 'slideInBottom .7s cubic-bezier(.2,.7,.3,1) forwards' }
    : null;
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-white border border-line/80 p-2.5 pr-2"
         style={{ ...style, height: 64 }}>
      <div className="shrink-0 grid place-items-center rounded-xl text-white"
           style={{ background: sub.color, width: 40, height: 40 }}>
        {GLYPHS[sub.glyph]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-semibold text-ink truncate leading-tight" style={{ letterSpacing: '-0.01em' }}>{sub.name}</div>
        <div className="text-[10.5px] text-ink2 mt-1 truncate">{sub.cat}</div>
      </div>
      <div className="text-right">
        <div className="text-[13px] font-bold text-ink tnum leading-tight whitespace-nowrap">₹{sub.amt}<span className="text-ink2 font-medium">/mo</span></div>
      </div>
      <button className="shrink-0 text-[10.5px] font-semibold text-orange bg-orange/10 hover:bg-orange/15 rounded-full px-2 py-1.5">
        Cancel
      </button>
    </div>
  );
}

function PhoneHero() {
  const [visible, setVisible] = React.useState(() => SUBS_POOL.slice(0, 4));
  const [cancelling, setCancelling] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [incoming, setIncoming] = React.useState(null);
  const visibleRef = React.useRef(visible); visibleRef.current = visible;
  const insertIdxRef = React.useRef(4); // next index in SUBS_POOL to insert

  React.useEffect(() => {
    let cancelled = false;
    let timers = [];
    const tick = () => {
      const target = visibleRef.current[0];
      if (!target) return;
      setCancelling(0);
      setToast({ amt: target.amt, name: target.name });
      timers.push(setTimeout(() => {
        if (cancelled) return;
        const incomingCard = SUBS_POOL[insertIdxRef.current % SUBS_POOL.length];
        insertIdxRef.current += 1;
        setIncoming(incomingCard);
        setVisible(v => [...v.slice(1), incomingCard]);
        setCancelling(null);
        timers.push(setTimeout(() => { if (!cancelled) setIncoming(null); }, 700));
      }, 1100));
      timers.push(setTimeout(() => { if (!cancelled) setToast(null); }, 2600));
    };
    const id = setInterval(tick, 3800);
    timers.push(setTimeout(tick, 900));
    return () => { cancelled = true; clearInterval(id); timers.forEach(clearTimeout); };
  }, []);

  // Compute "total monthly"
  const total = visible.reduce((s, x) => s + x.amt, 0);

  return (
    <div className="relative mx-auto" style={{ width: 320, maxWidth: '100%' }}>
      {/* Soft glow behind phone */}
      <div className="absolute -inset-10 -z-10 rounded-full opacity-50 blur-3xl"
           style={{ background: 'radial-gradient(closest-side, rgba(239,113,2,.18), transparent 70%)' }} />
      {/* Phone frame */}
      <div className="relative rounded-[44px] bg-ink p-3 shadow-cardL"
           style={{ boxShadow: '0 30px 80px -30px rgba(36,45,122,.45), 0 2px 0 rgba(255,255,255,.08) inset' }}>
        <div className="rounded-[34px] bg-bg overflow-hidden relative" style={{ height: 580 }}>
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-ink z-10" />
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-2.5 text-[10px] font-semibold text-ink tnum">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 6.5 L3 4.5 L5 6 L11 1" stroke="#0A0E1F" strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>
              <svg width="14" height="8" viewBox="0 0 14 8"><rect x="0.5" y="1" width="11" height="6" rx="1.2" stroke="#0A0E1F" fill="none"/><rect x="2" y="2.5" width="8" height="3" fill="#0A0E1F"/><rect x="12" y="2.5" width="1.5" height="3" fill="#0A0E1F"/></svg>
            </span>
          </div>

          {/* App header */}
          <div className="px-5 pt-6 pb-3">
            <div className="flex items-center gap-2">
              <Logo size={22} />
              <span className="text-[13px] font-semibold text-ink">StopTap</span>
              <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-green bg-green/10 px-2 py-0.5 rounded-full">Live</span>
            </div>

            {/* Savings banner — always at the top */}
            <div className="mt-3 flex items-center gap-2 bg-green/10 text-green rounded-lg px-2.5 py-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
              <span className="text-[11px] font-semibold tnum">₹4,328 saved this year</span>
            </div>

            <h3 className="mt-3 text-[19px] font-bold text-ink leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Your active<br/>AutoPay mandates
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[11px] text-ink2">Charging you</span>
              <span className="text-[15px] font-bold text-ink tnum">₹{total.toLocaleString('en-IN')}</span>
              <span className="text-[11px] text-ink2">/ month</span>
            </div>
          </div>

          {/* Card stack */}
          <div className="px-4 space-y-2 relative">
            {visible.map((s, i) => (
              <SubCard key={s.name + '-' + i} sub={s}
                       anim={cancelling === i ? 'out' : (incoming && i === visible.length - 1 && s === incoming) ? 'in' : null} />
            ))}
          </div>

          {/* Saved toast — bottom of phone, slides up */}
          {toast && (
            <div className="absolute left-1/2 -translate-x-1/2 z-20"
                 style={{ bottom: 22, animation: 'toastIn 2.6s ease-in-out forwards' }}>
              <div className="flex items-center gap-2 bg-green text-white px-3.5 py-2 rounded-full shadow-lg text-[12px] font-semibold whitespace-nowrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                Saved ₹{toast.amt}/mo
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side floating chip — Avg session, only on truly wide screens */}
      <div className="hidden 2xl:flex absolute bottom-28 bg-white rounded-2xl border border-line shadow-card p-3 gap-3 items-center"
           style={{ left: '100%', marginLeft: 20 }}>
        <div className="w-9 h-9 rounded-xl bg-brand/10 grid place-items-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#242D7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        </div>
        <div className="pr-2 whitespace-nowrap">
          <div className="text-[11px] text-ink2">Avg. session</div>
          <div className="text-[14px] font-bold text-ink tnum">58 sec</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Leak meter — the "drip from a tap" metaphor. Used as side accent.
// ─────────────────────────────────────────────────────────────────────────

function LeakMeter() {
  return (
    <div className="relative w-full max-w-md mx-auto rounded-3xl bg-white border border-line p-6 shadow-card overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-ink2">Leak meter</div>
          <div className="mt-1 text-[15px] font-semibold text-ink">Money leaking right now</div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-green font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green" style={{ animation: 'pulseDot 1.4s ease-in-out infinite' }} />
          LIVE
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-4">
        <svg viewBox="0 0 200 140" className="w-full">
          {/* Tap */}
          <rect x="20" y="20" width="60" height="16" rx="3" fill="#242D7A"/>
          <rect x="44" y="36" width="12" height="22" rx="2" fill="#242D7A"/>
          <rect x="36" y="56" width="28" height="6" rx="2" fill="#1B2360"/>
          {/* Handle */}
          <circle cx="80" cy="14" r="6" fill="#EF7102"/>
          <rect x="78" y="6" width="4" height="16" rx="2" fill="#EF7102"/>
          {/* Drips */}
          {[0, .35, .7, 1.05].map((d, i) => (
            <g key={i} style={{ animation: `dripFall 1.8s ease-in infinite`, animationDelay: `${d}s` }}>
              <ellipse cx="50" cy="64" rx="4" ry="6" fill="#EF7102"/>
              <text x="44" y="68" fontFamily="Geist Mono, monospace" fontSize="7" fontWeight="700" fill="#fff">₹</text>
            </g>
          ))}
          {/* Pool */}
          <path d="M10 132 Q100 116 190 132 L190 140 L10 140 Z" fill="#EF7102" opacity="0.18"/>
          <path d="M14 130 Q100 118 186 130" fill="none" stroke="#EF7102" strokeWidth="1.2" opacity=".5"/>
        </svg>
        <div className="text-right pb-2">
          <div className="text-[10px] uppercase tracking-wider text-ink2">/year</div>
          <div className="text-2xl font-bold text-ink tnum leading-none">₹3,200</div>
          <div className="text-[10px] text-orange font-semibold mt-1">avg. leaked</div>
        </div>
      </div>

      <button className="mt-5 w-full btn-press bg-ink text-white rounded-xl py-2.5 text-[13px] font-semibold flex items-center justify-center gap-2">
        Close the tap
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
