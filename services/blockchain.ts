
import { TokenBalance, Transaction } from '../types';

const MOCK_WALLETS = [
  '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
];

export const fetchRealTimeStats = async () => {
  // Simulate API latency
  await new Promise(r => setTimeout(r, 800));
  return {
    activeParticipations: Math.floor(Math.random() * 5) + 10,
    completedAirdrops: Math.floor(Math.random() * 3) + 7,
    alphaPoints: 1240 + Math.floor(Math.random() * 100),
    totalEarnings: 4200.50 + (Math.random() * 50)
  };
};

export const fetchWalletBalances = async (): Promise<TokenBalance[]> => {
  return [
    { symbol: 'ETH', name: 'Ethereum', amount: '1.24', valueUsd: 3100.20, logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', chain: 'Ethereum' },
    { symbol: 'BERA', name: 'Berachain', amount: '450.00', valueUsd: 0, logo: 'https://picsum.photos/seed/bera/32/32', chain: 'Berachain' },
    { symbol: 'USDC', name: 'USD Coin', amount: '1245.50', valueUsd: 1245.50, logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png', chain: 'Ethereum' },
    { symbol: 'MON', name: 'Monad', amount: '0.00', valueUsd: 0, logo: 'https://picsum.photos/seed/monad/32/32', chain: 'Monad' },
  ];
};

export const fetchRecentTransactions = async (): Promise<Transaction[]> => {
  const methods = ['Swap', 'Bridge', 'Mint', 'Approve', 'Stake'];
  const statuses: ('Success' | 'Pending')[] = ['Success', 'Pending'];
  
  return Array.from({ length: 10 }).map((_, i) => ({
    hash: '0x' + Math.random().toString(16).slice(2, 42),
    block: 19283745 - i,
    from: MOCK_WALLETS[0],
    to: '0x' + Math.random().toString(16).slice(2, 42),
    value: (Math.random() * 0.5).toFixed(4) + ' ETH',
    fee: '0.00021 ETH',
    timestamp: new Date(Date.now() - i * 1000 * 60 * 15).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
  }));
};
