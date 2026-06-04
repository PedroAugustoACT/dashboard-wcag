'use client';

/**
 * SidebarNav — Navigation items renderer inside the Sidebar.
 *
 * CLIENT COMPONENT: uses usePathname() for active state.
 *
 * Renders groups of navigation links with icons.
 * Active item is highlighted via primary color.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import type { NavigationSection } from '@/types';

interface SidebarNavProps {
  sections: NavigationSection[];
  collapsed: boolean;
}

export function SidebarNav({ sections, collapsed }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      aria-label="Main navigation"
      sx={{ flex: 1, overflow: 'auto', py: 1 }}
    >
      {sections.map((section, sIdx) => (
        <Box key={section.title} sx={{ mb: 0.5 }}>
          {/* Section label — hidden when collapsed */}
          {!collapsed && (
            <Typography
              variant="overline"
              sx={{
                px: 2,
                py: 0.5,
                display: 'block',
                color: 'text.disabled',
                letterSpacing: '0.1em',
                fontSize: '0.65rem',
              }}
            >
              {section.title}
            </Typography>
          )}

          <List dense disablePadding>
            {section.items.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);

              const button = (
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.25,
                    minHeight: 40,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: collapsed ? 1 : 1.5,
                    transition: 'all 150ms ease',
                    // ── Focus-visible ring — always visible for keyboard users ──
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'primary.light',
                      outlineOffset: '2px',
                    },
                    // ── Selected state ──
                    // Uses a tinted background so primary.light text (≥4.5:1 vs #111827)
                    // is readable in both dark and light contexts.
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(59,130,246,0.18)', // primary.main @ 18%
                      color: 'primary.light',
                      '& .MuiListItemIcon-root': { color: 'primary.light' },
                      '&:hover': {
                        backgroundColor: 'rgba(59,130,246,0.26)', // slightly stronger on hover
                        color: 'primary.light',
                        '& .MuiListItemIcon-root': { color: 'primary.light' },
                      },
                      '&:focus-visible': {
                        outlineColor: 'primary.light',
                      },
                    },
                    // ── Unselected state ──
                    '&:not(.Mui-selected)': {
                      color: 'text.secondary',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        color: 'text.primary',
                        '& .MuiListItemIcon-root': { color: 'primary.light' },
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 0 : 36,
                      justifyContent: 'center',
                      color: 'inherit',
                      '& svg': { fontSize: 20 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {!collapsed && (
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: isActive ? 600 : 400 }}
                          noWrap
                        >
                          {item.label}
                        </Typography>
                      }
                    />
                  )}
                </ListItemButton>
              );

              return (
                <li key={item.href} style={{ listStyle: 'none' }}>
                  {collapsed ? (
                    <Tooltip title={item.label} placement="right" arrow>
                      <span>{button}</span>
                    </Tooltip>
                  ) : (
                    button
                  )}
                </li>
              );
            })}
          </List>

          {sIdx < sections.length - 1 && (
            <Divider sx={{ mx: 2, my: 1 }} />
          )}
        </Box>
      ))}
    </Box>
  );
}
