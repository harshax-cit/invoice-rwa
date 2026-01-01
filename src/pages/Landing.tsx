import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  TrendingUp, 
  FileText, 
  Users,
  ChevronRight,
  CheckCircle,
  Globe
} from 'lucide-react';

const stats = [
  { label: 'Total Volume', value: '₹45Cr+', sublabel: 'Invoices Tokenized' },
  { label: 'Active Investors', value: '2,500+', sublabel: 'Earning Yield' },
  { label: 'Avg. APY', value: '8.5%', sublabel: 'Returns' },
  { label: 'Settlement Rate', value: '99.2%', sublabel: 'Success Rate' },
];

const features = [
  {
    icon: FileText,
    title: 'Tokenize Invoices',
    description: 'Convert unpaid invoices into tradeable NFTs backed by real receivables.',
  },
  {
    icon: Shield,
    title: 'Smart Escrow',
    description: 'Funds locked in audited smart contracts until buyer payment confirmation.',
  },
  {
    icon: Zap,
    title: 'Instant Liquidity',
    description: 'MSMEs receive working capital within minutes, not months.',
  },
  {
    icon: TrendingUp,
    title: 'Yield Generation',
    description: 'Investors earn 5-12% APY on short-term, asset-backed positions.',
  },
];

const steps = [
  { step: 1, title: 'Upload Invoice', description: 'MSME submits invoice details and documents' },
  { step: 2, title: 'Mint NFT', description: 'AI scores risk, invoice becomes tradeable token' },
  { step: 3, title: 'Get Funded', description: 'Investors fund invoice, MSME receives capital' },
  { step: 4, title: 'Auto-Settle', description: 'Buyer pays, investor receives yield automatically' },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Globe className="w-4 h-4" />
              <span>Built on Sepolia Testnet</span>
              <ChevronRight className="w-4 h-4" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
              <span className="gradient-text">Unlock Working Capital</span>
              <br />
              <span className="text-foreground">Through Invoice NFTs</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              The first RWA marketplace connecting MSMEs with DeFi investors. 
              Tokenize invoices, access instant liquidity, earn sustainable yields.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild variant="gradient" size="xl">
                <Link to="/msme">
                  <FileText className="w-5 h-5" />
                  I'm an MSME
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="accent" size="xl">
                <Link to="/invest">
                  <TrendingUp className="w-5 h-5" />
                  I'm an Investor
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="glass-card p-5 text-center animate-slide-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How <span className="gradient-text">InvoiceRWA</span> Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A seamless bridge between traditional invoice financing and decentralized finance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card-hover p-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple <span className="gradient-text-accent">4-Step</span> Process
            </h2>
            <p className="text-muted-foreground">
              From invoice to funding in under 2 minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="glass-card p-6 text-center h-full">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-6 h-6 text-primary/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Built for <span className="gradient-text">Trust & Transparency</span>
                </h2>
                <ul className="space-y-3">
                  {[
                    'Audited smart contracts on Ethereum',
                    'Real-time on-chain verification',
                    'KYC-verified MSMEs and buyers',
                    'Immutable transaction history',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-float">
                  <Shield className="w-24 h-24 text-primary/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to <span className="gradient-text-accent">Transform</span> Invoice Financing?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join the future of trade finance. Whether you're an MSME seeking liquidity or an investor chasing yield.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="gradient" size="lg">
                <Link to="/msme">
                  Start as MSME
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/invest">
                  Explore Investments
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold">₹</span>
              </div>
              <div>
                <span className="font-bold gradient-text">InvoiceRWA</span>
                <span className="text-xs text-muted-foreground block">Powered by Ethereum</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Sepolia Testnet</span>
              <span>•</span>
              <span>Hackathon Demo</span>
              <span>•</span>
              <span>2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
