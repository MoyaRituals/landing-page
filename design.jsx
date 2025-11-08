import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// --- Simple runtime sanity checks (acts as lightweight "tests") ---
function runSanityChecks() {
  try {
    // Benefits items must be an array of objects with title/body
    const okBenefits = BENEFITS_ITEMS.length === 3 && BENEFITS_ITEMS.every(b => typeof b.title === "string" && typeof b.body === "string");
    console.assert(okBenefits, "Benefits sanity check failed: items must have title/body and length=3");

    // Ritual steps must be [1,2,3]
    const stepNums = RITUAL_STEPS.map(s => s.n).join(",");
    console.assert(stepNums === "1,2,3", "Ritual sanity check failed: steps should be 1,2,3");
  } catch (err) {
    // Never crash UI on checks
    console.error("Sanity checks error", err);
  }
}

// Shared content (prevents stray/duplicate fragments)
const BENEFITS_ITEMS = [
  { title: "Brings skin and body back into sync", body: "Daily use helps soften visible redness and fatigue while restoring a rested look." },
  { title: "A reset you’ll actually keep", body: "Two steps in under three minutes—mist to arrive, serum to stay." },
  { title: "Clean, effective, comfortable", body: "Elegant textures, thoughtful actives, recyclable‑first packaging." }
];

const RITUAL_STEPS = [
  { n: 1, title: "Breathe", body: "Three slow breaths. Shoulders drop." },
  { n: 2, title: "Mist", body: "Two passes to cue presence." },
  { n: 3, title: "Serum", body: "Three drops. Press over face and neck." }
];

export default function NovaRitualsLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    runSanityChecks();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-900 font-sans">
      <Header />
      <Hero />
      <SectionPadding>
        <Benefits />
      </SectionPadding>
      <SectionDivider />
      <SectionPadding>
        <Products />
      </SectionPadding>
      <SectionPadding>
        <Ritual />
      </SectionPadding>
      <SectionPadding>
        <Founder />
      </SectionPadding>
      <SectionPadding>
        <CTA email={email} setEmail={setEmail} onSubmit={handleSubmit} submitted={submitted} />
      </SectionPadding>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold tracking-wide">NOVA Rituals</span>
        </div>
        <a href="#waitlist" className="px-4 py-2 rounded-2xl bg-neutral-900 text-white text-sm hover:opacity-90">Join Waitlist</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white" />
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-24 relative grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            The skincare ritual to reset your nervous system.
          </h1>
          <p className="mt-5 text-neutral-700 md:text-lg max-w-prose">
            NOVA Rituals combines high‑performance skincare with a simple daily reset, so your skin looks balanced and you feel more present—without adding complexity to your routine.
          </p>
          <div className="mt-8 flex gap-3">
            <a href="#products" className="px-5 py-3 rounded-2xl bg-neutral-900 text-white text-sm hover:opacity-90">Explore Products</a>
            <a href="#waitlist" className="px-5 py-3 rounded-2xl border border-neutral-300 text-sm hover:bg-neutral-100">Get Early Access</a>
          </div>
          <div className="mt-6 text-xs text-neutral-500">Clean standard compliant · Designed in Canada</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <HeroImage />
        </motion.div>
      </div>
    </section>
  );
}

