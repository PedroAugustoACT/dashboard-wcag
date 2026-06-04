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
import type { FeatureImportante } from '@/types';
import { getTooltipProps, getBarCursorProps } from '@/lib/chart-utils';

interface FeatureImportanceChartProps {
  data: FeatureImportante[];
  loading?: boolean;
}

export function FeatureImportanceChart({ data, loading }: FeatureImportanceChartProps) {
  const theme = useTheme();
  const hasData = data && data.length > 0;

  const chartData = useMemo(() =>
    [...data].sort((a, b) => b.importance - a.importance).slice(0, 10),
  [data]);

  return (
    <ChartContainer
      title="Importância das Violações"
      description="Top 10 regras WCAG com maior influência nas predições do modelo"
      loading={loading}
      hasData={hasData}
      height={400}
      aria-label="Gráfico de barras horizontais: importância das violações WCAG no modelo preditivo"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
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
            dataKey="regra_wcag_id"
            tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <Tooltip
            {...getBarCursorProps(theme)}
            {...getTooltipProps(theme)}
            formatter={(value: any) => Number(value).toFixed(4)}
          />
          <Bar dataKey="importance" name="Importância" fill={theme.palette.primary.main} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
