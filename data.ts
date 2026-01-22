
import { Airdrop } from './types';

export const INITIAL_AIRDROPS: Airdrop[] = [
  {
    id: 'berachain',
    name: 'Berachain',
    description: 'A high-performance EVM-compatible blockchain built on Proof-of-Liquidity consensus.',
    longDescription: 'Berachain is a DeFi-focused, EVM-compatible L1 blockchain built on the Cosmos SDK, powered by Proof-of-Liquidity. The project has raised over $142M from top-tier VCs like Brevan Howard and Framework.',
    logoUrl: 'https://picsum.photos/seed/bera/200/200',
    bannerUrl: 'https://picsum.photos/seed/berabanner/800/400',
    status: 'Active',
    category: 'L1/L2',
    chain: ['Berachain Artio'],
    potentialValue: '$1,000 - $5,000',
    difficulty: 'Medium',
    cost: 'Free',
    dateAdded: '2024-03-15',
    requirements: [
      { id: '1', label: 'Testnet Faucet', isMandatory: true },
      { id: '2', label: 'DEX Swaps', isMandatory: true },
      { id: '3', label: 'Liquidity Provision', isMandatory: true }
    ],
    guideSteps: [
      'Connect your wallet to Artio Testnet.',
      'Claim BERA tokens from the faucet.',
      'Swap tokens on BEX (Berachain DEX).',
      'Provide liquidity to BEX pools.',
      'Mint HONEY stablecoin.'
    ],
    contracts: [
      { label: 'BEX Router', address: '0x32356B247656e1878E0a012A27a44f8087265814', type: 'DEX' },
      { label: 'Honey Factory', address: '0xad0D86095325776C636d0e8C0f3E4E4E195f2694', type: 'Governance' }
    ],
    explorerUrl: 'https://artio.beratrail.io/',
    links: {
      website: 'https://berachain.com',
      twitter: 'https://twitter.com/berachain',
      discord: 'https://discord.com/invite/berachain'
    }
  },
  {
    id: 'monad',
    name: 'Monad',
    description: 'A ultra-high performance EVM L1 that enables 10,000+ real transactions per second.',
    longDescription: 'Monad is a revolutionary L1 that introduces parallel execution to the EVM. It is one of the most anticipated airdrops of the year given its massive $225M funding round led by Paradigm.',
    logoUrl: 'https://picsum.photos/seed/monad/200/200',
    bannerUrl: 'https://picsum.photos/seed/monadbanner/800/400',
    status: 'Potential',
    category: 'L1/L2',
    chain: ['Monad'],
    potentialValue: '$2,000+',
    difficulty: 'Hard',
    cost: 'Free',
    dateAdded: '2024-04-10',
    requirements: [
      { id: '1', label: 'Discord Participation', isMandatory: true },
      { id: '2', label: 'Community Contribution', isMandatory: false },
      { id: '3', label: 'Testnet Access', isMandatory: true }
    ],
    guideSteps: [
      'Join the Monad Discord server.',
      'Participate in community discussions to earn roles.',
      'Stay tuned for the upcoming public testnet.',
      'Engage with ecosystem projects early.'
    ],
    contracts: [],
    explorerUrl: 'https://monad.xyz/explorer',
    links: {
      website: 'https://monad.xyz',
      twitter: 'https://twitter.com/monad_xyz'
    }
  },
  {
    id: 'linea',
    name: 'Linea',
    description: 'Consensys-backed zkEVM scaling solution for Ethereum.',
    longDescription: 'Linea is a type 2 zero-knowledge Ethereum Virtual Machine (zkEVM) that replicates the Ethereum environment as a rollup. Powered by ConsenSys.',
    logoUrl: 'https://picsum.photos/seed/linea/200/200',
    bannerUrl: 'https://picsum.photos/seed/lineabanner/800/400',
    status: 'Confirmed',
    category: 'L1/L2',
    chain: ['Ethereum', 'Linea'],
    potentialValue: '$500 - $2,500',
    difficulty: 'Medium',
    cost: 'Low',
    dateAdded: '2024-01-20',
    requirements: [
      { id: '1', label: 'Mainnet Bridge', isMandatory: true },
      { id: '2', label: 'LXP Collection', isMandatory: true },
      { id: '3', label: 'Dapp Interaction', isMandatory: true }
    ],
    guideSteps: [
      'Bridge ETH to Linea Mainnet.',
      'Participate in Linea Voyage quests on Layer3 or Intract.',
      'Interact with top ecosystem DEXs like SyncSwap or Velocore.',
      'Hold a Linea Voyage NFT if you participated in testnet.'
    ],
    contracts: [
      { label: 'Linea L1 Bridge', address: '0xd19d4B14095876008638C61922c2626e32669389', type: 'Bridge' }
    ],
    explorerUrl: 'https://lineascan.build/',
    links: {
      website: 'https://linea.build',
      twitter: 'https://twitter.com/LineaBuild'
    }
  }
];
