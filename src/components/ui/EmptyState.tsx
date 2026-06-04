/**
 * EmptyState — placeholder shown when no data is available.
 *
 * SERVER COMPONENT: purely presentational, no interactivity.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   message="No violations found"
 *   description="Try adjusting your filters."
 *   icon={<SearchOffIcon />}
 * />
 * ```
 */

import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import type { EmptyStateProps } from '@/types';

export function EmptyState({
  message = 'No data available',
  description,
  icon,
  sx,
}: EmptyStateProps) {
  return (
    <Box
      role="status"
      aria-label={message}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        py: 6,
        px: 3,
        textAlign: 'center',
        color: 'text.disabled',
        ...sx,
      }}
    >
      <Box aria-hidden="true" sx={{ '& svg': { fontSize: 48, opacity: 0.35 } }}>
        {icon ?? <InboxIcon />}
      </Box>

      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: 'text.secondary', mb: description ? 0.5 : 0 }}
        >
          {message}
        </Typography>

        {description && (
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
