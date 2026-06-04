'use client';

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { ChartContainer } from '@/components/ui';
import type { DistribuicaoSeveridade } from '@/types';
import { severityColor, severityLabel } from '@/lib/transformers';
import { getTooltipProps } from '@/lib/chart-utils';

interface SeverityDistributionChartProps {
  data: DistribuicaoSeveridade[];
  loading?: boolean;
}

export function SeverityDistributionChart({ data, loading }: SeverityDistributionChartProps) {
  const theme = useTheme();
  const hasData = data && data.length > 0;

  const chartData = useMemo(() =>
    (data || []).map((item) => ({
      name: severityLabel(item.severidade),
      value: item.count,
      color: severityColor(item.severidade),
    })),
  [data]);

  return (
    <ChartContainer
      title="Distribuição por Severidade"
      description="Violações classificadas por nível de severidade WCAG"
      loading={loading}
      hasData={hasData}
      height={320}
      aria-label="Gráfico de pizza: distribuição de violações por severidade"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            stroke={theme.palette.background.paper}
            strokeWidth={2}
            aria-label="Fatias do gráfico de pizza por severidade"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip {...getTooltipProps(theme)} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
