
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  History, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  CreditCard,
  Building,
  ArrowRight,
  ShieldCheck,
  Zap,
  Loader2,
  RefreshCw,
  Trophy,
  Activity
} from 'lucide-react';
import { fetchRealTimeStats } from '../services/blockchain';

const Dashboard = () => {
  const [withdrawStep, setWithdrawStep] = useState<'none' | 'method' | 'processing' | 'success'>('none');
  const [statsData, setStatsData] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoadingStats(true);
      const data = await fetchRealTimeStats();
      setStatsData(data);
      setLoadingStats(false);
    };
    load();
    
    // Poll for real-time changes
    const interval = setInterval(async () => {
      const data = await fetchRealTimeStats();
      setStatsData(data);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = statsData ? [
    { label: 'Total Alpha Yield', value: `$${statsData.totalEarnings.toLocaleString()}`, icon: TrendingUp, color: 'text-indigo-400' },
    { label: 'Active Participations', value: statsData.activeParticipations.toString(), icon: Activity, color: 'text-yellow-400' },
    { label: 'Completed Claims', value: statsData.completedAirdrops.toString(), icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Loyalty Points', value: statsData.alphaPoints.toLocaleString(), icon: Trophy, color: 'text-blue-400' },
  ] : [];

  const transactions = [
    { id: 1, type: 'Alpha Extraction', name: 'Berachain Artio', amount: '+$1,450.00', date: 'Real-time', status: 'Verified' },
    { id: 2, type: 'Network Reward', name: 'Daily Sequence', amount: '+25 Alpha', date: '5m ago', status: 'Claimed' },
    { id: 3, type: 'On-chain Event', name: 'Monad Parallel EVM', amount: 'Indexing', date: 'Just now', status: 'Pending' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-black mb-2 tracking-tighter">Terminal <span className="gradient-text">Portfolio</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Aggregated On-chain Intelligence Hub</p>
        </div>
        <div className="glass p-8 rounded-[40px] flex items-center gap-8 min-w-[320px] border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent shadow-2xl">
          <div>
            <p className="text-xs text-indigo-400 font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <Zap className="w-3 h-3" /> Available Alpha
            </p>
            <div className="text-4xl font-black tracking-tighter">
              {loadingStats ? <RefreshCw className="w-8 h-8 animate-spin inline-block" /> : `$${statsData?.totalEarnings.toLocaleString()}`}
            </div>
          </div>
          <button 
            onClick={() => setWithdrawStep('method')}
            className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-indigo-600/30 active:scale-95 flex items-center gap-2 border border-white/10"
          >
            Settle <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {loadingStats ? (
           Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="glass h-32 rounded-[32px] animate-pulse bg-white/5 border border-white/5"></div>
           ))
        ) : stats.map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[32px] border border-white/5 hover:border-indigo-500/30 transition-all group group-hover:-translate-y-1">
            <div className="bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-indigo-600 group-hover:border-indigo-400 transition-all">
              <stat.icon className={`w-6 h-6 ${stat.color} group-hover:text-white transition-colors`} />
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass rounded-[40px] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <History className="w-6 h-6 text-indigo-400" /> Protocol Ledger
              </h3>
              <button className="text-xs font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">Advanced View</button>
            </div>
            <div className="divide-y divide-white/5">
              {transactions.map(tx => (
                <div key={tx.id} className="p-8 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/40 transition-all">
                      <Wallet className="w-6 h-6 text-gray-400 group-hover:text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-black text-lg text-gray-200">{tx.name}</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{tx.type} • {tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-xl text-gray-200">{tx.amount}</div>
                    <div className={`text-[10px] font-black uppercase tracking-widest mt-1 flex items-center justify-end gap-2 ${tx.status === 'Verified' ? 'text-emerald-400' : 'text-amber-400'}`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Verified' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="glass p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <ShieldCheck className="w-32 h-32 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-black mb-8">On-Chain Safety</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-emerald-500/5 rounded-3xl border border-emerald-500/10">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <div className="text-sm font-black text-emerald-400 uppercase tracking-widest">Biometric Vault</div>
                  <div className="text-xs text-gray-400 font-medium">Your private key is protected by the device enclave.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-indigo-500/5 rounded-3xl border border-indigo-500/10">
                <ShieldCheck className="w-6 h-6 text-indigo-400 mt-1 shrink-0" />
                <div>
                  <div className="text-sm font-black text-indigo-400 uppercase tracking-widest">Protocol Scan</div>
                  <div className="text-xs text-gray-400 font-medium">Auto-auditing 12 protocols for withdrawal vulnerability.</div>
                </div>
              </div>
            </div>
            <button className="w-full mt-10 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all border border-indigo-500/20 active:scale-95">
              Launch Security Audit
            </button>
          </section>
        </div>
      </div>

      {/* Withdrawal Modals */}
      {withdrawStep !== 'none' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl" onClick={() => setWithdrawStep('none')}></div>
          
          <div className="relative glass w-full max-w-lg rounded-[40px] p-10 animate-in fade-in slide-in-from-bottom-8 duration-500 border border-white/10 shadow-[0_0_100px_rgba(79,70,229,0.15)]">
            {withdrawStep === 'method' && (
              <>
                <h2 className="text-4xl font-black mb-3 tracking-tighter">Settle Yield</h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-10">Institutional Extraction Gateway</p>
                
                <div className="space-y-4 mb-10">
                  {[
                    { id: 'wallet', name: 'On-chain Wallet', desc: 'Settle to Cold Storage', icon: Wallet },
                    { id: 'bank', name: 'Institutional Fiat', desc: 'Direct SWIFT/SEPA Wire', icon: Building },
                    { id: 'card', name: 'Alpha Card', desc: 'Zero-fee Visa Payout', icon: CreditCard }
                  ].map(method => (
                    <button 
                      key={method.id}
                      onClick={() => setWithdrawStep('processing')}
                      className="w-full p-6 glass hover:border-indigo-500/50 flex items-center gap-6 rounded-[32px] group transition-all border border-white/5 active:scale-[0.98]"
                    >
                      <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-indigo-600 transition-all border border-white/5 group-hover:border-indigo-400">
                        <method.icon className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-black text-lg text-gray-200 uppercase tracking-tighter">{method.name}</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{method.desc}</div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-700 group-hover:text-indigo-400 transition-all group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setWithdrawStep('none')}
                  className="w-full text-gray-600 font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors"
                >
                  Terminate Request
                </button>
              </>
            )}

            {withdrawStep === 'processing' && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-indigo-600/10 rounded-[32px] border border-indigo-500/20 flex items-center justify-center mx-auto mb-10">
                  <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin" />
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase">Synchronizing Nodes</h2>
                <p className="text-gray-500 max-w-xs mx-auto mb-10 text-sm font-medium leading-relaxed">
                  Verifying proof-of-work across Berachain and Ethereum Mainnet protocols.
                </p>
                <div className="flex justify-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-0"></div>
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-150"></div>
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-300"></div>
                </div>
                {setTimeout(() => setWithdrawStep('success'), 3500) && null}
              </div>
            )}

            {withdrawStep === 'success' && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-[32px] border border-emerald-500/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </div>
                <h2 className="text-4xl font-black mb-3 tracking-tighter uppercase text-emerald-400">Yield Extracted</h2>
                <p className="text-gray-400 mb-12 font-medium">
                  Your settlement of <strong className="text-white font-black">${statsData?.totalEarnings.toLocaleString()}</strong> is broadcasted on-chain.
                </p>
                <button 
                  onClick={() => setWithdrawStep('none')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[28px] font-black transition-all shadow-2xl shadow-indigo-600/30 uppercase tracking-[0.2em] text-xs border border-white/10"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
