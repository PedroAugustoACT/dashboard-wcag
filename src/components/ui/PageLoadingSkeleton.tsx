import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Shared full-page loading skeleton used by all route loading.tsx files.
 * Renders while Server Component data is being fetched.
 */
export function PageLoadingSkeleton({ label }: { label?: string }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minHeight: 400,
      }}
      role="status"
      aria-label={label ?? 'Carregando dados…'}
    >
      <CircularProgress size={40} thickness={4} />
      <Typography variant="body2" color="text.secondary">
        {label ?? 'Carregando dados…'}
      </Typography>
    </Box>
  );
}
