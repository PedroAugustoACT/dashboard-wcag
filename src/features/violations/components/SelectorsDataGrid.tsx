'use client';

import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Card, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { TopSelectorCss } from '@/types';
import { getDataGridSx, DATAGRID_TOOLBAR_PROPS } from '@/lib/datagrid-styles';

interface SelectorsDataGridProps {
  data: TopSelectorCss[];
}

export function SelectorsDataGrid({ data }: SelectorsDataGridProps) {
  const theme = useTheme();

  const columns: GridColDef[] = [
    { field: 'seletor_css', headerName: 'Seletor CSS', flex: 1, minWidth: 200 },
    { field: 'count', headerName: 'Violações', width: 150, type: 'number' },
  ];

  const rows = data.map((row, index) => ({ id: index, ...row }));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={<Typography variant="h5" sx={{ fontWeight: 600 }}>Análise por Seletor CSS</Typography>}
        subheader="Seletores CSS com maior incidência de violações de acessibilidade"
      />
      <Divider />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          slots={{ toolbar: GridToolbar }}
          slotProps={DATAGRID_TOOLBAR_PROPS}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          localeText={{ toolbarQuickFilterPlaceholder: 'Buscar…', noRowsLabel: 'Nenhum dado disponível', footerRowSelected: (count) => `${count} linha(s) selecionada(s)` }}
          sx={getDataGridSx(theme)}
        />
      </Box>
    </Card>
  );
}
