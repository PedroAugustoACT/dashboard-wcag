/**
 * chart-utils.ts — Shared Recharts theming utilities.
 *
 * Centralizes the repeated contentStyle/itemStyle pattern used across
 * all chart Tooltip components. Call these helpers inside 'use client'
 * chart components that already have access to the MUI theme.
 */

import type { Theme } from '@mui/material/styles';

/** Returns the contentStyle and itemStyle props for a Recharts <Tooltip />. */
export function getTooltipProps(theme: Theme) {
  return {
    contentStyle: {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      borderRadius: theme.shape.borderRadius,
    },
    itemStyle: { color: theme.palette.text.primary },
  } as const;
}

/** Returns standard axis tick and line props for Recharts axes. */
export function getAxisProps(theme: Theme) {
  return {
    tick: { fill: theme.palette.text.secondary, fontSize: 12 },
    tickLine: false as const,
    axisLine: { stroke: theme.palette.divider },
  } as const;
}

/** Returns the standard cursor fill for bar chart Tooltips. */
export function getBarCursorProps(theme: Theme) {
  return { cursor: { fill: theme.palette.action.hover } } as const;
}
