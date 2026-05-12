import { motion } from 'motion/react';
import { ZodiacSign } from '../types';
import { Sparkles, Info } from 'lucide-react';

interface SignCardProps {
  sign: ZodiacSign;
  isSelected: boolean;
  onClick: () => void;
}

export default function SignCard({ sign, isSelected, onClick }: SignCardProps) {
  return (
    <motion.div
      layout
      animate={{ 
        scale: isSelected ? 1.02 : 1,
      }}
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 overflow-hidden group h-full ${
        isSelected ? 'z-10' : ''
      }`}
    >
      <div className={`vibrant-card p-6 h-full flex flex-col items-center justify-center gap-4 text-center ${isSelected ? 'bg-[var(--accent3)]' : 'bg-white'}`}>
        <motion.span 
          animate={{ rotate: isSelected ? 5 : 0, scale: isSelected ? 1.1 : 1 }}
          className="text-7xl md:text-8xl mb-2 filter drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)]"
          style={{ color: sign.color }}
        >
          {sign.symbol}
        </motion.span>
        
        <div className="space-y-1">
          <h3 className="font-display text-3xl font-black uppercase tracking-tighter leading-none">{sign.name}</h3>
          <p className="text-[10px] font-sans text-black/40 font-black uppercase tracking-[0.2em]">{sign.dateRange}</p>
        </div>

        {isSelected && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-4 text-left w-full border-t-2 border-black/10 pt-4"
          >
            <p className="font-sans font-medium text-black/80 leading-snug text-sm">
              {sign.description}
            </p>
            
            <div className="grid grid-cols-2 gap-3 text-[9px] uppercase tracking-widest font-black text-black/30">
              <div className="bg-black/5 p-2 rounded-xl">
                <span>Element</span>
                <p className="text-black text-xs font-bold">{sign.element}</p>
              </div>
              <div className="bg-black/5 p-2 rounded-xl">
                <span>Ruler</span>
                <p className="text-black text-xs font-bold">{sign.rulingPlanet}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {sign.traits.map(trait => (
                <span key={trait} className="px-2 py-1 bg-black border-2 border-black rounded-lg text-[9px] font-black text-white uppercase tracking-tighter">
                  {trait}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
