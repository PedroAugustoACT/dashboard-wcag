'use client';

import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  // Default to open on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync state when screen size changes
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        width={240} 
        collapsedWidth={64} 
      />

      {/* Main Content Wrapper */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0, // important for flex layouts to not overflow
        }}
      >
        {/* Topbar */}
        <Topbar 
          sidebarOpen={sidebarOpen} 
          onToggleSidebar={handleToggleSidebar} 
          sidebarWidth={240} 
        />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: { xs: '56px', sm: '64px' }, // offset for Topbar
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
