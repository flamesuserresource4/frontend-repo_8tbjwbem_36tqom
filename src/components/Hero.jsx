import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Gift, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[90vh] overflow-hidden bg-white">
      {/* 3D Spline Background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* soft gradient overlays to improve text contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur px-3 py-1 text-xs md:text-sm text-slate-600 shadow-sm">
          <Globe className="h-4 w-4 text-slate-700" />
          Borderless gifting for a new investing era
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900">
          WealthWrap: Turn gifts into <span className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">growing legacies</span>
        </h1>
        <p className="mt-5 md:mt-6 max-w-2xl text-base md:text-lg text-slate-700">
          Send fractional stocks or automated SIPs across 150+ brokers worldwide. Zero asset custody, instant deposits, and compliance handled for you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href="#cta"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 font-medium shadow-lg hover:shadow-xl hover:bg-slate-800 transition"
          >
            <Rocket className="h-5 w-5" />
            Start a Gift
          </a>
          <a
            href="#comparison"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/80 backdrop-blur px-5 py-3 font-medium text-slate-900 border border-slate-200 hover:bg-white transition"
          >
            <Gift className="h-5 w-5" />
            Try the Simulator
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
