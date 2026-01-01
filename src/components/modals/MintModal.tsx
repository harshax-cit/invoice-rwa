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
import { Label } from '@/components/ui/label';
import { calculateRiskScore, RiskLevel } from '@/lib/mockData';
import { FileText, Upload, Sparkles, CheckCircle } from 'lucide-react';
import { RiskBadge } from '@/components/invoice/RiskBadge';

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMint: (data: InvoiceFormData) => void;
}

export interface InvoiceFormData {
  buyerName: string;
  buyerId: string;
  amount: number;
  dueDate: string;
  invoiceFile?: File;
}

export function MintModal({ isOpen, onClose, onMint }: MintModalProps) {
  const [step, setStep] = useState<'form' | 'preview' | 'minting' | 'success'>('form');
  const [formData, setFormData] = useState<InvoiceFormData>({
    buyerName: '',
    buyerId: '',
    amount: 0,
    dueDate: '',
  });
  const [riskPreview, setRiskPreview] = useState<{ risk: RiskLevel; yield: number } | null>(null);

  const handlePreview = () => {
    const dueDate = new Date(formData.dueDate);
    const today = new Date();
    const daysToDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const riskResult = calculateRiskScore(formData.amount, daysToDue, 85);
    setRiskPreview(riskResult);
    setStep('preview');
  };

  const handleMint = async () => {
    setStep('minting');
    // Simulate minting
    await new Promise(resolve => setTimeout(resolve, 2500));
    setStep('success');
    setTimeout(() => {
      onMint(formData);
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setStep('form');
    setFormData({ buyerName: '', buyerId: '', amount: 0, dueDate: '' });
    setRiskPreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetForm}>
      <DialogContent className="glass-card border-border/50 max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-5 h-5 text-primary" />
            {step === 'success' ? 'Invoice Minted!' : 'Tokenize Invoice'}
          </DialogTitle>
          <DialogDescription>
            {step === 'form' && 'Enter invoice details to create an NFT'}
            {step === 'preview' && 'Review your invoice before minting'}
            {step === 'minting' && 'Creating your invoice NFT on-chain...'}
            {step === 'success' && 'Your invoice is now available for funding'}
          </DialogDescription>
        </DialogHeader>

        {step === 'form' && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Buyer Company Name</Label>
              <Input
                placeholder="e.g., Tata Motors"
                value={formData.buyerName}
                onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Buyer ID / GST Number</Label>
              <Input
                placeholder="e.g., 27AABCT1332L1Z5"
                value={formData.buyerId}
                onChange={(e) => setFormData({ ...formData, buyerId: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Invoice Amount (₹)</Label>
                <Input
                  type="number"
                  placeholder="250000"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Invoice Document (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drop PDF here or click to upload
                </p>
              </div>
            </div>

            <Button
              variant="gradient"
              className="w-full"
              onClick={handlePreview}
              disabled={!formData.buyerName || !formData.amount || !formData.dueDate}
            >
              <Sparkles className="w-4 h-4" />
              Calculate Risk & Preview
            </Button>
          </div>
        )}

        {step === 'preview' && riskPreview && (
          <div className="space-y-6 py-4">
            <div className="bg-secondary/50 rounded-lg p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Buyer</span>
                <span className="font-medium">{formData.buyerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-xl gradient-text">
                  ₹{formData.amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Due Date</span>
                <span>{new Date(formData.dueDate).toLocaleDateString()}</span>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-muted-foreground">AI Risk Assessment</span>
                  <RiskBadge risk={riskPreview.risk} size="lg" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Suggested Yield</span>
                  <span className="text-accent font-bold text-lg">
                    {riskPreview.yield.toFixed(1)}% APY
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('form')} className="flex-1">
                Edit Details
              </Button>
              <Button variant="gradient" onClick={handleMint} className="flex-1">
                <FileText className="w-4 h-4" />
                Mint NFT
              </Button>
            </div>
          </div>
        )}

        {step === 'minting' && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
            <p className="text-lg font-medium mb-2">Minting Invoice NFT...</p>
            <p className="text-sm text-muted-foreground">
              Uploading metadata to IPFS and creating on-chain token
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <p className="text-lg font-medium mb-2 text-success">Successfully Minted!</p>
            <p className="text-sm text-muted-foreground">
              Your invoice NFT is now live and ready for investors
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
