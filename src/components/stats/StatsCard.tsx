import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent';
}

export function StatsCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatsCardProps) {
  return (
    <div className="stat-card animate-slide-up">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl",
            variant === 'default' && "bg-secondary",
            variant === 'primary' && "bg-primary/20",
            variant === 'accent' && "bg-accent/20"
          )}>
            <Icon className={cn(
              "w-5 h-5",
              variant === 'default' && "text-muted-foreground",
              variant === 'primary' && "text-primary",
              variant === 'accent' && "text-accent"
            )} />
          </div>
          {trend && (
            <span className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-success" : "text-danger"
            )}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">{title}</p>
          <p className={cn(
            "text-2xl font-bold",
            variant === 'primary' && "gradient-text",
            variant === 'accent' && "gradient-text-accent"
          )}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
