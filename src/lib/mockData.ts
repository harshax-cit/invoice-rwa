export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type InvoiceState = 'MINTED' | 'FUNDED' | 'ESCROW' | 'PAID' | 'SETTLED';

export interface Invoice {
  id: string;
  tokenId: number;
  msmeName: string;
  msmeWallet: string;
  buyerName: string;
  buyerId: string;
  amount: number;
  dueDate: string;
  daysToDue: number;
  riskLevel: RiskLevel;
  yield: number;
  state: InvoiceState;
  fundedAmount: number;
  fundedBy?: string;
  createdAt: string;
  ipfsHash?: string;
}

export interface Investor {
  address: string;
  name: string;
  totalInvested: number;
  totalYield: number;
  activeInvestments: number;
}

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    tokenId: 1,
    msmeName: 'TechParts India Pvt Ltd',
    msmeWallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f8fB2b',
    buyerName: 'Tata Motors',
    buyerId: 'BUYER-001',
    amount: 250000,
    dueDate: '2025-01-15',
    daysToDue: 17,
    riskLevel: 'LOW',
    yield: 5.5,
    state: 'MINTED',
    fundedAmount: 0,
    createdAt: '2024-12-28',
    ipfsHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
  },
  {
    id: 'INV-002',
    tokenId: 2,
    msmeName: 'Green Textiles Co',
    msmeWallet: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    buyerName: 'Reliance Retail',
    buyerId: 'BUYER-002',
    amount: 180000,
    dueDate: '2025-01-25',
    daysToDue: 27,
    riskLevel: 'LOW',
    yield: 6.0,
    state: 'FUNDED',
    fundedAmount: 180000,
    fundedBy: '0x1234...5678',
    createdAt: '2024-12-25',
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
  },
  {
    id: 'INV-003',
    tokenId: 3,
    msmeName: 'Auto Components Ltd',
    msmeWallet: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    buyerName: 'Mahindra & Mahindra',
    buyerId: 'BUYER-003',
    amount: 420000,
    dueDate: '2025-02-10',
    daysToDue: 43,
    riskLevel: 'MEDIUM',
    yield: 8.5,
    state: 'MINTED',
    fundedAmount: 0,
    createdAt: '2024-12-27',
  },
  {
    id: 'INV-004',
    tokenId: 4,
    msmeName: 'Steel Forge Industries',
    msmeWallet: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c',
    buyerName: 'L&T Construction',
    buyerId: 'BUYER-004',
    amount: 850000,
    dueDate: '2025-03-01',
    daysToDue: 62,
    riskLevel: 'MEDIUM',
    yield: 9.0,
    state: 'ESCROW',
    fundedAmount: 850000,
    fundedBy: '0xabcd...efgh',
    createdAt: '2024-12-20',
  },
  {
    id: 'INV-005',
    tokenId: 5,
    msmeName: 'Pharma Solutions',
    msmeWallet: '0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C',
    buyerName: 'Apollo Hospitals',
    buyerId: 'BUYER-005',
    amount: 95000,
    dueDate: '2025-01-05',
    daysToDue: 7,
    riskLevel: 'LOW',
    yield: 4.5,
    state: 'SETTLED',
    fundedAmount: 95000,
    fundedBy: '0x9876...5432',
    createdAt: '2024-12-15',
  },
  {
    id: 'INV-006',
    tokenId: 6,
    msmeName: 'Digital Services Hub',
    msmeWallet: '0x583031D1113aD414F02576BD6afaBfb302140225',
    buyerName: 'Infosys Ltd',
    buyerId: 'BUYER-006',
    amount: 320000,
    dueDate: '2025-04-15',
    daysToDue: 107,
    riskLevel: 'HIGH',
    yield: 12.0,
    state: 'MINTED',
    fundedAmount: 0,
    createdAt: '2024-12-29',
  },
];

export const mockInvestors: Investor[] = [
  {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'Alpha Capital',
    totalInvested: 1250000,
    totalYield: 87500,
    activeInvestments: 5,
  },
  {
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    name: 'DeFi Whale',
    totalInvested: 980000,
    totalYield: 68600,
    activeInvestments: 4,
  },
  {
    address: '0x9876543210fedcba9876543210fedcba98765432',
    name: 'Yield Hunter',
    totalInvested: 750000,
    totalYield: 52500,
    activeInvestments: 3,
  },
  {
    address: '0xfedcba9876543210fedcba9876543210fedcba98',
    name: 'Crypto Fund',
    totalInvested: 520000,
    totalYield: 36400,
    activeInvestments: 2,
  },
  {
    address: '0x0123456789abcdef0123456789abcdef01234567',
    name: 'Smart Money',
    totalInvested: 340000,
    totalYield: 23800,
    activeInvestments: 2,
  },
];

export const riskConfig = {
  LOW: { color: 'success', emoji: '🟢', label: 'Low Risk', minYield: 4, maxYield: 7 },
  MEDIUM: { color: 'warning', emoji: '🟡', label: 'Medium Risk', minYield: 7, maxYield: 10 },
  HIGH: { color: 'danger', emoji: '🔴', label: 'High Risk', minYield: 10, maxYield: 15 },
};

export const stateConfig = {
  MINTED: { label: 'Available', color: 'primary' },
  FUNDED: { label: 'Funded', color: 'accent' },
  ESCROW: { label: 'In Escrow', color: 'warning' },
  PAID: { label: 'Buyer Paid', color: 'success' },
  SETTLED: { label: 'Settled', color: 'muted' },
};

export function calculateRiskScore(amount: number, daysToDue: number, buyerReputation: number = 85): { risk: RiskLevel; yield: number } {
  if (daysToDue < 30 && amount < 500000 && buyerReputation > 80) {
    return { risk: 'LOW', yield: 5 + Math.random() * 2 };
  }
  if (daysToDue < 60 && amount < 1000000 && buyerReputation > 60) {
    return { risk: 'MEDIUM', yield: 8 + Math.random() * 2 };
  }
  return { risk: 'HIGH', yield: 11 + Math.random() * 3 };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUSDC(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
