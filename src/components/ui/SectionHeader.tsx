/**
 * SectionHeader — Consistent heading block for dashboard sections.
 *
 * SERVER COMPONENT: purely presentational.
 *
 * Features:
 * - Optional left accent bar (color stripe)
 * - Title + description layout
 * - Right-side actions slot
 * - Flexible heading level (h1–h4 for correct semantics per page)
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="WCAG Violation Analysis"
 *   description="Top violations across 404 scanned sites"
 *   headingLevel="h1"
 *   accent
 *   actions={<RefreshButton />}
 * />
 * ```
 */

import { Box, Divider, Typography } from '@mui/material';
import type { SectionHeaderProps } from '@/types';

export function SectionHeader({
  title,
  description,
  actions,
  headingLevel = 'h2',
  accent = false,
  sx,
}: SectionHeaderProps) {
  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          mb: description ? 0.5 : 0,
        }}
      >
        {/* Title with optional left accent */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
          {accent && (
            <Box
              aria-hidden="true"
              sx={{
                width: 4,
                height: 28,
                borderRadius: 2,
                flexShrink: 0,
                background: (t) =>
                  `linear-gradient(180deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
              }}
            />
          )}

          <Typography
            variant={headingLevel === 'h1' ? 'h2' : headingLevel}
            component={headingLevel}
            sx={{ fontWeight: 700, lineHeight: 1.3 }}
          >
            {title}
          </Typography>
        </Box>

        {/* Right-side actions */}
        {actions && (
          <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
            {actions}
          </Box>
        )}
      </Box>

      {description && (
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', pl: accent ? 2.5 : 0 }}
        >
          {description}
        </Typography>
      )}

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
