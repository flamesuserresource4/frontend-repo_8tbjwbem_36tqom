import React from 'react';
import Hero from './components/Hero.jsx';
import FeatureGrid from './components/FeatureGrid.jsx';
import ComparisonModule from './components/ComparisonModule.jsx';
import CTASection from './components/CTASection.jsx';

const App = () => {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      {/* Simple top bar */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-fuchsia-500 to-purple-600" />
            <span className="font-semibold">WealthWrap</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-700">
            <a href="#comparison" className="hover:text-slate-900">Simulator</a>
            <a href="#cta" className="hover:text-slate-900">Start a Gift</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <FeatureGrid />
        <div id="comparison">
          <ComparisonModule />
        </div>
        <CTASection />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-10 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} WealthWrap. Building a perpetual wealth web.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Terms</a>
            <a href="#" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
