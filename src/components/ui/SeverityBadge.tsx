/**
 * SeverityBadge — colored chip for WCAG severity levels.
 *
 * SERVER COMPONENT: purely presentational.
 *
 * Maps Portuguese severity values to styled chips with
 * consistent colors across the entire dashboard.
 *
 * @example
 * ```tsx
 * <SeverityBadge severity="critico" />
 * <SeverityBadge severity="serio" size="small" />
 * ```
 */

import { Chip } from '@mui/material';
import type { SeverityBadgeProps, Severidade } from '@/types';

// ---------------------------------------------------------------------------
// Severity display config
// ---------------------------------------------------------------------------

const SEVERITY_CONFIG: Record<
  Severidade,
  { label: string; color: string; bg: string }
> = {
  critico:  { label: 'Critical',  color: '#ef4444', bg: '#ef444420' },
  serio:    { label: 'Serious',   color: '#f97316', bg: '#f9731620' },
  moderado: { label: 'Moderate',  color: '#eab308', bg: '#eab30820' },
  menor:    { label: 'Minor',     color: '#3b82f6', bg: '#3b82f620' },
};

export function SeverityBadge({ severity, size = 'small', sx }: SeverityBadgeProps) {
  const config = SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.moderado;

  return (
    <Chip
      label={config.label}
      size={size}
      aria-label={`Severity: ${config.label}`}
      sx={{
        fontWeight: 600,
        fontSize: size === 'small' ? '0.7rem' : '0.75rem',
        height: size === 'small' ? 20 : 24,
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.color}40`,
        '& .MuiChip-label': { px: 1 },
        ...sx,
      }}
    />
  );
}
