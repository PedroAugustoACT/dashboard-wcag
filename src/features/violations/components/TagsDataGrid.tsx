'use client';

import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Card, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { TopTagHtml } from '@/types';
import { getDataGridSx, DATAGRID_TOOLBAR_PROPS } from '@/lib/datagrid-styles';

interface TagsDataGridProps {
  data: TopTagHtml[];
}

export function TagsDataGrid({ data }: TagsDataGridProps) {
  const theme = useTheme();

  const columns: GridColDef[] = [
    { field: 'tag_html', headerName: 'Tag HTML', flex: 1, minWidth: 150 },
    { field: 'count', headerName: 'Violações', width: 150, type: 'number' },
  ];

  const rows = data.map((row, index) => ({ id: index, ...row }));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={<Typography variant="h5" sx={{ fontWeight: 600 }}>Análise por Tag HTML</Typography>}
        subheader="Elementos HTML com maior incidência de violações"
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