function HeroImage() {
  return (
    <div className="rounded-3xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
      {/* Use branded product shot */}
      <img
        src="/mnt/data/1266dd64-21f3-4469-8254-f9a6596e5743.png"
        alt="NOVA Rituals MindSerum and Ritual Mist product shot"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function Benefits() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-6">
        {BENEFITS_ITEMS.map((b, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="text-neutral-700 text-sm mt-2">{b.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SectionDivider() {
  return <div className="max-w-6xl mx-auto px-4 py-6"><div className="h-px bg-neutral-200" /></div>;
}

function SectionPadding({ children }: { children: React.ReactNode }) {
  return <section className="py-20">{children}</section>;
}

function Products() {
  return (
    <div id="products" className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-semibold">The Reset Duo</h2>
      <p className="text-neutral-700 mt-3 max-w-2xl mx-auto">A ritual that meets you where you are. Actives for the skin barrier; aromatic cues for the brain. Repeatable, measurable, beautiful.</p>
      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <ProductCard
          title="MindSerum™"
          subtitle="Neuro-Calming Serum"
          description="A restorative treatment with magnesium PCA, squalane, and blue tansy to help skin feel resilient and appear visibly rested."
          imgSrc="/mnt/data/1266dd64-21f3-4469-8254-f9a6596e5743.png"
        />
        <ProductCard
          title="Ritual Mist"
          subtitle="Aromatic Micro‑Mist"
          description="A fine veil of white tea hydrosol and grounding notes that signals ‘pause’ before serum or anytime mid‑day."
          imgSrc="/mnt/data/1266dd64-21f3-4469-8254-f9a6596e5743.png"
        />
      </div>
    </div>
  );
}

function ProductCard({ title, subtitle, description, imgSrc }: { title: string; subtitle: string; description: string; imgSrc: string; }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white w-full max-w-sm">
          <img src={imgSrc} alt={`${title} product`} className="w-full h-auto object-cover" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
        <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
        <p className="mt-3 text-neutral-700 text-sm max-w-sm">{description}</p>
      </div>
    </motion.div>
  );
}

function Ritual() {
  return (
    <div id="ritual" className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">The 3‑minute reset</h2>
          <p className="text-neutral-700 mt-3">Short enough to keep. Powerful enough to change how you feel.</p>
          <div className="mt-6 grid gap-3">
            {RITUAL_STEPS.map((s) => (
              <div key={s.n} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm">{s.n}</div>
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-neutral-600 text-sm">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-neutral-200 bg-white p-0 shadow-sm">
          <img src="/mnt/data/1266dd64-21f3-4469-8254-f9a6596e5743.png" alt="NOVA Rituals Reset Duo" className="w-full h-auto object-cover" />
          <p className="text-xs text-neutral-500 mt-3 p-3">Pair with 4‑7‑8 breathing for rapid down‑regulation.</p>
        </div>
      </div>
    </div>
  );
}

function Founder() {
  return (
    <div id="founder" className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold">Founded by a global marketing leader</h2>
        <p className="text-neutral-700 mt-4 text-sm">After 25 years building purpose‑led brands across North America and Europe, our founder created NOVA Rituals to connect what we know with what we feel—because resilience looks better on you.</p>
      </div>
      <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-rose-100/60 to-white p-6 shadow-sm flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-rose-200/70" />
      </div>
    </div>
  );
}

function CTA({ email, setEmail, onSubmit, submitted }: { email: string; setEmail: (v: string) => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; submitted: boolean; }) {
  return (
    <div id="waitlist" className="max-w-3xl mx-auto px-4 text-center bg-white rounded-3xl p-10 shadow-sm border border-neutral-200">
      <h2 className="text-3xl font-semibold">Join the waitlist</h2>
      <p className="text-neutral-700 mt-3">Be first to experience NOVA Rituals and receive a 3‑minute ritual guide.</p>
      {submitted ? (
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
          Thank you! You’re on the list.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="w-full sm:w-80 px-4 py-3 rounded-2xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="px-6 py-3 rounded-2xl bg-neutral-900 text-white hover:opacity-90">Get Early Access</button>
        </form>
      )}
      <div className="text-xs text-neutral-500 mt-3">No spam. Opt out anytime.</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-14 text-center text-sm text-neutral-500 border-t border-neutral-200">
      © {new Date().getFullYear()} NOVA Rituals · Concept site for demonstration purposes.
    </footer>
  );
}

function Logo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#111827" />
      <path d="M12 6v12" stroke="#111827" />
      <path d="M6 12h12" stroke="#111827" />
    </svg>
  );
}