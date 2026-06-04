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
import type { TopDominio } from '@/types';
import { getTooltipProps, getBarCursorProps } from '@/lib/chart-utils';

interface TopDomainsChartProps {
  data: TopDominio[];
  loading?: boolean;
}

export function TopDomainsChart({ data, loading }: TopDomainsChartProps) {
  const theme = useTheme();
  const hasData = data && data.length > 0;

  const chartData = useMemo(() =>
    (data || []).slice(0, 10).map((item) => ({
      name: item.dominio,
      count: item.count,
    })),
  [data]);

  return (
    <ChartContainer
      title="Top 10 Domínios Problemáticos"
      description="Domínios com maior número de violações WCAG detectadas"
      loading={loading}
      hasData={hasData}
      height={320}
      aria-label="Gráfico de barras: domínios com mais violações WCAG"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: theme.palette.divider }}
            tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}…` : value}
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
          <Bar dataKey="count" name="Violações" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
