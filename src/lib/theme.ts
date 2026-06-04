/**
 * Material UI Theme — WCAG Accessibility Dashboard
 *
 * Dark-mode-first professional theme with:
 * - Deep navy/slate palette for scientific data context
 * - Severity-mapped accent colors from the dataset
 * - Inter font for modern readability
 * - Polished component overrides
 */

import { createTheme } from '@mui/material/styles';

// ---------------------------------------------------------------------------
// Palette tokens
// ---------------------------------------------------------------------------

const colors = {
  // Backgrounds
  bg: {
    default: '#0b0f1a',
    paper:   '#111827',
    surface: '#1a2235',
    elevated:'#1e2d45',
    border:  '#1f2d40',
  },
  // Primary accent — electric blue
  primary: {
    main:  '#3b82f6',
    light: '#60a5fa',
    dark:  '#1d4ed8',
  },
  // Secondary accent — cyan/teal
  secondary: {
    main:  '#06b6d4',
    light: '#22d3ee',
    dark:  '#0891b2',
  },
  // Severity colors — shared with data-transformers
  severity: {
    critico:  '#ef4444',
    serio:    '#f97316',
    moderado: '#eab308',
    menor:    '#3b82f6',
  },
  // Text
  text: {
    primary:   '#f1f5f9',
    secondary: '#94a3b8',
    disabled:  '#475569',
  },
} as const;

// ---------------------------------------------------------------------------
// Theme definition
// ---------------------------------------------------------------------------

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.bg.default,
      paper:   colors.bg.paper,
    },
    primary: {
      main:  colors.primary.main,
      light: colors.primary.light,
      dark:  colors.primary.dark,
    },
    secondary: {
      main:  colors.secondary.main,
      light: colors.secondary.light,
      dark:  colors.secondary.dark,
    },
    error:   { main: colors.severity.critico },
    warning: { main: colors.severity.serio },
    info:    { main: colors.primary.main },
    success: { main: '#22c55e' },
    text: {
      primary:   colors.text.primary,
      secondary: colors.text.secondary,
      disabled:  colors.text.disabled,
    },
    divider: colors.bg.border,
  },

  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '2rem',    fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 },
    h2: { fontSize: '1.5rem',  fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3 },
    h3: { fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.4 },
    h4: { fontSize: '1.125rem',fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1rem',    fontWeight: 600, lineHeight: 1.5 },
    h6: { fontSize: '0.875rem',fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '0.875rem', lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.6, color: colors.text.secondary },
    caption: { fontSize: '0.75rem',  color: colors.text.secondary, letterSpacing: '0.02em' },
    overline: { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' },
    subtitle1: { fontSize: '0.875rem',  fontWeight: 500 },
    subtitle2: { fontSize: '0.8125rem', fontWeight: 500, color: colors.text.secondary },
  },

  shape: { borderRadius: 10 },

  spacing: 8,

  // ---------------------------------------------------------------------------
  // Component overrides
  // ---------------------------------------------------------------------------
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': { boxSizing: 'border-box' },
        html: { height: '100%', scrollBehavior: 'smooth' },
        body: {
          height: '100%',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.bg.paper,
          border: `1px solid ${colors.bg.border}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
          transition: 'box-shadow 200ms ease, border-color 200ms ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            borderColor: colors.bg.elevated,
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.bg.paper,
          border: `1px solid ${colors.bg.border}`,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: colors.bg.border },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 24,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'background-color 150ms ease',
        },
      },
    },

    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bg.surface,
          '&::after': {
            background: `linear-gradient(90deg, transparent, ${colors.bg.elevated}, transparent)`,
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: colors.bg.border,
          fontSize: '0.8125rem',
        },
        head: {
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: colors.text.secondary,
          backgroundColor: colors.bg.surface,
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: `${colors.bg.surface}80`,
          },
          '&:last-child td': { border: 0 },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bg.surface,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.bg.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.main,
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.bg.elevated,
          border: `1px solid ${colors.bg.border}`,
          fontSize: '0.75rem',
          fontWeight: 400,
          maxWidth: 320,
        },
        arrow: { color: colors.bg.elevated },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: colors.bg.border,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderRadius: 10,
        },
      },
    },
  },
});

// ---------------------------------------------------------------------------
// Exported design tokens (for use in sx props)
// ---------------------------------------------------------------------------

export const severityColors = {
  critico:  colors.severity.critico,
  serio:    colors.severity.serio,
  moderado: colors.severity.moderado,
  menor:    colors.severity.menor,
} as const;

export const bgColors = colors.bg;
