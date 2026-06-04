'use client';

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { ChartContainer } from '@/components/ui';
import type { PcaCluster } from '@/types';
import { getTooltipProps } from '@/lib/chart-utils';

interface PcaScatterChartProps {
  data: PcaCluster[];
  loading?: boolean;
}

const CLUSTER_COLORS = [
  '#3b82f6', // Cluster 0: azul
  '#ef4444', // Cluster 1: vermelho
  '#22c55e', // Cluster 2: verde
  '#eab308', // Cluster 3: amarelo
  '#a855f7', // Cluster 4: roxo
];

export function PcaScatterChart({ data, loading }: PcaScatterChartProps) {
  const theme = useTheme();
  const hasData = data && data.length > 0;

  const clusters = useMemo(
    () => Array.from(new Set(data?.map(d => d.cluster))).sort(),
    [data],
  );

  const clusterDataMap = useMemo(() => {
    const map: Record<number, PcaCluster[]> = {};
    for (const point of (data || [])) {
      if (!map[point.cluster]) map[point.cluster] = [];
      map[point.cluster].push(point);
    }
    return map;
  }, [data]);

  return (
    <ChartContainer
      title="Visualização PCA dos Clusters"
      description="Projeção 2D dos padrões de violações WCAG por domínio"
      loading={loading}
      hasData={hasData}
      height={400}
      aria-label="Gráfico de dispersão PCA: agrupamentos de domínios por padrão de violações WCAG"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            type="number"
            dataKey="pca_1"
            name="PCA 1"
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
          />
          <YAxis
            type="number"
            dataKey="pca_2"
            name="PCA 2"
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            {...getTooltipProps(theme)}
          />
          <Legend />
          {clusters.map((clusterId, index) => (
            <Scatter
              key={`cluster-${clusterId}`}
              name={`Cluster ${clusterId}`}
              data={clusterDataMap[clusterId] ?? []}
              fill={CLUSTER_COLORS[index % CLUSTER_COLORS.length]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
