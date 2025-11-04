import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, Frown, Rocket, Leaf, Volume2, VolumeX } from 'lucide-react';

// Simple Web Audio sounds (no external assets)
function useSound() {
  const audioCtxRef = useRef(null);
  const enabledRef = useRef(true);

  const init = () => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtxRef.current = new Ctx();
    }
  };

  const playTone = (freq = 880, duration = 0.15, type = 'sine', volume = 0.03) => {
    if (!enabledRef.current) return;
    init();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.start(now);
    osc.stop(now + duration);
  };

  const ding = () => playTone(1320, 0.12, 'triangle', 0.04);
  const thud = () => playTone(180, 0.18, 'sawtooth', 0.03);

  return {
    ding,
    thud,
    toggle: (v) => { enabledRef.current = v; if (v) init(); },
  };
}

const Slider = ({ label, value, onChange, min, max, step, suffix }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-700">{label}</span>
      <span className="font-semibold text-slate-900">{value}{suffix}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-slate-900"
    />
  </div>
);

const Stat = ({ label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-3">
    <div className="text-xs text-slate-500">{label}</div>
    <div className="text-base font-semibold text-slate-900">{value}</div>
  </div>
);

const MoneyBar = ({ progress, color }) => (
  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
    <motion.div
      className="h-full"
      style={{ background: color }}
      initial={{ width: '0%' }}
      animate={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    />
  </div>
);

function formatCurrency(n) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

const ComparisonModule = () => {
  const [amount, setAmount] = useState(100);
  const [monthly, setMonthly] = useState(50);
  const [years, setYears] = useState(10);
  const [cagr, setCagr] = useState(10); // %
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 timeline
  const [muted, setMuted] = useState(false);
  const { ding, thud, toggle } = useSound();

  useEffect(() => { toggle(!muted); }, [muted]);

  // Animate timeline (loop ~20s)
  useEffect(() => {
    if (!isPlaying) return;
    let raf;
    let start;
    const duration = 20000; // 20s loop
    const tick = (t) => {
      if (!start) start = t;
      const p = (t - start) / duration;
      const pr = Math.min(1, p);
      setProgress(pr);
      if (pr >= 1) {
        setIsPlaying(false);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  // Derived stats
  const sim = useMemo(() => {
    const r = cagr / 100;
    const Y = Math.max(1, years);
    // WealthWrap FV: lump sum + monthly SIP (approx monthly compounding)
    const monthlyRate = r / 12;
    const months = Y * 12;
    const lumpFV = amount * Math.pow(1 + r, Y);
    const sipFV = monthly > 0 ? monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate) : 0;
    const totalFV = lumpFV + sipFV;

    // Traditional: depreciates to 0 after 2 years
    const tradValueByYear = (y) => (y < 0.5 ? amount : y < 1 ? amount * 0.6 : y < 2 ? amount * 0.15 : 0);

    const milestones = [1, 3, 5, 10].filter((m) => m <= Y);

    return { totalFV, lumpFV, sipFV, tradValueByYear, milestones };
  }, [amount, monthly, years, cagr]);

  // Play sounds on milestones and depreciation event
  const lastMilestoneRef = useRef(0);
  useEffect(() => {
    const currentYear = Math.floor(progress * years);
    if (currentYear > lastMilestoneRef.current) {
      lastMilestoneRef.current = currentYear;
      if (currentYear > 0) ding();
    }
    if (progress * years >= 2 && progress * years < 2.05) {
      thud();
    }
  }, [progress, years, ding, thud]);

  const currentYearFloat = progress * years;
  const traditionalValue = sim.tradValueByYear(currentYearFloat);
  const growthFactor = Math.pow(1 + cagr / 100, currentYearFloat);
  const sipApprox = monthly * (currentYearFloat * 12); // simple linear for animation display
  const wealthValue = amount * growthFactor + sipApprox;

  const raceProgressTrad = Math.max(0, Math.min(1, traditionalValue / (amount + Math.max(1, monthly) * 12)));
  const raceProgressWealth = Math.max(0, Math.min(1, wealthValue / (sim.totalFV || 1)));

  const finalTraditional = 0;
  const finalWealth = sim.totalFV;
  const roi = finalWealth > 0 ? ((finalWealth - amount - monthly * years * 12) / (amount + monthly * years * 12)) * 100 : 0;

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-24">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Gifting Showdown</h2>
            <p className="mt-2 text-slate-700">Traditional presents vs. WealthWrap growth—watch them race over time.</p>
          </div>
          <button
            onClick={() => setMuted((m) => !m)}
            className="hidden md:inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />} {muted ? 'Muted' : 'Sound on'}
          </button>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <Zap className="h-4 w-4 text-amber-500" /> Simulator Controls
            </div>
            <div className="mt-4 space-y-4">
              <Slider label="Initial Gift" value={amount} onChange={setAmount} min={25} max={1000} step={25} suffix="$" />
              <Slider label="Monthly SIP" value={monthly} onChange={setMonthly} min={0} max={500} step={10} suffix="$" />
              <Slider label="Years" value={years} onChange={setYears} min={3} max={20} step={1} suffix="y" />
              <Slider label="CAGR" value={cagr} onChange={setCagr} min={4} max={20} step={1} suffix="%" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => { setProgress(0); setIsPlaying(true); lastMilestoneRef.current = 0; }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 font-medium shadow hover:bg-slate-800"
              >
                <Rocket className="h-4 w-4" /> Play Race
              </button>
              <button
                onClick={() => { setIsPlaying(false); setProgress(1); }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 font-medium hover:bg-slate-50"
              >
                Skip to Result
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="Now (Traditional)" value={formatCurrency(traditionalValue)} />
              <Stat label="Now (WealthWrap)" value={formatCurrency(wealthValue)} />
            </div>
          </div>

          {/* Simulation Arena */}
          <div className="lg:col-span-3 space-y-4">
            {/* Race progress */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Start</span>
                <span>Year {Math.max(0, Math.min(years, currentYearFloat)).toFixed(1)} / {years}</span>
                <span>Finish</span>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-medium text-slate-700 mb-1">Traditional Path</div>
                  <MoneyBar progress={raceProgressTrad} color="linear-gradient(90deg,#cbd5e1,#94a3b8)" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-700 mb-1">WealthWrap Path</div>
                  <MoneyBar progress={raceProgressWealth} color="linear-gradient(90deg,#10b981,#3b82f6)" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Traditional Card */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <Frown className="h-5 w-5 text-slate-500" /> Traditional Gift
                  </div>
                  <span className="text-xs text-slate-500">One-time joy, zero growth</span>
                </div>

                <div className="mt-4 h-40 relative">
                  <AnimatePresence>
                    {currentYearFloat < 0.5 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex items-center justify-center">
                        <motion.div animate={{ rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-5xl">☕️</motion.div>
                        <div className="absolute bottom-2 text-xs text-slate-500">Coffee mug</div>
                      </motion.div>
                    )}
                    {currentYearFloat >= 0.5 && currentYearFloat < 1 && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 flex items-center justify-center">
                        <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-5xl">📱</motion.div>
                        <div className="absolute bottom-2 text-xs text-slate-500">Gadget</div>
                      </motion.div>
                    )}
                    {currentYearFloat >= 1 && currentYearFloat < 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-5xl">💐</motion.div>
                        <div className="absolute bottom-2 text-xs text-slate-500">Flowers</div>
                      </motion.div>
                    )}
                    {currentYearFloat >= 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className="text-5xl">🥀</div>
                        <div className="text-sm font-medium text-slate-900">Game Over</div>
                        <div className="text-xs text-slate-500">Value: $0</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <Stat label="Starting Value" value={formatCurrency(amount)} />
                  <Stat label="After 2y" value={formatCurrency(sim.tradValueByYear(2))} />
                  <Stat label="Final" value={formatCurrency(finalTraditional)} />
                </div>
              </div>

              {/* WealthWrap Card */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <Trophy className="h-5 w-5 text-emerald-600" /> WealthWrap Gift
                  </div>
                  <span className="text-xs text-slate-500">Level up with compounding</span>
                </div>

                <div className="mt-4 h-40 relative">
                  {/* Money tree + rocket */}
                  <div className="absolute left-4 bottom-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0.6 }} animate={{ scale: 1 + progress * 0.1, opacity: 1 }} className="flex items-center gap-2">
                      <Leaf className="h-6 w-6 text-emerald-600" />
                      <div className="h-2 w-28 rounded-full bg-emerald-100 overflow-hidden">
                        <motion.div className="h-full bg-emerald-500" animate={{ width: `${Math.min(100, progress * 100)}%` }} />
                      </div>
                    </motion.div>
                  </div>
                  <motion.div className="absolute right-6 bottom-6" initial={{ y: 0 }} animate={{ y: [-2, -8, -2] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                    <Rocket className="h-7 w-7 text-sky-500" />
                  </motion.div>

                  {/* Bars chart */}
                  <div className="absolute inset-0 flex items-end gap-2 px-16">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-md bg-gradient-to-t from-sky-400 to-emerald-400"
                        initial={{ height: 6 }}
                        animate={{ height: 6 + progress * (10 + i * 16) }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                      />
                    ))}
                  </div>

                  {/* Confetti on milestones */}
                  <AnimatePresence>
                    {sim.milestones.map((m) => (
                      progress * years >= m ? (
                        <motion.div key={m} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-2 right-2 text-xs bg-emerald-600 text-white px-2 py-1 rounded">
                          Year {m}: Level Up!
                        </motion.div>
                      ) : null
                    ))}
                  </AnimatePresence>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <Stat label="Year 1" value={formatCurrency(amount * Math.pow(1 + cagr/100, 1) + monthly * 12)} />
                  <Stat label={`Year ${Math.min(5, years)}`} value={formatCurrency(amount * Math.pow(1 + cagr/100, Math.min(5, years)) + monthly * Math.min(5, years) * 12)} />
                  <Stat label={`Year ${years}`} value={formatCurrency(finalWealth)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final result modal */}
        <AnimatePresence>
          {progress >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-slate-900/50" onClick={() => setProgress(0)} />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative max-w-md w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Trophy className="h-5 w-5 text-amber-500" /> Final Score
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between"><span>Traditional</span><span>+0% ROI</span></div>
                  <div className="flex items-center justify-between"><span>WealthWrap</span><span>{roi > 0 ? `+${roi.toFixed(0)}%` : `${roi.toFixed(0)}%`} ROI</span></div>
                </div>
                <div className="mt-4 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 p-3 text-white text-center font-semibold">
                  Unlock Legacy Mode!
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <button onClick={() => setProgress(0)} className="rounded-xl bg-white border border-slate-200 px-4 py-2 hover:bg-slate-50">Replay</button>
                  <a href="#cta" className="rounded-xl bg-slate-900 text-white px-4 py-2 text-center hover:bg-slate-800">Start a Gift</a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ComparisonModule;
