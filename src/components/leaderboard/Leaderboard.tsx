import { mockInvestors, formatUSDC, shortenAddress } from '@/lib/mockData';
import { Trophy, Medal, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Leaderboard() {
  const sortedInvestors = [...mockInvestors].sort((a, b) => b.totalYield - a.totalYield);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-accent" />;
    if (index === 1) return <Medal className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />;
    if (index === 2) return <Medal className="w-5 h-5 text-[hsl(25,60%,50%)]" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm text-muted-foreground">{index + 1}</span>;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <Trophy className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Top Investors</h3>
          <p className="text-sm text-muted-foreground">By total yield earned</p>
        </div>
      </div>

      <div className="space-y-3">
        {sortedInvestors.slice(0, 5).map((investor, index) => (
          <div
            key={investor.address}
            className={cn(
              "flex items-center gap-4 p-3 rounded-lg transition-all",
              index === 0 && "bg-accent/10 border border-accent/20",
              index !== 0 && "hover:bg-secondary"
            )}
          >
            <div className="flex-shrink-0">
              {getRankIcon(index)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{investor.name}</p>
              <p className="text-xs text-muted-foreground font-mono">
                {shortenAddress(investor.address)}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-accent">
                {formatUSDC(investor.totalYield)}
              </p>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="w-3 h-3" />
                <span>{((investor.totalYield / investor.totalInvested) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
