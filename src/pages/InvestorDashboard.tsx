import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats/StatsCard';
import { InvoiceCard } from '@/components/invoice/InvoiceCard';
import { FundModal } from '@/components/modals/FundModal';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { 
  mockInvoices, 
  Invoice, 
  formatCurrency,
  RiskLevel 
} from '@/lib/mockData';
import { 
  TrendingUp, 
  Wallet, 
  PieChart, 
  Target,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Confetti from 'react-confetti';

export default function InvestorDashboard() {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [stateFilter, setStateFilter] = useState<'available' | 'funded' | 'all'>('available');

  const availableInvoices = invoices.filter(inv => inv.state === 'MINTED');
  const totalAvailable = availableInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const avgYield = availableInvoices.length > 0 
    ? availableInvoices.reduce((sum, inv) => sum + inv.yield, 0) / availableInvoices.length 
    : 0;

  const handleFundClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsFundModalOpen(true);
  };

  const handleFundConfirm = (amount: number) => {
    if (!selectedInvoice) return;

    setInvoices(invoices.map(inv => 
      inv.id === selectedInvoice.id 
        ? { ...inv, state: 'FUNDED' as const, fundedAmount: amount, fundedBy: '0x742d...fB2b' }
        : inv
    ));

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    
    toast({
      title: "🎉 Investment Successful!",
      description: `You funded ${formatCurrency(amount)} on ${selectedInvoice.id}`,
    });

    setIsFundModalOpen(false);
    setSelectedInvoice(null);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesRisk = riskFilter === 'all' || inv.riskLevel === riskFilter;
    const matchesState = 
      stateFilter === 'all' || 
      (stateFilter === 'available' && inv.state === 'MINTED') ||
      (stateFilter === 'funded' && inv.state !== 'MINTED');
    return matchesRisk && matchesState;
  });

  return (
    <div className="min-h-screen pt-20 pb-12">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Investor <span className="gradient-text-accent">Marketplace</span>
          </h1>
          <p className="text-muted-foreground">
            Browse and fund tokenized invoices to earn yield
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Available Opportunities"
            value={availableInvoices.length}
            subtitle="Ready for funding"
            icon={Target}
            variant="primary"
          />
          <StatsCard
            title="Total Value Available"
            value={formatCurrency(totalAvailable)}
            icon={Wallet}
            variant="accent"
          />
          <StatsCard
            title="Average APY"
            value={`${avgYield.toFixed(1)}%`}
            subtitle="Across all invoices"
            icon={TrendingUp}
            trend={{ value: 2.3, isPositive: true }}
          />
          <StatsCard
            title="Your Investments"
            value="3"
            subtitle="Active positions"
            icon={PieChart}
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* State Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                {(['all', 'available', 'funded'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setStateFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      stateFilter === f
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              {/* Risk Filter */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                {(['all', 'LOW', 'MEDIUM', 'HIGH'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRiskFilter(r)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      riskFilter === r
                        ? r === 'LOW' ? 'bg-success/20 text-success border border-success/30'
                        : r === 'MEDIUM' ? 'bg-warning/20 text-warning border border-warning/30'
                        : r === 'HIGH' ? 'bg-danger/20 text-danger border border-danger/30'
                        : 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {r === 'all' ? 'All Risk' : r === 'LOW' ? '🟢 Low' : r === 'MEDIUM' ? '🟡 Med' : '🔴 High'}
                  </button>
                ))}
              </div>
            </div>

            {/* Invoice Grid */}
            {filteredInvoices.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredInvoices.map((invoice) => (
                  <InvoiceCard 
                    key={invoice.id} 
                    invoice={invoice}
                    showFundButton
                    onFund={handleFundClick}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <Target className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Matching Invoices</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more opportunities
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Leaderboard */}
          <div className="lg:col-span-1">
            <Leaderboard />
          </div>
        </div>

        {/* Fund Modal */}
        <FundModal
          invoice={selectedInvoice}
          isOpen={isFundModalOpen}
          onClose={() => {
            setIsFundModalOpen(false);
            setSelectedInvoice(null);
          }}
          onConfirm={handleFundConfirm}
        />
      </div>
    </div>
  );
}
