import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, Menu, X, FileText, TrendingUp, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/msme', label: 'MSME Portal', icon: FileText },
  { path: '/invest', label: 'Invest', icon: TrendingUp },
  { path: '/admin', label: 'Admin', icon: Shield },
];

export function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const mockConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(190,90%,50%)] flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-shadow">
              <span className="text-primary-foreground font-bold text-lg">₹</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg gradient-text">InvoiceRWA</span>
              <span className="text-xs text-muted-foreground block -mt-1">Tokenized Invoice Financing</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            <Button
              variant={isConnected ? "glass" : "gradient"}
              size="sm"
              onClick={mockConnect}
              className="hidden sm:flex"
            >
              <Wallet className="w-4 h-4" />
              {isConnected ? '0x742d...fB2b' : 'Connect Wallet'}
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/30 animate-slide-up">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
            <div className="mt-4 px-4">
              <Button
                variant={isConnected ? "glass" : "gradient"}
                size="default"
                onClick={mockConnect}
                className="w-full"
              >
                <Wallet className="w-4 h-4" />
                {isConnected ? '0x742d...fB2b' : 'Connect Wallet'}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
