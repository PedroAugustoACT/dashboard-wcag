'use client';

import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Card, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getDataGridSx, DATAGRID_TOOLBAR_PROPS } from '@/lib/datagrid-styles';

interface ClusterSummaryDataGridProps {
  data: {
    cluster: number;
    count: number;
    avgTotalErros: number;
    avgDiversidade: number;
  }[];
}

export function ClusterSummaryDataGrid({ data }: ClusterSummaryDataGridProps) {
  const theme = useTheme();

  const columns: GridColDef[] = [
    { field: 'cluster', headerName: 'Cluster', width: 120, valueFormatter: (value) => `Cluster ${value}` },
    { field: 'count', headerName: 'Qtd. Domínios', width: 150, type: 'number' },
    { field: 'avgTotalErros', headerName: 'Média de Erros', flex: 1, type: 'number', valueFormatter: (value: number) => value.toFixed(2) },
    { field: 'avgDiversidade', headerName: 'Diversidade de Regras', flex: 1, type: 'number', valueFormatter: (value: number) => value.toFixed(2) },
  ];

  const rows = data.map((row) => ({ id: row.cluster, ...row }));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={<Typography variant="h5" sx={{ fontWeight: 600 }}>Perfis dos Clusters</Typography>}
        subheader="Médias de erros e diversidade de regras por cluster"
      />
      <Divider />
      <Box sx={{ height: 350, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={DATAGRID_TOOLBAR_PROPS}
          hideFooterPagination
          disableRowSelectionOnClick
          localeText={{ toolbarQuickFilterPlaceholder: 'Buscar…', noRowsLabel: 'Nenhum dado disponível' }}
          sx={getDataGridSx(theme)}
        />
      </Box>
    </Card>
  );
}
