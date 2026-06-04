import React from 'react';
import { PageContainer, PageHeader, DashboardGrid, StatRow } from '@/components';
import { loadPcaClusters, loadFeaturesClusterizadas } from '@/lib/loaders';
import { PcaScatterChart } from '@/features/clustering/components/PcaScatterChart';
import { ClusterDistributionChart } from '@/features/clustering/components/ClusterDistributionChart';
import { ClusterSummaryDataGrid } from '@/features/clustering/components/ClusterSummaryDataGrid';
import { groupBy } from '@/lib/transformers';

export default async function ClustersPage() {
  const [pcaData, featuresData] = await Promise.all([
    loadPcaClusters(),
    loadFeaturesClusterizadas(),
  ]);

  const clusters = groupBy(featuresData, (item) => String(item.cluster));

  const clusterSummaries = Object.entries(clusters).map(([clusterStr, items]) => {
    const cluster = Number(clusterStr);
    const count = items.length;
    const avgTotalErros = items.reduce((sum, item) => sum + item.total_erros, 0) / count;
    const avgDiversidade = items.reduce((sum, item) => sum + item.diversidade_erros, 0) / count;
    return { cluster, count, avgTotalErros, avgDiversidade };
  }).sort((a, b) => a.cluster - b.cluster);

  const totalClusters = clusterSummaries.length;
  const highestDensityCluster = [...clusterSummaries].sort((a, b) => b.count - a.count)[0]?.cluster;

  return (
    <PageContainer>
      <PageHeader
        title="Clustering & Análise PCA"
        description="Insights de machine learning sobre os padrões de violações de acessibilidade por domínio."
      />

      <StatRow
        sx={{ mb: 4 }}
        items={[
          { label: 'Total de Clusters', value: totalClusters, color: '#3b82f6' },
          { label: 'Domínios Analisados', value: featuresData.length },
          { label: 'Cluster Dominante', value: `Cluster ${highestDensityCluster}`, color: '#22c55e' },
        ]}
      />

      <DashboardGrid columns={{ xs: 1, lg: 2 }} sx={{ mb: 4 }}>
        <PcaScatterChart data={pcaData} />
        <ClusterDistributionChart data={clusterSummaries} />
      </DashboardGrid>

      <DashboardGrid columns={{ xs: 1 }}>
        <ClusterSummaryDataGrid data={clusterSummaries} />
      </DashboardGrid>
    </PageContainer>
  );
}
