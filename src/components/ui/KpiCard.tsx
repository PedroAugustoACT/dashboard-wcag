'use client';

/**
 * KpiCard — Key Performance Indicator card.
 *
 * Displays a metric value with title, subtitle, optional trend indicator,
 * and an icon slot. Used in overview and summary sections.
 *
 * CLIENT COMPONENT: renders trend icon and hover animation.
 *
 * @example
 * ```tsx
 * <KpiCard
 *   title="Total Violations"
 *   value="14,659"
 *   subtitle="Across all scanned sites"
 *   trend={{ direction: 'up', label: '+12% vs last scan' }}
 *   icon={<WarningAmberIcon />}
 *   accentColor="#ef4444"
 * />
 * ```
 */

import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
  Tooltip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import type { KpiCardProps, TrendDirection } from '@/types';

// ---------------------------------------------------------------------------
// Trend icon helper
// ---------------------------------------------------------------------------

const TREND_COLORS: Record<TrendDirection, string> = {
  up:      '#ef4444',
  down:    '#22c55e',
  neutral: '#94a3b8',
};

function TrendIcon({ direction }: { direction: TrendDirection }) {
  const color = TREND_COLORS[direction];
  const sx = { fontSize: 14, color };

  if (direction === 'up')      return <TrendingUpIcon sx={sx} />;
  if (direction === 'down')    return <TrendingDownIcon sx={sx} />;
  return <TrendingFlatIcon sx={sx} />;
}

// ---------------------------------------------------------------------------
// Skeleton variant
// ---------------------------------------------------------------------------

function KpiCardSkeleton() {
  return (
    <Card
      sx={{ height: '100%', minHeight: 130 }}
      aria-busy="true"
      aria-label="Loading metric"
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Skeleton variant="rounded" width={44} height={44} sx={{ flexShrink: 0 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Skeleton variant="text" width="55%" height={16} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="75%" height={32} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="45%" height={14} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  accentColor = '#3b82f6',
  loading = false,
  sx,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}: KpiCardProps) {
  if (loading) return <KpiCardSkeleton />;

  const formattedValue =
    typeof value === 'number' ? value.toLocaleString('en-US') : value;

  return (
    <Card
      sx={{ height: '100%', minHeight: 130, ...sx }}
      role="region"
      aria-label={ariaLabel ?? `${title}: ${formattedValue}`}
      aria-describedby={ariaDescribedby}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>

          {/* Icon slot */}
          {icon && (
            <Box
              aria-hidden="true"
              sx={{
                flexShrink: 0,
                width: 44,
                height: 44,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${accentColor}18`,
                color: accentColor,
                '& svg': { fontSize: 22 },
              }}
            >
              {icon}
            </Box>
          )}

          {/* Text content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="overline"
              component="p"
              sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              component="p"
              sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}
            >
              {formattedValue}
            </Typography>

            {/* Subtitle + trend */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
              {subtitle && (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {subtitle}
                </Typography>
              )}

              {trend && (
                <Tooltip title={trend.label} arrow>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.25,
                      cursor: 'default',
                    }}
                    aria-label={`Trend: ${trend.label}`}
                  >
                    <TrendIcon direction={trend.direction} />
                    <Typography
                      variant="caption"
                      sx={{ color: TREND_COLORS[trend.direction], fontWeight: 500 }}
                    >
                      {trend.label}
                    </Typography>
                  </Box>
                </Tooltip>
              )}
            </Box>
          </Box>

        </Box>
      </CardContent>
    </Card>
  );
}
