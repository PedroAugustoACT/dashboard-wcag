import React from 'react';
import { Box, Skeleton } from '@mui/material';

export function LoadingSkeleton() {
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, width: '100%' }}>
      {/* Header Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width="40%" height={60} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={24} />
      </Box>

      {/* Grid Skeleton */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Box key={i} sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 250 }}>
             <Skeleton variant="rounded" height={130} />
          </Box>
        ))}
      </Box>

      {/* Large Content Area Skeleton */}
      <Box sx={{ mt: 3, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
         <Box sx={{ flex: '1 1 calc(66% - 24px)', minWidth: 300 }}>
             <Skeleton variant="rounded" height={400} />
         </Box>
         <Box sx={{ flex: '1 1 calc(33% - 24px)', minWidth: 250 }}>
             <Skeleton variant="rounded" height={400} />
         </Box>
      </Box>
    </Box>
  );
}
