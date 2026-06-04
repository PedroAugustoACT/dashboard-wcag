import React from 'react';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface PageHeaderProps {
  title: string;
  description?: string;
  sx?: SxProps<Theme>;
}

export function PageHeader({ title, description, sx }: PageHeaderProps) {
  return (
    <Box sx={{ mb: 4, ...sx }}>
      <Typography variant="h1" sx={{ mb: description ? 1 : 0 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
}
