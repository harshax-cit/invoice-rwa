import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Invoice, 
  riskConfig, 
  stateConfig, 
  formatCurrency, 
  shortenAddress 
} from '@/lib/mockData';
import { 
  Calendar, 
  Building2, 
  Wallet, 
  TrendingUp, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InvoiceCardProps {
  invoice: Invoice;
  showFundButton?: boolean;
  onFund?: (invoice: Invoice) => void;
  onSettle?: (invoice: Invoice) => void;
}

export function InvoiceCard({ invoice, showFundButton, onFund, onSettle }: InvoiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const risk = riskConfig[invoice.riskLevel];
  const state = stateConfig[invoice.state];

  const canFund = invoice.state === 'MINTED';
  const canSettle = invoice.state === 'ESCROW' || invoice.state === 'PAID';

  return (
    <div
      className={cn(
        "glass-card-hover p-5 relative overflow-hidden group",
        isHovered && "border-primary/40"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* State Badge */}
      <div className="flex items-center justify-between mb-4">
        <Badge 
          variant="outline" 
          className={cn(
            "font-medium",
            state.color === 'primary' && "border-primary/50 text-primary bg-primary/10",
            state.color === 'accent' && "border-accent/50 text-accent bg-accent/10",
            state.color === 'warning' && "border-warning/50 text-warning bg-warning/10",
            state.color === 'success' && "border-success/50 text-success bg-success/10",
            state.color === 'muted' && "border-muted-foreground/50 text-muted-foreground bg-muted"
          )}
        >
          {state.label}
        </Badge>
        
        {/* Risk Badge */}
        <span className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
          invoice.riskLevel === 'LOW' && "risk-low",
          invoice.riskLevel === 'MEDIUM' && "risk-medium",
          invoice.riskLevel === 'HIGH' && "risk-high"
        )}>
          <span>{risk.emoji}</span>
          {risk.label}
        </span>
      </div>

      {/* Invoice ID & Token */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm text-muted-foreground">{invoice.id}</span>
        <span className="text-xs text-muted-foreground">Token #{invoice.tokenId}</span>
      </div>

      {/* MSME Name */}
      <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
        {invoice.msmeName}
      </h3>

      {/* Buyer */}
      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
        <Building2 className="w-4 h-4" />
        <span>Buyer: {invoice.buyerName}</span>
      </div>

      {/* Amount */}
      <div className="bg-secondary/50 rounded-lg p-4 mb-4">
        <div className="text-xs text-muted-foreground mb-1">Invoice Amount</div>
        <div className="text-2xl font-bold gradient-text">
          {formatCurrency(invoice.amount)}
        </div>
        {invoice.fundedAmount > 0 && (
          <div className="text-xs text-accent mt-1">
            Funded: {formatCurrency(invoice.fundedAmount)}
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary/70" />
          <span>Due: {invoice.daysToDue} days</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <TrendingUp className="w-4 h-4 text-accent/70" />
          <span className="text-accent font-medium">{invoice.yield.toFixed(1)}% APY</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground col-span-2">
          <Wallet className="w-4 h-4" />
          <span className="font-mono text-xs">{shortenAddress(invoice.msmeWallet)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {showFundButton && canFund && (
          <Button 
            variant="gradient" 
            className="flex-1"
            onClick={() => onFund?.(invoice)}
          >
            <Zap className="w-4 h-4" />
            Fund Now
          </Button>
        )}
        {canSettle && onSettle && (
          <Button 
            variant="success" 
            className="flex-1"
            onClick={() => onSettle?.(invoice)}
          >
            Settle
          </Button>
        )}
        {invoice.ipfsHash && (
          <Button variant="outline" size="icon" className="shrink-0">
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none",
        "bg-gradient-to-br from-primary/5 via-transparent to-accent/5",
        isHovered && "opacity-100"
      )} />
    </div>
  );
}
