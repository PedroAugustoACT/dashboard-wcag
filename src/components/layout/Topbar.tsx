'use client';

/**
 * Topbar — Dashboard application bar.
 *
 * CLIENT COMPONENT: needs sidebar toggle handler.
 *
 * Features:
 * - MUI AppBar with blur backdrop
 * - Hamburger/close toggle for sidebar
 * - Current page title (from props)
 * - Right-side slot for future actions (search, user avatar)
 */

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

interface TopbarProps {
  /** Whether the sidebar is currently open */
  sidebarOpen: boolean;
  /** Toggle handler */
  onToggleSidebar: () => void;
  /** Sidebar drawer width in px (for margin offset on desktop) */
  sidebarWidth?: number;
  /** Current page/section name displayed in topbar */
  pageTitle?: string;
}

export function Topbar({
  sidebarOpen,
  onToggleSidebar,
  sidebarWidth = 240,
  pageTitle = 'WCAG Dashboard',
}: TopbarProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(11,15,26,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundImage: 'none',
        width: { md: `calc(100% - ${sidebarOpen ? sidebarWidth : 64}px)` },
        ml: { md: `${sidebarOpen ? sidebarWidth : 64}px` },
        transition: (theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: { xs: 56, sm: 64 } }}>
        {/* Sidebar toggle */}
        <Tooltip title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'} arrow>
          <IconButton
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={sidebarOpen}
            aria-controls="dashboard-sidebar"
            size="medium"
            edge="start"
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
            {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Tooltip>

        {/* Page title */}
        <Typography
          variant="h6"
          component="p"
          sx={{
            flex: 1,
            fontWeight: 600,
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          aria-live="polite"
        >
          {pageTitle}
        </Typography>

        {/* Right-side actions slot (reserved for future use) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Future: Search, Notifications, User Avatar */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
