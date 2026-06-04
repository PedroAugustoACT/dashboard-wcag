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
import type { RedeCoocorrencia } from '@/types';
import { getTooltipProps, getBarCursorProps } from '@/lib/chart-utils';

interface CooccurrenceChartProps {
  data: RedeCoocorrencia[];
  loading?: boolean;
}

export function CooccurrenceChart({ data, loading }: CooccurrenceChartProps) {
  const theme = useTheme();
  const hasData = data && data.length > 0;

  const chartData = useMemo(() =>
    [...data]
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 15)
      .map(d => ({
        name: `${d.source} ↔ ${d.target}`,
        weight: d.weight,
      })),
  [data]);

  return (
    <ChartContainer
      title="Co-ocorrências de Violações"
      description="Pares de violações que ocorrem juntos com maior frequência"
      loading={loading}
      hasData={hasData}
      height={400}
      aria-label="Gráfico de barras horizontais: co-ocorrências mais frequentes de violações WCAG"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 100, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: theme.palette.divider }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={150}
          />
          <Tooltip
            {...getBarCursorProps(theme)}
            {...getTooltipProps(theme)}
          />
          <Bar dataKey="weight" name="Peso da Co-ocorrência" fill={theme.palette.secondary.main} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
