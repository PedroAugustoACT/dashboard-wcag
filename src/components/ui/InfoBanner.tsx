/**
 * InfoBanner — contextual alert / banner for dashboard pages.
 *
 * SERVER COMPONENT: purely presentational.
 *
 * @example
 * ```tsx
 * <InfoBanner
 *   message="This dataset contains 14,659 WCAG violations from 404 scanned pages."
 *   severity="info"
 * />
 * <InfoBanner
 *   message="Model accuracy is 100% — verify this is not overfitting."
 *   severity="warning"
 * />
 * ```
 */

import { Alert } from '@mui/material';
import type { InfoBannerProps } from '@/types';

export function InfoBanner({
  message,
  severity = 'info',
  icon,
  sx,
}: InfoBannerProps) {
  return (
    <Alert
      severity={severity}
      icon={icon}
      sx={{
        borderRadius: 2,
        fontSize: '0.8125rem',
        ...sx,
      }}
    >
      {message}
    </Alert>
  );
}
