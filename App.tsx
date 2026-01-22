
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Trophy, 
  Clock, 
  Coins, 
  Zap, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  ShieldCheck,
  LayoutDashboard,
  Wallet,
  Activity,
  Database
} from 'lucide-react';
import { Airdrop, AirdropStatus } from './types';
import { INITIAL_AIRDROPS } from './data';
import AirdropCard from './components/AirdropCard';
import AirdropDetail from './components/AirdropDetail';
import Dashboard from './components/Dashboard';
import VoiceAssistant from './components/VoiceAssistant';
import WalletView from './components/WalletView';
import ExplorerView from './components/ExplorerView';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-8 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-indigo-600 p-2.5 rounded-2xl group-hover:rotate-[15deg] transition-all shadow-lg shadow-indigo-600/30">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-black tracking-tighter">
            Drop<span className="gradient-text">Alpha</span>
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
          <Link to="/" className={`hover:text-white transition-colors flex items-center gap-2 ${location.pathname === '/' ? 'text-indigo-400' : ''}`}>
            <Activity className="w-3.5 h-3.5" /> Discovery
          </Link>
          <Link to="/wallet" className={`hover:text-white transition-colors flex items-center gap-2 ${location.pathname === '/wallet' ? 'text-indigo-400' : ''}`}>
            <Wallet className="w-3.5 h-3.5" /> Wallet
          </Link>
          <Link to="/explorer" className={`hover:text-white transition-colors flex items-center gap-2 ${location.pathname === '/explorer' ? 'text-indigo-400' : ''}`}>
            <Database className="w-3.5 h-3.5" /> Explorer
          </Link>
          <Link to="/dashboard" className={`hover:text-white transition-colors flex items-center gap-2 ${location.pathname === '/dashboard' ? 'text-indigo-400' : ''}`}>
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
             <ShieldCheck className="w-4 h-4 text-emerald-400" />
             Verified
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/30 active:scale-95 flex items-center gap-2 border border-white/10">
            Connect
          </button>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AirdropStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredAirdrops = useMemo(() => {
    return INITIAL_AIRDROPS.filter(drop => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = drop.name.toLowerCase().includes(q) || 
                           drop.description.toLowerCase().includes(q) ||
                           drop.chain.some(c => c.toLowerCase().includes(q));
      const matchesStatus = statusFilter === 'All' || drop.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || drop.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const categories = ['All', 'DeFi', 'L1/L2', 'NFT', 'Bridge', 'Wallet'];
  const statuses: (AirdropStatus | 'All')[] = ['All', 'Active', 'Potential', 'Confirmed', 'Ended'];

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-500/10 blur-[160px] rounded-full -z-10 animate-pulse"></div>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-indigo-600/10 border border-indigo-500/20 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 mb-10 animate-fade-in shadow-inner">
            <Sparkles className="w-4 h-4" />
            <span>AI-Driven Institutional Intelligence</span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black mb-8 tracking-tighter leading-[0.8] drop-shadow-2xl">
            ALPHA <br />
            <span className="gradient-text">HARVEST</span>
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-bold tracking-tight">
            The world's first multi-chain yield extraction engine. Powered by <span className="text-indigo-400">Gemini 3 Flash</span> for real-time alpha identification.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-600/40 flex items-center justify-center gap-3 group border border-white/10">
              Start Claiming
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/wallet" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-12 py-5 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95">
              Portfolio
              <Wallet className="w-5 h-5 text-indigo-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Discovery Feed */}
      <section className="px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-6 rounded-[40px] flex flex-col lg:flex-row gap-8 items-center border border-white/10 shadow-2xl">
            {/* Search */}
            <div className="relative w-full lg:flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-600" />
              <input 
                type="text" 
                placeholder="Protocol, Ecosystem, Address..."
                className="w-full bg-black/60 border border-white/5 rounded-[28px] py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-gray-200 placeholder:text-gray-700 font-bold tracking-tight text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    categoryFilter === cat 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 scale-105' 
                    : 'bg-white/5 text-gray-500 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Airdrop Grid */}
      <section className="px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black flex items-center gap-5 tracking-tighter">
              <Layers className="text-indigo-500 w-10 h-10" />
              Discovery Stream
              <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 tracking-[0.2em] uppercase">
                {filteredAirdrops.length} Active Feeds
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filteredAirdrops.map(airdrop => (
              <AirdropCard key={airdrop.id} airdrop={airdrop} />
            ))}
          </div>
        </div>
      </section>

      <VoiceAssistant onTranscribed={(text) => setSearchQuery(text)} />
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/airdrop/:id" element={<AirdropDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<WalletView />} />
        <Route path="/explorer" element={<ExplorerView />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
