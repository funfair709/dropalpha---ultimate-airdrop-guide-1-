
export type AirdropStatus = 'Active' | 'Potential' | 'Ended' | 'Confirmed';

export interface TokenBalance {
  symbol: string;
  name: string;
  amount: string;
  valueUsd: number;
  logo: string;
  chain: string;
}

export interface Transaction {
  hash: string;
  block: number;
  from: string;
  to: string;
  value: string;
  fee: string;
  timestamp: string;
  status: 'Success' | 'Pending' | 'Failed';
  method: string;
}

export interface ContractInfo {
  label: string;
  address: string;
  type: 'Token' | 'DEX' | 'Bridge' | 'Governance';
}

export interface AirdropRequirement {
  id: string;
  label: string;
  isMandatory: boolean;
}

export interface Airdrop {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  logoUrl: string;
  bannerUrl: string;
  status: AirdropStatus;
  category: 'DeFi' | 'L1/L2' | 'NFT' | 'Bridge' | 'Wallet';
  chain: string[];
  potentialValue: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cost: 'Free' | 'Low' | 'High';
  dateAdded: string;
  requirements: AirdropRequirement[];
  guideSteps: string[];
  contracts: ContractInfo[];
  explorerUrl: string;
  links: {
    website: string;
    twitter?: string;
    discord?: string;
    docs?: string;
  };
}

export interface AIAnalysis {
  riskLevel: 'Low' | 'Medium' | 'High';
  probability: string;
  strategySummary: string;
  estimatedTime: string;
  latestNews?: string;
  sources?: { web: { uri: string; title: string } }[];
}
