/**
 * PageContainer — consistent max-width wrapper for dashboard pages.
 *
 * SERVER COMPONENT: no interactivity; purely a layout primitive.
 * Note: Does NOT render <main>. The <main> landmark is provided by
 * DashboardShell to avoid duplicate landmarks on the same page.
 *
 * @example
 * ```tsx
 * export default function ViolationsPage() {
 *   return (
 *     <PageContainer>
 *       <PageHeader title="Violações" />
 *       <DashboardGrid>...</DashboardGrid>
 *     </PageContainer>
 *   );
 * }
 * ```
 */

import { Box } from '@mui/material';
import type { PageContainerProps } from '@/types';

export function PageContainer({
  children,
  maxWidth = '100%',
  sx,
}: PageContainerProps) {
  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        maxWidth,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2.5, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
