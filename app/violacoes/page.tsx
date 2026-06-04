import React from 'react';
import { PageContainer, PageHeader, DashboardGrid } from '@/components';
import {
  loadTopViolacoes,
  loadTopTagsHtml,
  loadTopSelectorsCss,
} from '@/lib/loaders';
import { TopViolationsChart } from '@/features/violations/components/TopViolationsChart';
import { TagsDataGrid } from '@/features/violations/components/TagsDataGrid';
import { SelectorsDataGrid } from '@/features/violations/components/SelectorsDataGrid';

export default async function ViolacoesPage() {
  const [topViolations, topTags, topSelectors] = await Promise.all([
    loadTopViolacoes(),
    loadTopTagsHtml(),
    loadTopSelectorsCss(),
  ]);

  return (
    <PageContainer>
      <PageHeader
        title="Violações WCAG"
        description="Análise detalhada de erros de acessibilidade por regra, tag HTML e seletor CSS."
      />

      <DashboardGrid columns={{ xs: 1 }} sx={{ mb: 4 }}>
        <TopViolationsChart data={topViolations} />
      </DashboardGrid>

      <DashboardGrid columns={{ xs: 1, lg: 2 }}>
        <TagsDataGrid data={topTags} />
        <SelectorsDataGrid data={topSelectors} />
      </DashboardGrid>
    </PageContainer>
  );
}
