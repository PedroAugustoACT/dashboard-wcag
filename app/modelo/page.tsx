import React from 'react';
import { PageContainer, PageHeader, DashboardGrid, StatRow } from '@/components';
import {
  loadClassificationReport,
  loadConfusionMatrix,
  loadMetricasModelo,
  loadFeaturesImportantes,
} from '@/lib/loaders/ml-loaders';
import { FeatureImportanceChart } from '@/features/ml/components/FeatureImportanceChart';
import { ClassificationReportTable } from '@/features/ml/components/ClassificationReportTable';
import { ConfusionMatrixHeatmap } from '@/features/ml/components/ConfusionMatrixHeatmap';

export default async function ModeloPage() {
  const [report, matrix, metrics, features] = await Promise.all([
    loadClassificationReport(),
    loadConfusionMatrix(),
    loadMetricasModelo(),
    loadFeaturesImportantes(),
  ]);

  return (
    <PageContainer>
      <PageHeader
        title="Métricas do Modelo de ML"
        description="Avaliação de desempenho do modelo de classificação de violações WCAG."
      />

      <StatRow
        sx={{ mb: 4 }}
        items={[
          { label: 'Acurácia', value: `${(metrics.accuracy * 100).toFixed(1)}%`, color: '#3b82f6' },
          { label: 'Precisão', value: `${(metrics.precision * 100).toFixed(1)}%`, color: '#22c55e' },
          { label: 'Revocação', value: `${(metrics.recall * 100).toFixed(1)}%`, color: '#eab308' },
          { label: 'F1-Score', value: `${(metrics.f1_score * 100).toFixed(1)}%`, color: '#a855f7' },
        ]}
      />

      <DashboardGrid columns={{ xs: 1, lg: 2 }} sx={{ mb: 4 }}>
        <ConfusionMatrixHeatmap matrix={matrix} />
        <FeatureImportanceChart data={features} />
      </DashboardGrid>

      <DashboardGrid columns={{ xs: 1 }}>
        <ClassificationReportTable data={report} />
      </DashboardGrid>
    </PageContainer>
  );
}
