'use client';

import React from 'react';
import { Box, Drawer, useTheme, useMediaQuery, Typography } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { SidebarNav } from './SidebarNav';
import { navigation } from '@/lib/navigation';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  width?: number;
  collapsedWidth?: number;
}

export function Sidebar({
  open,
  onClose,
  width = 240,
  collapsedWidth = 64,
}: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand Header */}
      <Box
        sx={{
          height: { xs: 56, sm: 64 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: (!isMobile && !open) ? 'center' : 'flex-start',
          px: (!isMobile && !open) ? 0 : 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <AccessibilityNewIcon sx={{ color: 'primary.main', fontSize: 28, mr: (!isMobile && !open) ? 0 : 1.5 }} />
        {(!isMobile && !open) ? null : (
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            WCAG Analytics
          </Typography>
        )}
      </Box>

      {/* Navigation */}
      <SidebarNav sections={navigation} collapsed={!isMobile && !open} />
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: open ? width : collapsedWidth },
        flexShrink: { md: 0 },
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={isMobile ? open : false}
        onClose={onClose}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width,
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: open ? width : collapsedWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open={open}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
