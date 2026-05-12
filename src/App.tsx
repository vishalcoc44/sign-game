import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZODIAC_SIGNS } from './constants';
import { ZodiacSign } from './types';
import SignCard from './components/SignCard';
import SignMatcher from './components/SignMatcher';
import { Stars, Compass, Heart, History, User, Search, RefreshCcw } from 'lucide-react';

export default function App() {
  const [selectedSignId, setSelectedSignId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'explore' | 'matcher' | 'daily'>('explore');

  const selectedSign = useMemo(() => 
    ZODIAC_SIGNS.find(s => s.id === selectedSignId) || null,
    [selectedSignId]
  );

  const filteredSigns = useMemo(() => 
    ZODIAC_SIGNS.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.element.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] selection:bg-[var(--accent2)] relative overflow-x-hidden">
      {/* Navigation Rail */}
      <nav className="fixed left-0 top-0 bottom-0 w-24 border-r-4 border-black hidden lg:flex flex-col items-center py-10 gap-8 z-50 bg-white">
        <div className="w-16 h-16 bg-[var(--accent1)] border-4 border-black rounded-2xl flex items-center justify-center mb-10 shadow-[4px_4px_0_#000]">
          <Stars className="w-8 h-8 text-white" />
        </div>
        
        <NavIcon 
          active={view === 'explore'} 
          onClick={() => setView('explore')} 
          icon={<Compass />} 
          label="Explore" 
        />
        <NavIcon 
          active={view === 'matcher'} 
          onClick={() => setView('matcher')} 
          icon={<Heart />} 
          label="Matcher" 
        />
        <NavIcon 
          active={view === 'daily'} 
          onClick={() => setView('daily')} 
          icon={<RefreshCcw />} 
          label="Daily" 
        />
        
        <div className="mt-auto flex flex-col gap-6 p-4">
           <div className="w-12 h-12 bg-white border-4 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0_#000] cursor-pointer hover:bg-[var(--accent3)] transition-colors">
              <User className="w-6 h-6 text-black" />
           </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:pl-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24">
          
          <AnimatePresence mode="wait">
            {view === 'explore' ? (
              <motion.div
                key="explore"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Header */}
                <header className="mb-20 relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="inline-flex items-center gap-3 bg-[var(--accent4)] text-white border-4 border-black rounded-full px-6 py-2 text-xs uppercase font-black tracking-widest shadow-[4px_4px_0_#000]">
                      Cosmic Intelligence v1.0
                    </div>
                    <h1 className="font-display text-8xl md:text-[10rem] text-black font-black leading-none tracking-tighter uppercase">
                      The <span className="text-[var(--accent1)] text-outline" style={{ WebkitTextStroke: '4px black', color: 'transparent' }}>Zodiac</span> <br />
                      Quest.
                    </h1>
                    <div className="max-w-2xl bg-white border-4 border-black p-8 rounded-[32px] shadow-[8px_8px_0_#000]">
                      <p className="font-sans text-xl md:text-2xl text-black font-bold leading-tight">
                        Connect with the stars. Discover the depth of your zodiac sign and unlock the mysteries of the universe in high contrast.
                      </p>
                    </div>
                  </motion.div>

                  {/* Search */}
                  <div className="mt-12 max-w-xl relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-black" />
                    <input 
                      type="text" 
                      placeholder="SEARCH SYNS, ELEMENTS, OR TRAITS..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border-4 border-black rounded-[24px] py-6 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-[var(--accent2)] text-lg font-black placeholder:text-black/20 shadow-[8px_8px_0_#000] focus:shadow-none transition-all uppercase"
                    />
                  </div>
                </header>

                {/* Signs Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredSigns.map((sign, index) => (
                    <motion.div
                      key={sign.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <SignCard 
                        sign={sign} 
                        isSelected={selectedSignId === sign.id}
                        onClick={() => setSelectedSignId(selectedSignId === sign.id ? null : sign.id)}
                      />
                    </motion.div>
                  ))}
                </section>

                {filteredSigns.length === 0 && (
                  <div className="text-center py-24 bg-white border-4 border-black rounded-[40px] shadow-[12px_12px_0_#000]">
                    <p className="text-black font-display font-black text-3xl uppercase italic tracking-tighter">The stars are silent here.</p>
                  </div>
                )}
              </motion.div>
            ) : view === 'matcher' ? (
              <motion.div
                key="matcher"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <SignMatcher />
              </motion.div>
            ) : (
              <motion.div
                key="daily"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-32 text-center bg-white border-4 border-black rounded-[40px] shadow-[16px_16px_0_#000] max-w-2xl mx-auto"
              >
                 <div className="w-24 h-24 bg-[var(--accent3)] border-4 border-black rounded-full flex items-center justify-center mx-auto mb-10 shadow-[8px_8px_0_#000]">
                   <Stars className="w-12 h-12 text-black" />
                 </div>
                 <h2 className="font-display text-6xl font-black uppercase tracking-tighter mb-6 italic">Daily Forecast</h2>
                 <p className="font-sans text-2xl font-bold px-12 text-black/60">The universe is currently recalculating your orbit. Check back once the planets have finished their meeting.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <footer className="mt-32 border-t-8 border-black pt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-black font-black uppercase tracking-widest text-[10px]">
             <div className="space-y-6">
               <div className="text-3xl font-black tracking-tighter italic">SIGNUM PRO</div>
               <div className="space-y-2">
                 <p className="bg-[var(--accent3)] inline-block px-2">Astrological Alignment 2026</p>
                 <p>Engineered for maximum brilliance</p>
               </div>
             </div>
             <div className="space-y-6">
               <p className="text-[#888]">Data Access</p>
               <ul className="space-y-2">
                 <li className="hover:underline decoration-4 decoration-[var(--accent1)] cursor-pointer underline-offset-4">Solar Metrics</li>
                 <li className="hover:underline decoration-4 decoration-[var(--accent2)] cursor-pointer underline-offset-4">Lunar Charts</li>
                 <li className="hover:underline decoration-4 decoration-[var(--accent4)] cursor-pointer underline-offset-4">Privacy Core</li>
               </ul>
             </div>
             <div className="flex flex-col justify-end items-end gap-2 text-right">
                <div className="bg-black text-white p-4 rounded-2xl shadow-[8px_8px_0_var(--accent2)]">
                  <Stars className="w-12 h-12" />
                </div>
                <p className="mt-4">Universe Protocol Active</p>
             </div>
          </footer>
        </div>
      </main>

      {/* Floating Detail Panel Update */}
      <AnimatePresence>
        {selectedSign && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-[var(--bg)] border-l-8 border-black z-[100] p-12 overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedSignId(null)}
              className="absolute top-12 right-12 vibrant-btn bg-[var(--accent1)] text-white p-4"
            >
              <RefreshCcw className="w-8 h-8" />
            </button>

            <div className="space-y-12">
              <header className="text-center space-y-4 pt-12">
                <span className="text-9xl block filter drop-shadow-[8px_8px_0_rgba(0,0,0,0.2)]">
                  {selectedSign.symbol}
                </span>
                <h2 className="font-display text-8xl font-black uppercase tracking-tighter leading-none italic">{selectedSign.name}</h2>
                <div className="bg-black text-white px-6 py-2 inline-block rounded-xl font-black text-sm tracking-[0.2em]">
                  {selectedSign.dateRange}
                </div>
              </header>

              <div className="grid grid-cols-2 gap-8 py-12 border-y-4 border-black">
                <DetailRow label="Element" value={selectedSign.element} />
                <DetailRow label="Ruling Body" value={selectedSign.rulingPlanet} />
                <DetailRow label="Quality" value={selectedSign.quality} />
                <DetailRow label="Relic" value={selectedSign.stone} />
              </div>

              <section className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-widest text-[#888]">The Foundation</h4>
                <div className="flex flex-wrap gap-4">
                  {selectedSign.traits.map(trait => (
                    <span key={trait} className="px-6 py-3 bg-white border-4 border-black rounded-2xl text-lg font-black shadow-[4px_4px_0_#000]">
                      {trait}
                    </span>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-widest text-[#888]">The Oracle says</h4>
                <div className="bg-white border-4 border-black p-10 rounded-[40px] shadow-[12px_12px_0_#000]">
                  <p className="font-sans text-3xl font-black italic leading-tight text-black">
                    "{selectedSign.description}"
                  </p>
                </div>
              </section>

              <button className="w-full py-8 vibrant-btn text-xl mt-8 text-white">
                INITIALIZE CORE READING
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavIcon({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <div 
      onClick={onClick}
      className={`group relative flex items-center justify-center w-16 h-16 rounded-2xl cursor-pointer transition-all duration-200 border-4 ${
        active ? 'bg-[var(--accent2)] border-black translate-x-1 shadow-[4px_4px_0_#000]' : 'bg-white border-black hover:bg-black/5 hover:-translate-x-1 shadow-[2px_2px_0_#000]'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8 font-black' })}
      <div className="absolute left-24 bg-black text-white text-xs font-black px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest shadow-[4px_4px_0_var(--accent2)]">
        {label}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#888] font-black">{label}</span>
      <p className="text-2xl font-black italic tracking-tighter uppercase">{value}</p>
    </div>
  );
}
