/**
 * StatRow — Horizontal strip of labeled metric values.
 *
 * SERVER COMPONENT if no loading prop needed; use statically.
 * Typically used inside ChartContainer cards below chart headers.
 *
 * @example
 * ```tsx
 * <StatRow
 *   items={[
 *     { label: 'Accuracy',  value: '100%', color: '#22c55e' },
 *     { label: 'Precision', value: '100%', color: '#22c55e' },
 *     { label: 'Recall',    value: '100%', color: '#22c55e' },
 *     { label: 'F1 Score',  value: '100%', color: '#22c55e' },
 *   ]}
 * />
 * ```
 */

import { Box, Divider, Skeleton, Typography } from '@mui/material';
import type { StatRowProps } from '@/types';

export function StatRow({ items, loading = false, sx }: StatRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        ...sx,
      }}
      role="list"
      aria-label="Metrics"
    >
      {items.map((item, i) => (
        <Box
          key={item.label}
          role="listitem"
          sx={{
            flex: '1 1 0',
            minWidth: 100,
            px: 2,
            py: 1.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.25,
            borderRight: i < items.length - 1 ? '1px solid' : 'none',
            borderColor: 'divider',
          }}
        >
          {loading ? (
            <>
              <Skeleton variant="text" width={40} height={24} />
              <Skeleton variant="text" width={60} height={14} />
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontWeight: 700, color: item.color ?? 'text.primary' }}
                aria-label={`${item.label}: ${item.value}`}
              >
                {item.value}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                {item.label}
              </Typography>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}
