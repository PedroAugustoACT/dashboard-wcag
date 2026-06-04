'use client';

import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Card, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { RegraAssociacao } from '@/types';
import { parseFromFrozenset } from '@/lib/transformers';
import { getDataGridSx, DATAGRID_TOOLBAR_PROPS } from '@/lib/datagrid-styles';

interface RulesDataGridProps {
  data: RegraAssociacao[];
}

export function RulesDataGrid({ data }: RulesDataGridProps) {
  const theme = useTheme();

  const columns: GridColDef[] = [
    { field: 'antecedents', headerName: 'Antecedentes', flex: 1, minWidth: 200 },
    { field: 'consequents', headerName: 'Consequentes', flex: 1, minWidth: 200 },
    { field: 'support', headerName: 'Suporte', width: 120, type: 'number', valueFormatter: (value) => Number(value).toFixed(4) },
    { field: 'confidence', headerName: 'Confiança', width: 120, type: 'number', valueFormatter: (value) => Number(value).toFixed(4) },
    { field: 'lift', headerName: 'Lift', width: 120, type: 'number', valueFormatter: (value) => Number(value).toFixed(4) },
  ];

  const rows = data.map((row, index) => ({
    id: index,
    antecedents: parseFromFrozenset(row.antecedents).join(', '),
    consequents: parseFromFrozenset(row.consequents).join(', '),
    support: row.support,
    confidence: row.confidence,
    lift: row.lift,
  }));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={<Typography variant="h5" sx={{ fontWeight: 600 }}>Tabela de Regras de Associação</Typography>}
        subheader="Visualização detalhada das regras descobertas e suas métricas"
      />
      <Divider />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={DATAGRID_TOOLBAR_PROPS}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          localeText={{ toolbarQuickFilterPlaceholder: 'Buscar…', noRowsLabel: 'Nenhum dado disponível', footerRowSelected: (count) => `${count} linha(s) selecionada(s)` }}
          sx={getDataGridSx(theme)}
        />
      </Box>
    </Card>
  );
}
