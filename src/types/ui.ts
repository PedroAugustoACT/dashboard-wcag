/**
 * Shared UI component prop types.
 *
 * Used across all reusable dashboard components
 * to ensure consistent prop patterns.
 */

import type { ReactNode, ElementType } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import type { Severidade } from './data';

// ---------------------------------------------------------------------------
// Generic prop patterns
// ---------------------------------------------------------------------------

/** Any component that accepts MUI `sx` and custom `className`. */
export interface StyledProps {
  sx?: SxProps<Theme>;
  className?: string;
}

/** Any component that wraps children. */
export interface WithChildren {
  children: ReactNode;
}

/** Loading-aware component. */
export interface LoadingProps {
  loading?: boolean;
}

/** Any component with an optional accessible label override. */
export interface AriaProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// ---------------------------------------------------------------------------
// KPI Card types
// ---------------------------------------------------------------------------

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface KpiCardProps extends StyledProps, AriaProps {
  /** Card title / metric name */
  title: string;
  /** Primary value to display */
  value: string | number;
  /** Supporting subtitle below value */
  subtitle?: string;
  /** Optional trend indicator */
  trend?: {
    direction: TrendDirection;
    label: string;
  };
  /** MUI icon component to render in the icon slot */
  icon?: ReactNode;
  /** Accent color for the icon background */
  accentColor?: string;
  /** Whether the card is in a loading state */
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Chart container types
// ---------------------------------------------------------------------------

export interface ChartContainerProps extends StyledProps {
  /** Chart title rendered in the header */
  title: string;
  /** Optional description / subtitle */
  description?: string;
  /** Height of the chart area in px */
  height?: number;
  /** Actions rendered in the top-right of the card header */
  actions?: ReactNode;
  /** Child content (the actual chart) */
  children: ReactNode;
  /** Loading skeleton overlay */
  loading?: boolean;
  /** Empty-state message when no data is available */
  emptyMessage?: string;
  /** Whether there is data to display (controls empty state) */
  hasData?: boolean;
  /** Accessible label for the chart (for screen readers) */
  'aria-label'?: string;
}

// ---------------------------------------------------------------------------
// Page / section container types
// ---------------------------------------------------------------------------

export interface PageContainerProps extends StyledProps {
  children: ReactNode;
  /** Max-width constraint */
  maxWidth?: string | number;
}

export interface SectionHeaderProps extends StyledProps {
  /** Main heading text */
  title: string;
  /** Optional subtitle/description */
  description?: string;
  /** Right-side actions slot */
  actions?: ReactNode;
  /** Heading level (semantic HTML) */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4';
  /** Decorative left accent bar */
  accent?: boolean;
}

// ---------------------------------------------------------------------------
// Grid types
// ---------------------------------------------------------------------------

export interface DashboardGridProps extends StyledProps {
  children: ReactNode;
  /** Number of columns at each breakpoint */
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Spacing between grid items */
  spacing?: number;
}

// ---------------------------------------------------------------------------
// Stat row / metric strip types
// ---------------------------------------------------------------------------

export interface StatRowItem {
  label: string;
  value: string | number;
  color?: string;
}

export interface StatRowProps extends StyledProps {
  items: StatRowItem[];
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
  count?: number;
}

export interface ChipFilterGroupProps<T extends string = string> extends StyledProps {
  label: string;
  options: FilterOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  multiple?: boolean;
}

export interface SelectFilterProps<T extends string = string> extends StyledProps {
  label: string;
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'small' | 'medium';
}

// ---------------------------------------------------------------------------
// Table types
// ---------------------------------------------------------------------------

export interface TableColumn<T> {
  /** Unique key */
  id: string;
  /** Display header label */
  label: string;
  /** Row data accessor — key or function */
  accessor: keyof T | ((row: T) => ReactNode);
  /** Text alignment */
  align?: 'left' | 'right' | 'center';
  /** Column width (CSS value) */
  width?: string | number;
  /** Enable sorting */
  sortable?: boolean;
}

export interface DataTableProps<T> extends StyledProps {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Data rows */
  rows: T[];
  /** Key extractor for rows */
  getRowKey: (row: T) => string;
  /** Max visible rows before scroll */
  maxHeight?: number;
  /** Loading skeleton */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Caption for accessibility */
  caption?: string;
}

// ---------------------------------------------------------------------------
// Severity badge types
// ---------------------------------------------------------------------------

export interface SeverityBadgeProps extends StyledProps {
  severity: Severidade;
  size?: 'small' | 'medium';
}

// ---------------------------------------------------------------------------
// Empty state types
// ---------------------------------------------------------------------------

export interface EmptyStateProps extends StyledProps {
  /** Main message */
  message?: string;
  /** Supporting description */
  description?: string;
  /** Optional icon override */
  icon?: ReactNode;
}

// ---------------------------------------------------------------------------
// Alert banner types
// ---------------------------------------------------------------------------

export interface InfoBannerProps extends StyledProps {
  message: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
}
