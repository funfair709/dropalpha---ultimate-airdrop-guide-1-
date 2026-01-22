
import React, { useEffect, useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, Layers, ShieldCheck, ChevronRight, PieChart } from 'lucide-react';
import { fetchWalletBalances } from '../services/blockchain';
import { TokenBalance } from '../types';

const WalletView = () => {
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchWalletBalances();
      setBalances(data);
      setLoading(false);
    };
    load();
  }, []);

  const totalValue = balances.reduce((acc, curr) => acc + curr.valueUsd, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      {/* Portfolio Header */}
      <div className="glass p-10 rounded-[40px] border border-white/5 relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <PieChart className="w-40 h-40 text-indigo-400" />
        </div>
        
        <div className="relative z-10">
          <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs mb-2">Total Net Worth</p>
          <h1 className="text-6xl font-black tracking-tighter mb-8">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h1>
          
          <div className="flex flex-wrap gap-3">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
              <ArrowUpRight className="w-5 h-5" /> Send
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 border border-white/10 transition-all active:scale-95">
              <ArrowDownLeft className="w-5 h-5" /> Receive
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 border border-white/10 transition-all active:scale-95">
              <RefreshCw className="w-5 h-5" /> Swap
            </button>
          </div>
        </div>
      </div>

      {/* Asset List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-xl font-black flex items-center gap-3">
            <Layers className="text-indigo-500" /> My Assets
          </h2>
          <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300">Manage Tokens</button>
        </div>

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Indexing Multi-chain Balances...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {balances.map((token, i) => (
              <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img src={token.logo} className="w-12 h-12 rounded-full border border-white/10" alt={token.symbol} />
                    <div className="absolute -bottom-1 -right-1 bg-[#020617] p-0.5 rounded-full border border-white/10">
                       <ShieldCheck className="w-3 h-3 text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-lg group-hover:text-indigo-400 transition-colors">{token.name}</div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{token.chain}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-lg">{token.amount} {token.symbol}</div>
                  <div className="text-sm text-gray-400 font-medium">
                    {token.valueUsd > 0 ? `$${token.valueUsd.toLocaleString()}` : '--'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Banner */}
      <div className="glass p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-6">
        <div className="bg-emerald-500/20 p-4 rounded-2xl">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-black text-emerald-400">Vault Security Active</h3>
          <p className="text-sm text-gray-400 font-medium">Your assets are protected by DropAlpha's multi-sig architecture.</p>
        </div>
        <button className="ml-auto text-emerald-400 p-2 hover:bg-emerald-500/10 rounded-full transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default WalletView;
