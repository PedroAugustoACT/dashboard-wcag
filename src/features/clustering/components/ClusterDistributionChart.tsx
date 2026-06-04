'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { ChartContainer } from '@/components/ui';
import { getTooltipProps, getBarCursorProps } from '@/lib/chart-utils';

const CLUSTER_COLORS = [
  '#3b82f6', '#ef4444', '#22c55e', '#eab308', '#a855f7',
];

interface ClusterDistributionProps {
  data: { cluster: number; count: number }[];
  loading?: boolean;
}

export function ClusterDistributionChart({ data, loading }: ClusterDistributionProps) {
  const theme = useTheme();
  const hasData = data && data.length > 0;

  return (
    <ChartContainer
      title="Distribuição dos Clusters"
      description="Número de domínios atribuídos a cada cluster"
      loading={loading}
      hasData={hasData}
      height={400}
      aria-label="Gráfico de barras: quantidade de domínios por cluster"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
          <XAxis
            dataKey="cluster"
            tickFormatter={(val) => `Cluster ${val}`}
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
            labelFormatter={(val) => `Cluster ${val}`}
          />
          <Bar dataKey="count" name="Domínios" radius={[4, 4, 0, 0]}>
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CLUSTER_COLORS[entry.cluster % CLUSTER_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
