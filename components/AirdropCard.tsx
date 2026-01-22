
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Coins, 
  BarChart3, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Airdrop } from '../types';

interface AirdropCardProps {
  airdrop: Airdrop;
}

const AirdropCard: React.FC<AirdropCardProps> = ({ airdrop }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Potential': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Confirmed': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      case 'Ended': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Link 
      to={`/airdrop/${airdrop.id}`}
      className="group block relative glass rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Banner */}
      <div className="h-28 overflow-hidden relative">
        <img 
          src={airdrop.bannerUrl} 
          alt={airdrop.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2">
        <div className="flex justify-between items-start mb-4">
          <div className="relative -mt-10">
            <div className="bg-[#030712] p-1.5 rounded-2xl border border-white/10">
              <img 
                src={airdrop.logoUrl} 
                alt={airdrop.name} 
                className="w-14 h-14 rounded-xl object-cover shadow-2xl"
              />
            </div>
          </div>
          <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(airdrop.status)}`}>
            {airdrop.status}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
          {airdrop.name}
          {airdrop.status === 'Confirmed' && <ShieldCheck className="w-4 h-4 text-indigo-400" />}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">
          {airdrop.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 rounded-xl p-3 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
              <TrendingUp className="w-3 h-3" />
              Value
            </div>
            <div className="text-sm font-semibold text-gray-200">{airdrop.potentialValue}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
              <BarChart3 className="w-3 h-3" />
              Difficulty
            </div>
            <div className="text-sm font-semibold text-gray-200">{airdrop.difficulty}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex gap-1.5">
            {airdrop.chain.map(c => (
              <span key={c} className="text-[10px] font-medium px-2 py-0.5 bg-white/5 rounded text-gray-400">
                {c}
              </span>
            ))}
          </div>
          <div className="text-indigo-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Full Guide
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AirdropCard;
