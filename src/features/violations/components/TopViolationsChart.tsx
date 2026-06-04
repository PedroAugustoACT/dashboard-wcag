'use client';

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { ChartContainer } from '@/components/ui';
import type { TopViolacao } from '@/types';
import { getTooltipProps, getBarCursorProps } from '@/lib/chart-utils';

interface TopViolationsChartProps {
  data: TopViolacao[];
  loading?: boolean;
}

export function TopViolationsChart({ data, loading }: TopViolationsChartProps) {
  const theme = useTheme();
  const hasData = data && data.length > 0;

  const chartData = useMemo(() => (data || []).slice(0, 15), [data]);

  return (
    <ChartContainer
      title="Top 15 Violações WCAG"
      description="Erros de acessibilidade mais frequentes em todas as páginas analisadas"
      loading={loading}
      hasData={hasData}
      height={360}
      aria-label="Gráfico de barras: as 15 violações WCAG mais frequentes"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
          <XAxis
            dataKey="regra_wcag_id"
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: theme.palette.divider }}
          />
          <YAxis
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            {...getBarCursorProps(theme)}
            {...getTooltipProps(theme)}
          />
          <Bar dataKey="count" name="Violações" fill={theme.palette.secondary.main} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
