import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Invoice, formatCurrency, riskConfig } from '@/lib/mockData';
import { Zap, AlertCircle, TrendingUp, Shield } from 'lucide-react';

interface FundModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export function FundModal({ invoice, isOpen, onClose, onConfirm }: FundModalProps) {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!invoice) return null;

  const risk = riskConfig[invoice.riskLevel];
  const maxAmount = invoice.amount - invoice.fundedAmount;
  const potentialYield = (parseFloat(amount) || 0) * (invoice.yield / 100);

  const handleFund = async () => {
    setIsProcessing(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    onConfirm(parseFloat(amount));
    setIsProcessing(false);
    setAmount('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="w-5 h-5 text-primary" />
            Fund Invoice
          </DialogTitle>
          <DialogDescription>
            Provide liquidity to {invoice.msmeName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Invoice Summary */}
          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Invoice ID</span>
              <span className="font-mono">{invoice.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold gradient-text">{formatCurrency(invoice.amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Risk Level</span>
              <span className="flex items-center gap-1.5">
                <span>{risk.emoji}</span>
                <span>{risk.label}</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expected Yield</span>
              <span className="text-accent font-semibold">{invoice.yield.toFixed(1)}% APY</span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Amount to Fund (USDC)</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-20"
                max={maxAmount}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary font-medium hover:text-primary/80"
                onClick={() => setAmount(maxAmount.toString())}
              >
                MAX
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Available: {formatCurrency(maxAmount)}
            </p>
          </div>

          {/* Yield Preview */}
          {parseFloat(amount) > 0 && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-success mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Projected Returns</span>
              </div>
              <div className="text-2xl font-bold text-success">
                +{formatCurrency(potentialYield)}
              </div>
              <p className="text-xs text-success/70 mt-1">
                Upon successful settlement in {invoice.daysToDue} days
              </p>
            </div>
          )}

          {/* Warning */}
          <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="text-sm text-warning">
              <p className="font-medium mb-1">Investment Risk</p>
              <p className="text-warning/80">
                Returns depend on buyer payment. Principal is locked in escrow until settlement.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="gradient"
              onClick={handleFund}
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Confirm Funding
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
