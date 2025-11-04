import React from 'react';
import { Sparkles, Gift, Calendar } from 'lucide-react';

const bundles = [
  {
    tag: 'Diwali',
    title: 'Diwali ETFs',
    desc: 'Festival-ready equity baskets with balanced risk and sector diversity.',
    accent: 'from-fuchsia-500 to-purple-600'
  },
  {
    tag: 'Graduation',
    title: 'Future-Builder Tech',
    desc: 'Blue-chip innovators that compound skills and capital together.',
    accent: 'from-blue-500 to-cyan-600'
  },
  {
    tag: 'Wedding',
    title: 'Family Wealth Core',
    desc: 'Global dividend aristocrats that anchor long-term family goals.',
    accent: 'from-emerald-500 to-teal-600'
  }
];

const BundleShowcase = () => {
  return (
    <section id="bundles" className="relative bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-24">
        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              <Sparkles className="h-4 w-4 text-fuchsia-600" /> AI-Curated Bundles
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Gifts that feel personal—and grow with time
            </h2>
            <p className="mt-4 text-slate-700">
              Our models blend occasion context, recipient profile, and market data to craft baskets that match the moment.
            </p>
          </div>
          <a href="#cta" className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 font-medium hover:bg-slate-800 transition">
            <Gift className="h-4 w-4" /> Start with a template
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {bundles.map((b, i) => (
            <div key={i} className="group relative rounded-2xl border border-slate-200 bg-white p-6 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${b.accent} opacity-20 blur-3xl`} />
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Calendar className="h-4 w-4" /> {b.tag}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{b.title}</h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">{b.desc}</p>
              <button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50 transition">
                Preview basket
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BundleShowcase;
