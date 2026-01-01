import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats/StatsCard';
import { 
  mockInvoices, 
  Invoice, 
  formatCurrency,
  stateConfig 
} from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  DollarSign, 
  CheckCircle, 
  Clock,
  CreditCard,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Confetti from 'react-confetti';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [showConfetti, setShowConfetti] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const escrowInvoices = invoices.filter(inv => inv.state === 'ESCROW' || inv.state === 'FUNDED');
  const settledInvoices = invoices.filter(inv => inv.state === 'SETTLED');
  const totalEscrow = escrowInvoices.reduce((sum, inv) => sum + inv.fundedAmount, 0);
  const totalSettled = settledInvoices.reduce((sum, inv) => sum + inv.fundedAmount, 0);

  const handleBuyerPayment = async (invoice: Invoice) => {
    setProcessingId(invoice.id);
    // Simulate payment
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setInvoices(invoices.map(inv => 
      inv.id === invoice.id 
        ? { ...inv, state: 'PAID' as const }
        : inv
    ));

    toast({
      title: "💰 Buyer Payment Received",
      description: `${invoice.buyerName} paid ${formatCurrency(invoice.amount)}`,
    });
    setProcessingId(null);
  };

  const handleSettle = async (invoice: Invoice) => {
    setProcessingId(invoice.id);
    // Simulate settlement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const yieldAmount = invoice.fundedAmount * (invoice.yield / 100);

    setInvoices(invoices.map(inv => 
      inv.id === invoice.id 
        ? { ...inv, state: 'SETTLED' as const }
        : inv
    ));

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    toast({
      title: "✅ Settlement Complete!",
      description: `Investor received ${formatCurrency(invoice.fundedAmount + yieldAmount)} (${invoice.yield}% yield)`,
    });
    setProcessingId(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} colors={['#22c55e', '#10b981', '#34d399']} />}
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold">
              Admin <span className="gradient-text-accent">Control Panel</span>
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage buyer payments and settlement operations (Mock Demo)
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-warning">Demo Mode Active</p>
            <p className="text-sm text-warning/80">
              This is a mock admin panel for demonstration. In production, buyer payments would trigger automatic settlements via smart contracts.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Invoices in Escrow"
            value={escrowInvoices.length}
            icon={Clock}
            variant="primary"
          />
          <StatsCard
            title="Total in Escrow"
            value={formatCurrency(totalEscrow)}
            icon={DollarSign}
            variant="accent"
          />
          <StatsCard
            title="Settled Invoices"
            value={settledInvoices.length}
            icon={CheckCircle}
          />
          <StatsCard
            title="Total Settled"
            value={formatCurrency(totalSettled)}
            icon={CreditCard}
            trend={{ value: 8.2, isPositive: true }}
          />
        </div>

        {/* Pending Settlements */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Pending Actions
          </h2>

          {invoices.filter(inv => ['FUNDED', 'ESCROW', 'PAID'].includes(inv.state)).length > 0 ? (
            <div className="space-y-4">
              {invoices
                .filter(inv => ['FUNDED', 'ESCROW', 'PAID'].includes(inv.state))
                .map(invoice => {
                  const state = stateConfig[invoice.state];
                  const yieldAmount = invoice.fundedAmount * (invoice.yield / 100);

                  return (
                    <div key={invoice.id} className="bg-secondary/50 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm text-muted-foreground">{invoice.id}</span>
                          <Badge variant="outline" className={cn(
                            state.color === 'accent' && "border-accent/50 text-accent bg-accent/10",
                            state.color === 'warning' && "border-warning/50 text-warning bg-warning/10",
                            state.color === 'success' && "border-success/50 text-success bg-success/10"
                          )}>
                            {state.label}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{invoice.msmeName}</h3>
                        <p className="text-sm text-muted-foreground">Buyer: {invoice.buyerName}</p>
                      </div>

                      <div className="text-center md:text-right">
                        <div className="text-2xl font-bold gradient-text mb-1">
                          {formatCurrency(invoice.amount)}
                        </div>
                        <div className="text-sm text-accent">
                          +{formatCurrency(yieldAmount)} yield ({invoice.yield}%)
                        </div>
                      </div>

                      <div className="flex gap-2 md:flex-col">
                        {invoice.state === 'FUNDED' || invoice.state === 'ESCROW' ? (
                          <Button
                            variant="accent"
                            onClick={() => handleBuyerPayment(invoice)}
                            disabled={processingId === invoice.id}
                            className="flex-1 md:flex-initial"
                          >
                            {processingId === invoice.id ? (
                              <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                            ) : (
                              <CreditCard className="w-4 h-4" />
                            )}
                            Mock Buyer Payment
                          </Button>
                        ) : null}
                        {invoice.state === 'PAID' && (
                          <Button
                            variant="success"
                            onClick={() => handleSettle(invoice)}
                            disabled={processingId === invoice.id}
                            className="flex-1 md:flex-initial"
                          >
                            {processingId === invoice.id ? (
                              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : (
                              <>
                                <ArrowRight className="w-4 h-4" />
                                Settle & Release Funds
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 mx-auto text-success/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
              <p className="text-muted-foreground">No pending settlements at the moment</p>
            </div>
          )}
        </div>

        {/* Settlement History */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            Settlement History
          </h2>

          {settledInvoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground font-medium">Invoice</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground font-medium">MSME</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground font-medium">Buyer</th>
                    <th className="text-right py-3 px-4 text-sm text-muted-foreground font-medium">Amount</th>
                    <th className="text-right py-3 px-4 text-sm text-muted-foreground font-medium">Yield Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {settledInvoices.map(invoice => (
                    <tr key={invoice.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm">{invoice.id}</span>
                      </td>
                      <td className="py-4 px-4">{invoice.msmeName}</td>
                      <td className="py-4 px-4 text-muted-foreground">{invoice.buyerName}</td>
                      <td className="py-4 px-4 text-right font-semibold">{formatCurrency(invoice.fundedAmount)}</td>
                      <td className="py-4 px-4 text-right text-success font-medium">
                        +{formatCurrency(invoice.fundedAmount * (invoice.yield / 100))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No settlements yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
