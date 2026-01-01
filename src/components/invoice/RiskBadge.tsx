import { RiskLevel, riskConfig } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  risk: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function RiskBadge({ risk, size = 'md', showLabel = true }: RiskBadgeProps) {
  const config = riskConfig[risk];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border",
        risk === 'LOW' && "risk-low",
        risk === 'MEDIUM' && "risk-medium",
        risk === 'HIGH' && "risk-high",
        size === 'sm' && "px-2 py-0.5 text-xs",
        size === 'md' && "px-2.5 py-1 text-xs",
        size === 'lg' && "px-3 py-1.5 text-sm"
      )}
    >
      <span>{config.emoji}</span>
      {showLabel && config.label}
    </span>
  );
}
