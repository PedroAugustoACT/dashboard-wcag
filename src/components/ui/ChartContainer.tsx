'use client';

/**
 * ChartContainer — Reusable chart wrapper card.
 *
 * Provides a consistent card shell for every chart in the dashboard:
 * - Title + description header
 * - Loading skeleton overlay
 * - Empty state when no data
 * - Actions slot (top-right)
 * - Configurable height
 *
 * CLIENT COMPONENT: needed because Recharts charts are client-only.
 *
 * @example
 * ```tsx
 * <ChartContainer
 *   title="Violation Distribution"
 *   description="Top 15 WCAG rules by occurrence count"
 *   height={360}
 *   loading={isLoading}
 *   hasData={data.length > 0}
 * >
 *   <MyBarChart data={data} />
 * </ChartContainer>
 * ```
 */

import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import type { ChartContainerProps } from '@/types';
import { EmptyState } from './EmptyState';

// ---------------------------------------------------------------------------
// Chart loading skeleton
// ---------------------------------------------------------------------------

function ChartSkeleton({ height }: { height: number }) {
  return (
    <Box
      sx={{ height, display: 'flex', flexDirection: 'column', gap: 1, pt: 1 }}
      aria-busy="true"
      aria-label="Loading chart"
    >
      {/* Fake bar chart rows */}
      {[80, 60, 90, 45, 70, 55].map((w, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="text" width={80} height={14} />
          <Skeleton variant="rounded" width={`${w}%`} height={20} />
        </Box>
      ))}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ChartContainer({
  title,
  description,
  height = 360,
  actions,
  children,
  loading = false,
  emptyMessage = 'Nenhum dado disponível.',
  hasData = true,
  sx,
  'aria-label': ariaLabel,
}: ChartContainerProps) {
  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', ...sx }}
      role="region"
      aria-label={ariaLabel ?? title}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          pt: 2.5,
          pb: 1.5,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 600, lineHeight: 1.3, mb: description ? 0.25 : 0 }}
          >
            {title}
          </Typography>
          {description && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          )}
        </Box>

        {actions && (
          <Box sx={{ flexShrink: 0, display: 'flex', gap: 0.5 }}>
            {actions}
          </Box>
        )}
      </Box>

      <Divider />

      {/* Chart area */}
      <CardContent
        sx={{
          flex: 1,
          p: 2.5,
          '&:last-child': { pb: 2.5 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {loading ? (
          <ChartSkeleton height={height} />
        ) : !hasData ? (
          <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <EmptyState
              message={emptyMessage}
              icon={<BarChartIcon sx={{ fontSize: 40, opacity: 0.4 }} />}
            />
          </Box>
        ) : (
          <Box sx={{ height, width: '100%', position: 'relative' }}>
            {children}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
