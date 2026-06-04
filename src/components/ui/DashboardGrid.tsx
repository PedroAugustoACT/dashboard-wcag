/**
 * DashboardGrid — Responsive CSS Grid layout for dashboard cards.
 *
 * SERVER COMPONENT: layout-only, no interactivity.
 *
 * Uses MUI Grid2 for responsive column distribution.
 * Defaults to: 1 col (xs) → 2 cols (sm) → 3 cols (lg)
 *
 * @example
 * ```tsx
 * // 4 KPI cards row
 * <DashboardGrid columns={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
 *   <KpiCard ... />
 *   <KpiCard ... />
 *   <KpiCard ... />
 *   <KpiCard ... />
 * </DashboardGrid>
 *
 * // 2-column chart grid
 * <DashboardGrid columns={{ xs: 1, lg: 2 }}>
 *   <ChartContainer ... />
 *   <ChartContainer ... />
 * </DashboardGrid>
 * ```
 */

import Grid from '@mui/material/Grid';
import type { DashboardGridProps } from '@/types';

const DEFAULT_COLUMNS = { xs: 1, sm: 2, lg: 3 };

export function DashboardGrid({
  children,
  columns = DEFAULT_COLUMNS,
  spacing = 3,
  sx,
}: DashboardGridProps) {
  const { xs = 1, sm, md, lg, xl } = columns;

  // Convert column counts to MUI Grid size (12-column system)
  const toGridSize = (cols: number) => Math.round(12 / cols) as 1 | 2 | 3 | 4 | 6 | 12;

  return (
    <Grid container spacing={spacing} sx={sx}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Grid
              key={i}
              size={{
                xs: toGridSize(xs),
                ...(sm !== undefined && { sm: toGridSize(sm) }),
                ...(md !== undefined && { md: toGridSize(md) }),
                ...(lg !== undefined && { lg: toGridSize(lg) }),
                ...(xl !== undefined && { xl: toGridSize(xl) }),
              }}
            >
              {child}
            </Grid>
          ))
        : <Grid size={12}>{children}</Grid>}
    </Grid>
  );
}
