'use client';

import { useState, useCallback } from 'react';
import { generateLanding, landingToHTML, INDUSTRIES, TONES, type LandingInput, type LandingData, type Industry, type Tone } from '@/lib/generator';

export default function Home() {
  const [input, setInput] = useState<LandingInput>({
    businessName: 'Bloom & Bean',
    description: 'a cozy specialty coffee shop with single-origin beans and homemade pastries',
    industry: 'restaurant',
    tone: 'professional',
  });
  const [landing, setLanding] = useState<LandingData | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = useCallback((newSeed?: number) => {
    const s = newSeed ?? Math.floor(Math.random() * 1e9);
    setLanding(generateLanding(input, s));
    setCopied(false);
  }, [input]);

  const copyHTML = async () => {
    if (!landing) return;
    await navigator.clipboard.writeText(landingToHTML(input, landing));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHTML = () => {
    if (!landing) return;
    const blob = new Blob([landingToHTML(input, landing)], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${input.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-landing.html`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* App header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-xl">🎯</div>
            <div>
              <h1 className="font-bold text-lg leading-tight">AI Landing Generator</h1>
              <p className="text-xs text-slate-400">Describe your business → get a full landing page</p>
            </div>
          </div>
          {landing && (
            <div className="flex gap-2">
              <button onClick={() => generate()} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium transition">🎲 Regenerate</button>
              <button onClick={copyHTML} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium transition">{copied ? '✅ Copied!' : '📋 Copy HTML'}</button>
              <button onClick={downloadHTML} className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-sm font-medium transition">⬇️ Download HTML</button>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[380px_1fr] gap-8">
        {/* Input panel */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 h-fit lg:sticky lg:top-24">
          <h2 className="font-semibold mb-5 text-slate-200">Describe your business</h2>

          <label className="block text-sm text-slate-400 mb-1.5">Business name</label>
          <input
            value={input.businessName}
            onChange={e => setInput({ ...input, businessName: e.target.value })}
            placeholder="e.g. Bloom & Bean"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <label className="block text-sm text-slate-400 mb-1.5">What do you do? (1–2 sentences)</label>
          <textarea
            value={input.description}
            onChange={e => setInput({ ...input, description: e.target.value })}
            placeholder="e.g. a cozy specialty coffee shop with single-origin beans and homemade pastries"
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          />

          <label className="block text-sm text-slate-400 mb-1.5">Industry</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {INDUSTRIES.map(ind => (
              <button
                key={ind.value}
                onClick={() => setInput({ ...input, industry: ind.value as Industry })}
                className={`px-3 py-2 rounded-lg text-sm text-left transition border ${input.industry === ind.value ? 'bg-violet-600/20 border-violet-500 text-violet-200' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'}`}
              >
                {ind.label}
              </button>
            ))}
          </div>

          <label className="block text-sm text-slate-400 mb-1.5">Tone</label>
          <div className="space-y-2 mb-6">
            {TONES.map(t => (
              <button
                key={t.value}
                onClick={() => setInput({ ...input, tone: t.value as Tone })}
                className={`w-full px-4 py-2.5 rounded-lg text-sm text-left transition border ${input.tone === t.value ? 'bg-violet-600/20 border-violet-500' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}
              >
                <span className="font-medium text-slate-200">{t.label}</span>
                <span className="text-slate-400"> — {t.hint}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => generate()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold hover:opacity-90 transition text-white shadow-lg shadow-violet-900/40"
          >
            ✨ Generate my landing page
          </button>
          <p className="text-xs text-slate-500 mt-3 text-center">No sign-up · No API keys · Instant results</p>
        </div>

        {/* Preview */}
        <div>
          {!landing ? (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 border-dashed p-16 text-center">
              <div className="text-6xl mb-6">🎨</div>
              <h2 className="text-xl font-semibold mb-2">Your landing page appears here</h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">Fill in your business details and hit generate — you will get a complete, professional landing page in seconds.</p>
            </div>
          ) : (
            <LandingPreview input={input} data={landing} />
          )}
        </div>
      </div>

      <footer className="border-t border-slate-800 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-slate-500">
          Built by <a href="https://github.com/carlosreyesafk" className="text-violet-400 hover:underline">Carlos Reyes</a> · AI Landing Generator
        </div>
      </footer>
    </div>
  );
}

function LandingPreview({ input, data }: { input: LandingInput; data: LandingData }) {
  const t = data.theme;
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl" style={{ background: t.bg, color: t.text, fontFamily: t.fontDisplay }}>
      {/* mini browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ background: t.card, borderColor: t.bgSoft }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center text-xs rounded-md px-3 py-1" style={{ background: t.bgSoft, color: t.muted }}>
          {input.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com
        </div>
      </div>

      <div className="px-8">
        {/* nav */}
        <nav className="flex justify-between items-center py-5">
          <div className="text-xl font-extrabold" style={{ color: t.primary }}>{input.businessName}</div>
          <button className="px-5 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: t.primary }}>{data.hero.ctaPrimary}</button>
        </nav>

        {/* hero */}
        <div className="text-center py-14">
          <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-5" style={{ background: t.bgSoft, color: t.primaryDark }}>{data.hero.badge}</span>
          <h1 className="font-extrabold leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}>{data.hero.headline}</h1>
          <p className="max-w-xl mx-auto mb-8" style={{ color: t.muted }}>{data.hero.subheadline}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="px-7 py-3 rounded-full text-white font-semibold" style={{ background: t.primary }}>{data.hero.ctaPrimary}</button>
            <button className="px-7 py-3 rounded-full font-semibold border-2" style={{ borderColor: t.primary, color: t.primary }}>{data.hero.ctaSecondary}</button>
          </div>
        </div>

        {/* stats */}
        <div className="flex justify-center gap-10 py-6 flex-wrap">
          {data.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-extrabold" style={{ color: t.primary }}>{s.value}</div>
              <div className="text-xs" style={{ color: t.muted }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* features */}
        <div className="py-12">
          <h2 className="text-2xl font-bold text-center mb-2">{data.featuresHeadline}</h2>
          <p className="text-center text-sm mb-8" style={{ color: t.muted }}>{data.featuresSub}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.features.map((f, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: t.card, boxShadow: '0 8px 30px rgba(0,0,0,.07)' }}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold mb-1.5">{f.title}</h3>
                <p className="text-sm" style={{ color: t.muted }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* testimonials */}
        <div className="py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Loved by our customers</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {data.testimonials.map((x, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: t.card, boxShadow: '0 8px 30px rgba(0,0,0,.07)' }}>
                <p className="text-sm italic mb-4">“{x.quote}”</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: t.primary }}>{x.initials}</div>
                  <div><div className="text-sm font-semibold">{x.name}</div><div className="text-xs" style={{ color: t.muted }}>{x.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* pricing */}
        <div className="py-12">
          <h2 className="text-2xl font-bold text-center mb-2">Simple, honest pricing</h2>
          <p className="text-center text-sm mb-8" style={{ color: t.muted }}>No hidden fees. Cancel anytime.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {data.pricing.map((p, i) => (
              <div key={i} className="rounded-2xl p-6 text-center border-2" style={{ background: t.card, borderColor: p.highlighted ? t.primary : t.bgSoft, transform: p.highlighted ? 'scale(1.03)' : 'none' }}>
                <h3 className="font-bold">{p.name}</h3>
                <div className="my-3"><span className="text-3xl font-extrabold" style={{ color: t.primary }}>{p.price}</span><span className="text-sm" style={{ color: t.muted }}>{p.period}</span></div>
                <ul className="text-left text-sm my-4 space-y-2">{p.features.map((f, j) => <li key={j} style={{ color: t.muted }}><span style={{ color: t.primary, fontWeight: 700 }}>✓ </span>{f}</li>)}</ul>
                <button className="w-full py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: t.primary }}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>

        {/* final CTA */}
        <div className="rounded-3xl text-center py-14 px-6 my-8" style={{ background: t.primary }}>
          <h2 className="text-2xl font-bold text-white mb-3">{data.cta.headline}</h2>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">{data.cta.subheadline}</p>
          <button className="px-8 py-3 rounded-full font-semibold" style={{ background: '#fff', color: t.primary }}>{data.cta.button}</button>
        </div>

        <footer className="text-center py-8 text-sm" style={{ color: t.muted }}>
          <div className="font-extrabold text-base mb-1" style={{ color: t.primary }}>{input.businessName}</div>
          <p>{data.footerTagline}</p>
          <p className="mt-2 text-xs">© 2026 {input.businessName}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
