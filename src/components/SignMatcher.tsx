import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZODIAC_SIGNS } from '../constants';
import { ShieldCheck, Trophy, RotateCcw } from 'lucide-react';

export default function SignMatcher() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetSign, setTargetSign] = useState(ZODIAC_SIGNS[0]);
  const [options, setOptions] = useState<typeof ZODIAC_SIGNS>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startNewRound = () => {
    const shuffled = [...ZODIAC_SIGNS].sort(() => Math.random() - 0.5);
    const roundTarget = shuffled[0];
    const roundOptions = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);
    
    // Ensure the target is in options
    if (!roundOptions.find(o => o.id === roundTarget.id)) {
      roundOptions[Math.floor(Math.random() * 4)] = roundTarget;
    }

    setTargetSign(roundTarget);
    setOptions(roundOptions);
    setIsCorrect(null);
  };

  useEffect(() => {
    startNewRound();
  }, [level]);

  const handleSelect = (signId: string) => {
    if (signId === targetSign.id) {
      setIsCorrect(true);
      setScore(s => s + 100);
      setTimeout(() => {
        setLevel(l => l + 1);
      }, 1000);
    } else {
      setIsCorrect(false);
      setScore(s => Math.max(0, s - 50));
      setTimeout(() => setIsCorrect(null), 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-12">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-[#888] font-black">Level {level.toString().padStart(2, '0')}</p>
          <h2 className="font-display text-5xl font-black uppercase tracking-tighter italic">Match the Sign</h2>
        </div>
        <div className="text-right">
          <div className="bg-white border-4 border-black rounded-2xl px-6 py-2 shadow-[4px_4px_0_#000]">
            <p className="text-[10px] uppercase tracking-widest text-[#888] font-black">Score</p>
            <p className="font-display text-3xl font-black">{score.toLocaleString()}</p>
          </div>
        </div>
      </header>

      <div className="vibrant-card p-12 text-center space-y-8 relative overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={targetSign.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-6"
          >
            <span className="bg-[var(--accent1)] text-white px-4 py-1 border-4 border-black rounded-xl font-black uppercase text-xs tracking-widest">
              Current Target
            </span>
            <h3 className="font-display text-8xl text-black font-black uppercase leading-none tracking-tighter">
              {targetSign.name}
            </h3>
            <div className="max-w-sm mx-auto">
              <p className="font-sans font-bold text-black/60 text-lg leading-tight uppercase underline decoration-4 decoration-[var(--accent1)] underline-offset-4">
                "{targetSign.description}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
          {options.map((option, idx) => {
            const colors = ['var(--accent3)', 'var(--accent2)', 'var(--accent4)', 'var(--accent1)'];
            return (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(option.id)}
                className={`vibrant-card aspect-square flex items-center justify-center text-6xl hover:brightness-95 transition-all`}
                style={{ backgroundColor: colors[idx] }}
              >
                {option.symbol}
              </motion.button>
            );
          })}
        </div>

        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm pointer-events-none z-50 ${
              isCorrect ? 'bg-green-400/40' : 'bg-red-400/40'
            }`}
          >
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white border-8 border-black p-10 rounded-[40px] shadow-[20px_20px_0_#000]"
            >
              {isCorrect ? (
                <>
                  <Trophy className="w-24 h-24 text-[var(--accent2)] mx-auto mb-4" />
                  <p className="text-4xl font-black text-black uppercase tracking-tighter italic">PERFECT!</p>
                </>
              ) : (
                <>
                  <RotateCcw className="w-24 h-24 text-[var(--accent1)] mx-auto mb-4" />
                  <p className="text-4xl font-black text-black uppercase tracking-tighter italic">TRY AGAIN</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="h-8 bg-[#E6E1D3] border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0_#000]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(level / 12) * 100}%` }}
          className="h-full bg-[var(--accent1)] border-r-4 border-black"
        />
      </div>
    </div>
  );
}
