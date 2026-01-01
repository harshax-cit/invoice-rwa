import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats/StatsCard';
import { InvoiceCard } from '@/components/invoice/InvoiceCard';
import { MintModal, InvoiceFormData } from '@/components/modals/MintModal';
import { 
  mockInvoices, 
  Invoice, 
  formatCurrency, 
  calculateRiskScore 
} from '@/lib/mockData';
import { 
  Plus, 
  FileText, 
  DollarSign, 
  Clock, 
  CheckCircle,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Confetti from 'react-confetti';

export default function MSMEDashboard() {
  const { toast } = useToast();
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>(
    mockInvoices.filter(inv => inv.msmeWallet === '0x742d35Cc6634C0532925a3b844Bc9e7595f8fB2b')
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [filter, setFilter] = useState<'all' | 'minted' | 'funded' | 'settled'>('all');

  const msmeStats = {
    totalInvoices: invoices.length,
    totalValue: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    pendingValue: invoices.filter(inv => inv.state === 'MINTED').reduce((sum, inv) => sum + inv.amount, 0),
    fundedValue: invoices.filter(inv => ['FUNDED', 'ESCROW', 'PAID', 'SETTLED'].includes(inv.state)).reduce((sum, inv) => sum + inv.amount, 0),
  };

  const handleMint = (data: InvoiceFormData) => {
    const dueDate = new Date(data.dueDate);
    const today = new Date();
    const daysToDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const riskResult = calculateRiskScore(data.amount, daysToDue);

    const newInvoice: Invoice = {
      id: `INV-${String(invoices.length + 7).padStart(3, '0')}`,
      tokenId: invoices.length + 7,
      msmeName: 'Your Company',
      msmeWallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f8fB2b',
      buyerName: data.buyerName,
      buyerId: data.buyerId,
      amount: data.amount,
      dueDate: data.dueDate,
      daysToDue,
      riskLevel: riskResult.risk,
      yield: parseFloat(riskResult.yield.toFixed(1)),
      state: 'MINTED',
      fundedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setInvoices([newInvoice, ...invoices]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    
    toast({
      title: "🎉 Invoice Minted Successfully!",
      description: `Token #${newInvoice.tokenId} is now available for funding`,
    });
  };

  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'all') return true;
    if (filter === 'minted') return inv.state === 'MINTED';
    if (filter === 'funded') return ['FUNDED', 'ESCROW', 'PAID'].includes(inv.state);
    if (filter === 'settled') return inv.state === 'SETTLED';
    return true;
  });

  return (
    <div className="min-h-screen pt-20 pb-12">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              MSME <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your tokenized invoices and track funding
            </p>
          </div>
          <Button variant="gradient" size="lg" onClick={() => setIsMintModalOpen(true)}>
            <Plus className="w-5 h-5" />
            Mint New Invoice
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Invoices"
            value={msmeStats.totalInvoices}
            icon={FileText}
            variant="primary"
          />
          <StatsCard
            title="Total Value"
            value={formatCurrency(msmeStats.totalValue)}
            icon={DollarSign}
            variant="accent"
          />
          <StatsCard
            title="Pending Funding"
            value={formatCurrency(msmeStats.pendingValue)}
            icon={Clock}
          />
          <StatsCard
            title="Funded Amount"
            value={formatCurrency(msmeStats.fundedValue)}
            icon={CheckCircle}
            trend={{ value: 12.5, isPositive: true }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          {(['all', 'minted', 'funded', 'settled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Invoice Grid */}
        {filteredInvoices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Invoices Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by minting your first invoice NFT to access instant liquidity
            </p>
            <Button variant="gradient" onClick={() => setIsMintModalOpen(true)}>
              <Plus className="w-4 h-4" />
              Mint Your First Invoice
            </Button>
          </div>
        )}

        {/* Mint Modal */}
        <MintModal
          isOpen={isMintModalOpen}
          onClose={() => setIsMintModalOpen(false)}
          onMint={handleMint}
        />
      </div>
    </div>
  );
}
