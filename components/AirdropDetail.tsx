
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  Twitter, 
  MessageSquare, 
  BookOpen, 
  Globe, 
  CheckCircle2, 
  Circle,
  Loader2,
  Sparkles,
  Zap,
  Clock,
  Shield,
  Target,
  Copy,
  Search,
  FileCode,
  Link as LinkIcon,
  Rss
} from 'lucide-react';
import { Airdrop, AIAnalysis } from '../types';
import { INITIAL_AIRDROPS } from '../data';
import { getAIAnalysis } from '../services/gemini';

const AirdropDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [airdrop, setAirdrop] = useState<Airdrop | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const found = INITIAL_AIRDROPS.find(a => a.id === id);
    if (found) {
      setAirdrop(found);
    }
  }, [id]);

  const handleGenerateAnalysis = async () => {
    if (!airdrop) return;
    setLoadingAnalysis(true);
    const result = await getAIAnalysis(airdrop);
    setAnalysis(result);
    setLoadingAnalysis(false);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!airdrop) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen pb-24">
      {/* Header / Banner */}
      <div className="relative h-64 md:h-80 w-full">
        <img src={airdrop.bannerUrl} className="w-full h-full object-cover" alt="banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
            <div className="relative">
              <div className="bg-[#020617] p-2 rounded-3xl border border-white/10 shadow-2xl">
                <img src={airdrop.logoUrl} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover" alt="logo" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <span className="text-gray-600">/</span>
                <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">{airdrop.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">{airdrop.name}</h1>
              <div className="flex flex-wrap gap-2">
                {airdrop.chain.map(c => (
                  <span key={c} className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" /> {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <a href={airdrop.links.website} target="_blank" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95">
                Launch App <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <section className="glass p-8 rounded-[32px] border border-white/5">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Globe className="text-indigo-400 w-6 h-6" /> Protocol Architecture
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg font-medium opacity-90">
              {airdrop.longDescription}
            </p>
          </section>

          {/* On-Chain Data Section */}
          <section className="glass p-8 rounded-[32px] border border-white/5 bg-gradient-to-br from-indigo-500/5 to-transparent">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <FileCode className="text-indigo-400 w-6 h-6" /> Verified Smart Contracts
              </h2>
              <a 
                href={airdrop.explorerUrl} 
                target="_blank" 
                className="text-indigo-400 text-sm font-bold hover:text-indigo-300 flex items-center gap-1.5 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20"
              >
                Explorer <LinkIcon className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="space-y-4">
              {airdrop.contracts.length > 0 ? airdrop.contracts.map((contract, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5 group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-4 mb-3 md:mb-0">
                    <div className="bg-indigo-600/10 p-2.5 rounded-xl border border-indigo-500/20">
                      <Zap className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-0.5">{contract.type}</div>
                      <div className="font-bold text-gray-200">{contract.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-[10px] md:text-sm bg-black/60 px-4 py-2 rounded-xl text-gray-400 font-mono border border-white/5 block overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] md:max-w-none">
                      {contract.address}
                    </code>
                    <button 
                      onClick={() => copyToClipboard(contract.address, contract.label)}
                      className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-colors border border-white/5"
                    >
                      {copied === contract.label ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Awaiting Mainnet Contract Deployment</p>
                </div>
              )}
            </div>
          </section>

          {/* Guide Steps */}
          <section className="glass p-8 rounded-[32px] border border-white/5">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <Target className="text-rose-500 w-6 h-6" /> Yield Strategy
            </h2>
            <div className="space-y-6">
              {airdrop.guideSteps.map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-sm">
                      0{idx + 1}
                    </div>
                    {idx !== airdrop.guideSteps.length - 1 && (
                      <div className="w-px h-full bg-white/10 my-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-gray-200 font-bold text-lg group-hover:text-white transition-colors leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Alpha Feed - Grounded with Google Search */}
          <section className="relative overflow-hidden p-8 rounded-[32px] border border-indigo-500/30 bg-[#060b21]">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Rss className="w-32 h-32 text-indigo-400" />
            </div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <Sparkles className="text-yellow-400" /> Live Alpha Feed
                  </h2>
                  <p className="text-indigo-400/60 text-sm mt-1 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Search className="w-3 h-3" /> Real-time ecosystem analysis via Gemini 3
                  </p>
                </div>
                {!analysis && !loadingAnalysis && (
                  <button 
                    onClick={handleGenerateAnalysis}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-xl shadow-indigo-600/30 active:scale-95"
                  >
                    Scan for Updates
                  </button>
                )}
              </div>

              {loadingAnalysis ? (
                <div className="py-16 flex flex-col items-center justify-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-indigo-400 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="text-indigo-400 font-black text-lg animate-pulse uppercase tracking-tighter">Connecting to Chain Indexers...</p>
                    <p className="text-gray-500 text-sm mt-1">Verifying recent social sentiment and contract activity</p>
                  </div>
                </div>
              ) : analysis ? (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                      <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Risk Assessment</div>
                      <div className={`text-xl font-black ${
                        analysis.riskLevel === 'Low' ? 'text-emerald-400' : analysis.riskLevel === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {analysis.riskLevel}
                      </div>
                    </div>
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                      <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Success Propensity</div>
                      <div className="text-xl font-black text-gray-100">{analysis.probability}</div>
                    </div>
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                      <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Weekly Commitment</div>
                      <div className="text-xl font-black text-gray-100">{analysis.estimatedTime}</div>
                    </div>
                  </div>
                  
                  <div className="bg-black/60 p-6 rounded-2xl border border-indigo-500/10">
                    <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Search className="w-3.5 h-3.5" /> Latest Intelligence Digest
                    </h4>
                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-sm font-medium">
                      {analysis.latestNews}
                    </div>
                  </div>

                  {analysis.sources && analysis.sources.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Data Sources</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.sources.slice(0, 4).map((source, i) => (
                          <a 
                            key={i} 
                            href={source.web.uri} 
                            target="_blank" 
                            className="bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-2 rounded-xl text-xs font-bold text-gray-400 transition-all flex items-center gap-2"
                          >
                            <LinkIcon className="w-3 h-3" /> {source.web.title.slice(0, 20)}...
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-[40px]">
                  <p className="text-gray-500 font-black text-sm uppercase tracking-widest mb-2">Alpha Stream Offline</p>
                  <p className="text-gray-600 text-xs">Run the diagnostic scan to pull verified project news</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <section className="glass p-8 rounded-[32px] border border-white/5">
            <h3 className="text-xl font-black mb-8 border-b border-white/5 pb-4">On-Chain Health</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Status</span>
                <span className="text-indigo-400 font-black uppercase text-xs tracking-tighter bg-indigo-500/10 px-3 py-1 rounded-full">{airdrop.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Est. Reward</span>
                <span className="text-gray-100 font-black text-lg">{airdrop.potentialValue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Gas Cost</span>
                <span className="text-emerald-400 font-black">{airdrop.cost}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Index Priority</span>
                <span className="text-rose-400 font-black uppercase text-xs">High Alpha</span>
              </div>
            </div>
          </section>

          {/* Social Presence */}
          <section className="glass p-8 rounded-[32px] border border-white/5">
            <h3 className="text-xl font-black mb-6">Social Verifications</h3>
            <div className="grid grid-cols-1 gap-3">
              {airdrop.links.website && (
                <a href={airdrop.links.website} target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-black text-gray-200 uppercase tracking-widest">Portal</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </a>
              )}
              {airdrop.links.twitter && (
                <a href={airdrop.links.twitter} target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-sky-400" />
                    <span className="text-sm font-black text-gray-200 uppercase tracking-widest">X Alpha</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </a>
              )}
              {airdrop.links.discord && (
                <a href={airdrop.links.discord} target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-black text-gray-200 uppercase tracking-widest">Community</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </a>
              )}
            </div>
          </section>

          {/* Compliance Checklist */}
          <section className="glass p-8 rounded-[32px] border border-white/5">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" /> KYC Requirements
            </h3>
            <div className="space-y-3">
              {airdrop.requirements.length > 0 ? airdrop.requirements.map(req => (
                <div key={req.id} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-4 h-4 ${req.isMandatory ? 'text-indigo-500' : 'text-gray-600'}`} />
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{req.label}</span>
                  </div>
                  {req.isMandatory && <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-lg uppercase font-black tracking-tighter">REQUIRED</span>}
                </div>
              )) : (
                <p className="text-gray-500 text-sm text-center py-6 font-bold uppercase tracking-widest">No KYC Metadata Available</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AirdropDetail;
