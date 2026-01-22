
import React, { useEffect, useState } from 'react';
import { Search, Database, ArrowRight, Clock, Hash, Activity, Terminal, ExternalLink, RefreshCw } from 'lucide-react';
import { fetchRecentTransactions } from '../services/blockchain';
import { Transaction } from '../types';

const ExplorerView = () => {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchRecentTransactions();
      setTxs(data);
      setLoading(false);
    };
    load();
    const interval = setInterval(async () => {
      const data = await fetchRecentTransactions();
      setTxs(prev => [data[0], ...prev.slice(0, 9)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black flex items-center gap-4 mb-2">
            <Database className="text-indigo-500 w-10 h-10" /> Block <span className="gradient-text">Explorer</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Real-time Multi-chain On-chain Indexer</p>
        </div>
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by Address / Txn Hash / Block / Token..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Network Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[32px] border border-white/5 space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3">
              <Activity className="text-indigo-400 w-5 h-5" /> Network Health
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-gray-500 text-xs font-black uppercase tracking-widest">Avg Gas</div>
                <div className="font-black text-indigo-400">21 Gwei</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-gray-500 text-xs font-black uppercase tracking-widest">Block Time</div>
                <div className="font-black text-emerald-400">12.0s</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-gray-500 text-xs font-black uppercase tracking-widest">Total TPS</div>
                <div className="font-black text-gray-200">145.2</div>
              </div>
            </div>
            <div className="pt-6 border-t border-white/5">
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Live Node Log</span>
                </div>
                <div className="font-mono text-[10px] text-emerald-500/70 space-y-1">
                  <div>> Block 19283745 propagation: OK</div>
                  <div>> Fetching gas prices: success</div>
                  <div>> Peer sync: 124 connected</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="lg:col-span-2">
          <div className="glass rounded-[32px] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-3">
                <Clock className="text-indigo-400 w-5 h-5" /> Recent Transactions
              </h3>
              <span className="text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20">LIVE INDEXING</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <tr>
                    <th className="px-8 py-4">TX Hash</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Value</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-20 text-center">
                        {/* Fix: Added missing RefreshCw import to ensure the loader icon renders correctly */}
                        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
                        <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Syncing with Mainnet Nodes...</span>
                      </td>
                    </tr>
                  ) : txs.map((tx, i) => (
                    <tr key={tx.hash} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-600/10 rounded-lg group-hover:bg-indigo-600 transition-colors">
                            <Hash className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-black text-gray-200 truncate max-w-[120px] font-mono">{tx.hash}</div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase">Block {tx.block}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                         <span className="text-xs font-black bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-gray-400 uppercase tracking-tighter">{tx.method}</span>
                      </td>
                      <td className="px-6 py-5 font-black text-sm text-gray-200">{tx.value}</td>
                      <td className="px-6 py-5">
                        <div className={`text-[10px] font-black uppercase flex items-center gap-2 ${tx.status === 'Success' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Success' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'}`} />
                          {tx.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-white/5 text-center border-t border-white/5">
              <button className="text-indigo-400 font-black text-xs uppercase tracking-widest hover:text-indigo-300 transition-colors flex items-center gap-2 mx-auto">
                View All Transactions <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorerView;
