/**
 * datagrid-styles.ts — Shared MUI DataGrid sx styles.
 *
 * Centralizes the repeated DataGrid border/cell/header styling
 * used across all DataGrid components in the dashboard.
 */

import type { Theme } from '@mui/material/styles';

/** Returns the shared sx style object for all DataGrid instances. */
export function getDataGridSx(theme: Theme) {
  return {
    border: 'none',
    '& .MuiDataGrid-cell': { borderColor: theme.palette.divider },
    '& .MuiDataGrid-columnHeaders': {
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.default,
    },
    '& .MuiDataGrid-footerContainer': { borderColor: theme.palette.divider },
  } as const;
}

/** Shared slotProps for GridToolbar with debounced quick filter. */
export const DATAGRID_TOOLBAR_PROPS = {
  toolbar: {
    showQuickFilter: true,
    quickFilterProps: { debounceMs: 500 },
  },
} as const;
