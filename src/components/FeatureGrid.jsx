import React from 'react';
import { Gift, Shield, Zap, Globe, TrendingUp, Wallet } from 'lucide-react';

const features = [
  {
    icon: <Gift className="h-6 w-6 text-fuchsia-600" />,
    title: 'Fractional Gifting',
    desc: 'Send slices of blue-chip stocks or ETFs—perfect for birthdays, milestones, and moments that matter.'
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
    title: 'Automated SIPs',
    desc: 'Set recurring contributions that showcase the magic of compounding over months and years.'
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-600" />,
    title: '150+ Brokers',
    desc: 'Seamless global settlement across multiple currencies—no asset custody required.'
  },
  {
    icon: <Shield className="h-6 w-6 text-emerald-600" />,
    title: 'Regulation-Ready',
    desc: 'Compliance, KYC, and cross-border checks handled behind the scenes for peace of mind.'
  },
  {
    icon: <Wallet className="h-6 w-6 text-amber-600" />,
    title: 'Instant Deposits',
    desc: 'Funds reach the destination account fast with transparent fees and live FX quotes.'
  },
  {
    icon: <Zap className="h-6 w-6 text-pink-600" />,
    title: 'Gift Chains',
    desc: 'Turn one gift into a movement—recipients can pass it on and celebrate collective growth.'
  }
];

const FeatureGrid = () => {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Built for emotion. Engineered for scale.
          </h2>
          <p className="mt-4 text-slate-700">
            A modern gifting layer for global markets—delightful on the surface, industrial under the hood.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-50">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
