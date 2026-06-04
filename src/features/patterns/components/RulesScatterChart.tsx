'use client';

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { ChartContainer } from '@/components/ui';
import type { RegraAssociacao } from '@/types';
import { parseFromFrozenset } from '@/lib/transformers';
import { getTooltipProps } from '@/lib/chart-utils';

interface RulesScatterChartProps {
  data: RegraAssociacao[];
  loading?: boolean;
}

export function RulesScatterChart({ data, loading }: RulesScatterChartProps) {
  const theme = useTheme();
  const hasData = data && data.length > 0;

  const chartData = useMemo(() =>
    data.map((d) => {
      const ant = parseFromFrozenset(d.antecedents).join(', ');
      const con = parseFromFrozenset(d.consequents).join(', ');
      return {
        name: `${ant} → ${con}`,
        support: d.support,
        confidence: d.confidence,
        lift: d.lift,
      };
    }),
  [data]);

  return (
    <ChartContainer
      title="Suporte vs. Confiança"
      description="O tamanho das bolhas representa o Lift (força da associação)"
      loading={loading}
      hasData={hasData}
      height={400}
      aria-label="Gráfico de dispersão: suporte versus confiança das regras de associação, com tamanho proporcional ao lift"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            type="number"
            dataKey="support"
            name="Suporte"
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
          />
          <YAxis
            type="number"
            dataKey="confidence"
            name="Confiança"
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
          />
          <ZAxis type="number" dataKey="lift" range={[50, 400]} name="Lift" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            {...getTooltipProps(theme)}
            formatter={(value: any, name: any) => [Number(value).toFixed(4), name]}
            labelFormatter={() => ''}
          />
          <Scatter
            name="Regras de Associação"
            data={chartData}
            fill={theme.palette.primary.main}
            opacity={0.7}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
