// All page sections except the hero (which lives in app.jsx as <Hero/>)

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const app = useAppLink();
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-line' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center"><Wordmark size={18} /></a>
        <nav className="hidden md:flex items-center gap-8 text-[14px] text-ink2 whitespace-nowrap">
          <a href="#how" className="hover:text-ink transition">How it works</a>
          <a href="#why" className="hover:text-ink transition">Why us</a>
          <a href="#faq" className="hover:text-ink transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <CTAButton as="a" href={app.href} size="sm" className="hidden sm:inline-flex">Get the App <ArrowRight size={14}/></CTAButton>
          <button className="md:hidden p-2 -mr-2" aria-label="Menu" onClick={() => setOpen(v=>!v)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"}/></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-bg">
          <div className="px-5 py-3 flex flex-col gap-3 text-[15px]">
            <a href="#how" onClick={()=>setOpen(false)}>How it works</a>
            <a href="#why" onClick={()=>setOpen(false)}>Why us</a>
            <a href="#faq" onClick={()=>setOpen(false)}>FAQ</a>
            <CTAButton as="a" href={app.href} size="sm" className="self-start">Get the App <ArrowRight size={14}/></CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
const HEADLINES = {
  silent: { line1: "Stop the silent", line2: <>tap on your <span className="text-orange">bank account.</span></> },
  trial:  { line1: "Your ₹499 OTT trial", line2: <>from 2024 is <span className="text-orange">still charging you.</span></> },
  oneScreen: { line1: "Every UPI AutoPay you forgot.", line2: <>In <span className="text-orange">one screen.</span></> },
};

function Hero({ headline = "silent" }) {
  const h = HEADLINES[headline] || HEADLINES.silent;
  const app = useAppLink();
  const ctaLabel = app.platform === 'web' ? 'Find My Subscriptions' : 'Find My Subscriptions';
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft radial wash */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30"
             style={{ background: 'radial-gradient(closest-side, rgba(36,45,122,.35), transparent 70%)' }} />
        <div className="absolute top-20 -right-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
             style={{ background: 'radial-gradient(closest-side, rgba(239,113,2,.40), transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 md:pt-20 pb-16 md:pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-8 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-line px-3 py-1.5 text-[12px] text-ink2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulseDot 1.6s ease-in-out infinite' }} />
            <span>Now live for all UPI users in India</span>
          </div>

          <h1 className="mt-5 font-bold text-ink tracking-tight"
              style={{ fontSize: 'clamp(36px, 6.4vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.035em', textWrap: 'balance' }}>
            <span className="block">{h.line1}</span>
            <span className="block">{h.line2}</span>
          </h1>

          <p className="mt-5 text-ink2 max-w-xl" style={{ fontSize: 'clamp(15px, 1.5vw, 19px)', lineHeight: 1.5 }}>
            See and cancel every UPI AutoPay mandate across GPay, PhonePe, Paytm, and your bank apps. Takes 60 seconds. <span className="text-ink font-medium">Your UPI PIN is never required to view.</span>
          </p>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
            <CTAButton as="a" href={app.href} size="lg" className="w-full sm:w-auto">
              {ctaLabel} <ArrowRight size={18}/>
            </CTAButton>
            <span className="text-[13px] text-ink2 sm:ml-2">
              Free · No login · {app.platform === 'ios' ? 'On the App Store' : app.platform === 'android' ? 'On Google Play' : 'Takes 60 seconds'}
            </span>
          </div>

          {/* Store badges row — visible on mobile + tablet */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 lg:hidden">
            <a href={STORE_LINKS.ios} className="btn-press inline-flex items-center gap-2 bg-ink text-white rounded-xl px-3 py-2 text-[12px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.1 1.2 9.5.8 1.1 1.7 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.6-.1-.1-2.7-1-2.7-4.1zM14 5.2c.6-.8 1.1-1.9.9-3-.9 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.5 2.9-1.3z"/></svg>
              <div className="text-left leading-tight whitespace-nowrap"><div className="text-[9px] opacity-70">Download on the</div><div className="font-semibold">App Store</div></div>
            </a>
            <a href={STORE_LINKS.android} className="btn-press inline-flex items-center gap-2 bg-ink text-white rounded-xl px-3 py-2 text-[12px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3.6 2.5l11 9.5L3.6 21.5c-.4-.2-.6-.6-.6-1.1V3.6c0-.5.2-.9.6-1.1z" fill="#34A853"/>
                <path d="M14.6 12L17.9 9 20.7 10.5c.8.4.8 1.6 0 2L17.9 14l-3.3-2z" fill="#FBBC04"/>
                <path d="M3.6 2.5L14.6 12 17.9 9 5.4 2c-.6-.3-1.3 0-1.8.5z" fill="#EA4335"/>
                <path d="M3.6 21.5L14.6 12l3.3 3-12.5 6.8c-.5.3-1.3.2-1.8-.3z" fill="#4285F4"/>
              </svg>
              <div className="text-left leading-tight whitespace-nowrap"><div className="text-[9px] opacity-70">Get it on</div><div className="font-semibold">Google Play</div></div>
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[12px] text-ink2">
            <span className="font-mono uppercase tracking-wider text-[10.5px] text-ink2/80">Works with</span>
            {['Google Pay', 'PhonePe', 'Paytm', 'BHIM', '100+ banks'].map(n => (
              <span key={n} className="px-2.5 py-1 rounded-full bg-white border border-line whitespace-nowrap">{n}</span>
            ))}
          </div>
        </div>

        {/* Right column: phone */}
        <div className="reveal relative">
          <PhoneHero />
        </div>
      </div>
    </section>
  );
}

// ─── Problem strip ──────────────────────────────────────────────────────────
function ProblemStrip() {
  const stats = [
    { n: 3200, prefix: '₹', label: 'Average money lost per year to forgotten UPI mandates.' },
    { n: 5.4, decimals: 1, label: 'Average active AutoPay mandates per UPI user.' },
    { n: 0, label: 'Number of places where you could see them all… until now.' },
  ];
  return (
    <section className="relative bg-brand text-white overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      {/* Orange accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(239,113,2,.6), transparent)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28 relative">
        <div className="reveal max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-orange">The leak</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight" style={{ letterSpacing: '-0.025em', textWrap: 'balance' }}>
            Forgotten mandates are quietly the most expensive thing in your UPI app.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-14">
          {stats.map((s, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i*80}ms` }}>
              <div className="font-bold tnum text-white" style={{ fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                <CountUp to={s.n} prefix={s.prefix || ''} decimals={s.decimals || 0} />
              </div>
              <div className="mt-3 h-px w-12 bg-orange" />
              <p className="mt-4 text-white/75 max-w-xs" style={{ fontSize: 15, lineHeight: 1.45 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-[12px] text-white/40 font-mono">
          Source: internal estimates based on public UPI mandate data, 2026.
        </p>
      </div>
    </section>
  );
}

// ─── How it works ──────────────────────────────────────────────────────────
const StepIcon1 = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#242D7A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="6" width="24" height="36" rx="4" />
    <path d="M22 36h4M18 11h12" />
    <circle cx="24" cy="20" r="1.2" fill="#EF7102" stroke="none"/>
  </svg>
);
const StepIcon2 = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#242D7A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="14" width="36" height="22" rx="3"/>
    <path d="M6 22h36M12 30h6M22 30h4"/>
    <circle cx="36" cy="30" r="1.5" fill="#EF7102" stroke="none"/>
  </svg>
);
const StepIcon3 = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#242D7A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="16"/>
    <path d="M17 24l5 5 9-11" stroke="#EF7102"/>
  </svg>
);

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Enter your UPI-linked mobile number', d: 'No signup, no password. We use the OTP your bank already sends you.', icon: <StepIcon1/> },
    { n: '02', t: 'We pull every active AutoPay mandate', d: 'Across all your UPI apps and banks, in one clean list — with names, amounts, and next-debit dates.', icon: <StepIcon2/> },
    { n: '03', t: 'Tap once to cancel', d: 'Or keep. Your call. Cancellations reflect in 24–72 hours, with email confirmation.', icon: <StepIcon3/> },
  ];
  return (
    <section id="how" className="relative bg-bg">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="reveal max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-orange">How it works</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-ink tracking-tight" style={{ letterSpacing: '-0.025em', textWrap: 'balance' }}>
            Three steps. About sixty seconds.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal relative bg-white rounded-3xl p-7 border border-line shadow-card" style={{ transitionDelay: `${i*80}ms` }}>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand/5 grid place-items-center">{s.icon}</div>
                <span className="font-mono text-[12px] text-ink2/70 tracking-wider">{s.n}</span>
              </div>
              <h3 className="mt-7 text-[20px] font-semibold text-ink tracking-tight" style={{ letterSpacing: '-0.015em' }}>{s.t}</h3>
              <p className="mt-2 text-ink2 text-[14.5px] leading-relaxed">{s.d}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-line" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Categories (what you'll probably find) ────────────────────────────────
function Categories() {
  const cats = [
    { ic: '🎬', name: 'OTT',                   eg: 'Netflix, Prime, Hotstar',     amt: '₹149–₹1,499 / mo' },
    { ic: '💪', name: 'Gym & fitness apps',    eg: 'CultFit, FitClub, HealthifyMe', amt: '₹500–₹2,000 / mo' },
    { ic: '📰', name: 'News & magazines',      eg: 'TOI+, ET Prime, The Ken',     amt: '₹99–₹499 / mo' },
    { ic: '🛠️', name: 'SaaS tools you tried once', eg: 'Notion, Canva, Figma',    amt: '₹299–₹999 / mo' },
    { ic: '🎓', name: 'Coaching & edtech',     eg: 'Unacademy, BYJU\'S, PW',      amt: '₹500–₹3,000 / mo' },
    { ic: '🏦', name: 'Loan EMIs',             eg: 'Personal, BNPL, gold',        amt: 'Varies' },
    { ic: '🛡️', name: 'Insurance premiums',    eg: 'Health, term, vehicle',       amt: '₹400–₹4,000 / mo' },
    { ic: '⚡', name: 'Utility autopay',       eg: 'Electricity, gas, broadband', amt: '₹600–₹3,000 / mo' },
    { ic: '🥡', name: 'Food & grocery memberships', eg: 'Swiggy One, Zepto Pass, BB Star', amt: '₹99–₹399 / mo' },
  ];
  return (
    <section className="relative bg-bg border-t border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="reveal max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-orange">In the wild</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-ink tracking-tight" style={{ letterSpacing: '-0.025em', textWrap: 'balance' }}>
            Forgot what you signed up for? You're not alone.
          </h2>
          <p className="mt-4 text-ink2 max-w-xl text-[16px]">A snapshot of what we find on most accounts. You'll probably recognise more than you'd like.</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cats.map((c, i) => (
            <div key={c.name} className="reveal group bg-white border border-line rounded-2xl p-5 hover:border-ink/15 hover:shadow-card transition flex items-start gap-4"
                 style={{ transitionDelay: `${(i%3)*60}ms` }}>
              <div className="w-11 h-11 rounded-xl bg-bg border border-line grid place-items-center text-[20px]">{c.ic}</div>
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-ink tracking-tight">{c.name}</div>
                <div className="text-[12.5px] text-ink2 mt-0.5">{c.eg}</div>
                <div className="text-[13px] font-semibold text-orange mt-2 tnum">{c.amt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust strip ───────────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { ic: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>),
      t: 'Your UPI PIN is never needed', d: 'Viewing mandates uses a read-only path. Your PIN never touches StopTap.' },
    { ic: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>),
      t: 'No data stored on our servers', d: 'Your mandate list lives in your session, not in our database. Close the tab, it\'s gone.' },
    { ic: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>),
      t: 'Works at the UPI network layer', d: 'Every bank, every UPI app — one list. No partnerships, no gatekeepers.' },
    { ic: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/></svg>),
      t: 'Built in India for Indian users', d: 'A small team in Bengaluru. We use this every day on our own accounts.' },
  ];
  return (
    <section id="why" className="relative bg-white border-y border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {items.map((it, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i*60}ms` }}>
              <div className="w-10 h-10 rounded-xl bg-brand/5 text-brand grid place-items-center">{it.ic}</div>
              <div className="mt-4 text-[15px] font-semibold text-ink tracking-tight">{it.t}</div>
              <div className="mt-1.5 text-[13.5px] text-ink2 leading-relaxed">{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Honesty section ───────────────────────────────────────────────────────
function Honesty() {
  return (
    <section className="relative bg-bg">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="reveal">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-orange">A note from us</div>
          <blockquote className="mt-5 text-ink tracking-tight" style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', lineHeight: 1.3, letterSpacing: '-0.015em', textWrap: 'pretty' }}>
            <span className="text-orange font-bold mr-1">"</span>
            StopTap.in is an independent product. We're not NPCI, the RBI, or the government. We've built a focused, fast interface on top of the public UPI mandate management infrastructure that every UPI user can already access — so you can do in 60 seconds what would otherwise take an hour across five apps.
            <span className="text-orange font-bold ml-1">"</span>
          </blockquote>
          <div className="mt-6 flex items-center gap-3 text-[13px] text-ink2">
            <div className="w-9 h-9 rounded-full bg-brand text-white grid place-items-center font-semibold text-[12px]">A&amp;K</div>
            <div>
              <div className="text-ink font-medium">Aarav &amp; Kavya</div>
              <div>Founders, StopTap.in · Bengaluru</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────
function FAQ() {
  const qs = [
    { q: 'Is StopTap.in safe?', a: 'Yes. We never ask for your UPI PIN to view mandates. Viewing uses a read-only path that\'s already available to every UPI user — we just present it cleanly. Cancellations go through your own UPI app\'s standard confirmation flow.' },
    { q: 'Do I need to give my UPI PIN?', a: 'No — not to view your mandates. For some cancellations, your bank may ask you to confirm with a UPI PIN inside your own UPI app (GPay, PhonePe, Paytm). You never enter your UPI PIN on StopTap.' },
    { q: 'Why haven\'t I heard of this before?', a: 'Because nobody surfaced it. The mandate management infrastructure has existed for years — it just lives behind 5+ taps in each UPI app, with no consolidated view. We built that view.' },
    { q: 'Which UPI apps and banks does this work with?', a: 'Every one, in principle. StopTap works at the UPI network layer, so it sees mandates from GPay, PhonePe, Paytm, BHIM, and 100+ Indian banks regardless of where the mandate was originally set up.' },
    { q: 'How long does cancellation take to reflect?', a: 'Most cancellations reflect within 24–72 hours. We\'ll send an email when your bank confirms it, and the mandate disappears from your list automatically.' },
    { q: 'What if I cancelled by mistake — can I set it up again?', a: 'Yes. Re-authorise the mandate from the original biller (the OTT app, gym, etc.) just like the first time. Cancellation doesn\'t end your service contract — only the auto-debit. You\'ll just be billed manually until you set it up again.' },
    { q: 'Is StopTap.in affiliated with NPCI or the Indian government?', a: 'No. StopTap.in is an independent product. We are not NPCI, the RBI, or the Government of India, and we don\'t claim to be authorised, regulated, or partnered with them.' },
    { q: 'How do you make money?', a: 'Right now, we don\'t. We\'re founder-funded. Cancelling mandates will always be free. Down the line, we may add optional paid features — like real-time alerts before a new mandate is set up, or AI-powered "is this worth keeping?" reports. We\'ll never sell your data, and we\'ll always say what changed.' },
  ];
  return (
    <section id="faq" className="relative bg-bg border-t border-line">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="reveal text-center">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-orange">FAQ</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-ink tracking-tight" style={{ letterSpacing: '-0.025em' }}>Questions, answered straight.</h2>
        </div>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {qs.map((item, i) => (
            <details key={i} className="group reveal" style={{ transitionDelay: `${i*30}ms` }}>
              <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none">
                <span className="text-[16px] md:text-[17px] font-semibold text-ink tracking-tight pr-2">{item.q}</span>
                <span className="faq-plus shrink-0 w-7 h-7 rounded-full bg-white border border-line grid place-items-center text-ink2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 1v10M1 6h10"/></svg>
                </span>
              </summary>
              <div className="pb-6 pr-10 text-[14.5px] text-ink2 leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────
function FinalCTA() {
  const app = useAppLink();
  return (
    <section className="relative bg-brand text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30"
           style={{ background: 'radial-gradient(closest-side, rgba(239,113,2,.55), transparent 70%)' }} />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 md:py-32 text-center relative">
        <div className="reveal">
          <h2 className="font-bold tracking-tight" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', lineHeight: 1.04, letterSpacing: '-0.03em', textWrap: 'balance' }}>
            Find out what you're<br/>actually paying for.
          </h2>
          <p className="mt-5 text-white/70 text-[16px] md:text-[19px]">Takes 60 seconds. No login. No catch.</p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTAButton as="a" href={app.href} size="lg" className="w-full sm:w-auto">Find My Subscriptions <ArrowRight size={18}/></CTAButton>
          </div>

          {/* Store badges */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <a href={STORE_LINKS.ios} className="btn-press inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl px-3.5 py-2.5 text-[12px] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.1 1.2 9.5.8 1.1 1.7 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.6-.1-.1-2.7-1-2.7-4.1zM14 5.2c.6-.8 1.1-1.9.9-3-.9 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.5 2.9-1.3z"/></svg>
              <div className="text-left leading-tight whitespace-nowrap"><div className="text-[9px] opacity-70">Download on the</div><div className="font-semibold">App Store</div></div>
            </a>
            <a href={STORE_LINKS.android} className="btn-press inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl px-3.5 py-2.5 text-[12px] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3.6 2.5l11 9.5L3.6 21.5c-.4-.2-.6-.6-.6-1.1V3.6c0-.5.2-.9.6-1.1z" fill="#34A853"/>
                <path d="M14.6 12L17.9 9 20.7 10.5c.8.4.8 1.6 0 2L17.9 14l-3.3-2z" fill="#FBBC04"/>
                <path d="M3.6 2.5L14.6 12 17.9 9 5.4 2c-.6-.3-1.3 0-1.8.5z" fill="#EA4335"/>
                <path d="M3.6 21.5L14.6 12l3.3 3-12.5 6.8c-.5.3-1.3.2-1.8-.3z" fill="#4285F4"/>
              </svg>
              <div className="text-left leading-tight whitespace-nowrap"><div className="text-[9px] opacity-70">Get it on</div><div className="font-semibold">Google Play</div></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sticky mobile bottom CTA ──────────────────────────────────────────────
function MobileStickyCTA() {
  const app = useAppLink();
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className={`md:hidden fixed left-0 right-0 bottom-0 z-50 px-4 pb-4 pt-3 transition-all duration-300 ${show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
      style={{ background: 'linear-gradient(to top, rgba(250,250,247,1) 60%, rgba(250,250,247,0))' }}
    >
      <a href={app.href}
         className="btn-press flex items-center justify-center gap-2 w-full bg-orange text-white rounded-full py-3.5 text-[15px] font-semibold shadow-cta">
        {app.platform === 'ios' ? 'Get StopTap on App Store' : app.platform === 'android' ? 'Get StopTap on Google Play' : 'Find My Subscriptions'}
        <ArrowRight size={16}/>
      </a>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-bg border-t border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <Wordmark size={18} />
            <p className="mt-3 text-[14px] text-ink2 max-w-xs">Stop the silent tap.</p>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink2/70">Product</div>
            <ul className="mt-3 space-y-2 text-[14px] text-ink">
              <li><a href="#how" className="hover:text-orange">How it works</a></li>
              <li><a href="#faq" className="hover:text-orange">FAQ</a></li>
              <li><a href="#why" className="hover:text-orange">Why us</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink2/70">Legal</div>
            <ul className="mt-3 space-y-2 text-[14px] text-ink">
              <li><a href="/privacy" className="hover:text-orange">Privacy</a></li>
              <li><a href="#" className="hover:text-orange">Terms</a></li>
              <li><a href="#" className="hover:text-orange">Security</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink2/70">Contact</div>
            <ul className="mt-3 space-y-2 text-[14px] text-ink">
              <li><a href="mailto:hi@stoptap.in" className="hover:text-orange">hi@stoptap.in</a></li>
              <li><a href="#" className="hover:text-orange">Twitter / X</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[12px] text-ink2">
          <div>© 2026 StopTap.in · Built in India · Independent of NPCI and the Government of India.</div>
          <div className="font-mono text-[11px] text-ink2/70">v1.0 · stoptap.in</div>
        </div>
      </div>
    </footer>
  );
}
