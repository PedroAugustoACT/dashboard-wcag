'use client';

import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Card, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { ClassificationReportRow } from '@/types';
import { getDataGridSx, DATAGRID_TOOLBAR_PROPS } from '@/lib/datagrid-styles';

interface ClassificationReportTableProps {
  data: ClassificationReportRow[];
}

export function ClassificationReportTable({ data }: ClassificationReportTableProps) {
  const theme = useTheme();

  const columns: GridColDef[] = [
    { field: 'label', headerName: 'Classe / Métrica', flex: 1 },
    { field: 'precision', headerName: 'Precisão', width: 130, type: 'number', valueFormatter: (value) => Number(value).toFixed(3) },
    { field: 'recall', headerName: 'Revocação', width: 130, type: 'number', valueFormatter: (value) => Number(value).toFixed(3) },
    { field: 'f1_score', headerName: 'F1-Score', width: 130, type: 'number', valueFormatter: (value) => Number(value).toFixed(3) },
    { field: 'support', headerName: 'Suporte', width: 120, type: 'number' },
  ];

  const rows = data.map((row, index) => ({ id: index, ...row }));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={<Typography variant="h5" sx={{ fontWeight: 600 }}>Relatório de Classificação</Typography>}
        subheader="Desempenho detalhado do modelo por classe"
      />
      <Divider />
      <Box sx={{ height: 350, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          slots={{ toolbar: GridToolbar }}
          slotProps={DATAGRID_TOOLBAR_PROPS}
          disableRowSelectionOnClick
          localeText={{ toolbarQuickFilterPlaceholder: 'Buscar…', noRowsLabel: 'Nenhum dado disponível' }}
          sx={getDataGridSx(theme)}
        />
      </Box>
    </Card>
  );
}
