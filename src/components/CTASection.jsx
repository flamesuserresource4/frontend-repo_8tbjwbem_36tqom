import React from 'react';
import { Rocket, Shield } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="cta" className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-24">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-slate-900">
                Start a gift today. Watch it grow for years.
              </h3>
              <p className="mt-3 text-slate-700">
                Create a one-time gift or set a recurring plan in minutes. We handle brokerage routing, KYC, and cross-border compliance.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 font-medium shadow-lg hover:bg-slate-800 transition"
                >
                  <Rocket className="h-5 w-5" /> Create a Gift
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-5 py-3 font-medium border border-slate-200 hover:bg-slate-50 transition"
                >
                  <Shield className="h-5 w-5" /> See how we stay compliant
                </a>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                1–2% fees. No custody. Works with major brokers in the US, EU, and India.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 p-4 text-white">
                    <div className="text-sm opacity-90">Gift Value</div>
                    <div className="mt-1 text-2xl font-bold">$250</div>
                    <div className="mt-4 text-xs opacity-80">+ Recurring $25/mo</div>
                  </div>
                  <div className="col-span-2 rounded-xl border border-slate-200 p-4">
                    <div className="text-sm text-slate-600">Projected Growth</div>
                    <div className="mt-2 h-24 w-full rounded-lg bg-gradient-to-r from-emerald-300 via-sky-300 to-purple-300" />
                    <div className="mt-2 text-xs text-slate-500">This is an illustration, not investment advice.</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="text-xs text-slate-600">Brokers</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">150+ integrated</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="text-xs text-slate-600">Currencies</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">Multi-currency FX</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
