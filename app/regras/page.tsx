import React from 'react';
import { PageContainer, PageHeader, DashboardGrid, StatRow } from '@/components';
import { loadRegrasAssociacao, loadRedeCoocorrencia } from '@/lib/loaders/association-loaders';
import { RulesScatterChart } from '@/features/patterns/components/RulesScatterChart';
import { RulesDataGrid } from '@/features/patterns/components/RulesDataGrid';
import { CooccurrenceChart } from '@/features/patterns/components/CooccurrenceChart';

export default async function RegrasPage() {
  const [regras, coocorrencia] = await Promise.all([
    loadRegrasAssociacao(),
    loadRedeCoocorrencia(),
  ]);

  const avgConfidence = regras.length > 0
    ? (regras.reduce((sum, r) => sum + r.confidence, 0) / regras.length).toFixed(2)
    : '0';

  const avgLift = regras.length > 0
    ? (regras.reduce((sum, r) => sum + r.lift, 0) / regras.length).toFixed(2)
    : '0';

  return (
    <PageContainer>
      <PageHeader
        title="Regras de Associação & Padrões"
        description="Insights de machine learning sobre co-ocorrências de violações WCAG entre domínios."
      />

      <StatRow
        sx={{ mb: 4 }}
        items={[
          { label: 'Regras Encontradas', value: regras.length, color: '#3b82f6' },
          { label: 'Confiança Média', value: avgConfidence, color: '#22c55e' },
          { label: 'Lift Médio', value: avgLift, color: '#a855f7' },
        ]}
      />

      <DashboardGrid columns={{ xs: 1, lg: 2 }} sx={{ mb: 4 }}>
        <RulesScatterChart data={regras} />
        <CooccurrenceChart data={coocorrencia} />
      </DashboardGrid>

      <DashboardGrid columns={{ xs: 1 }}>
        <RulesDataGrid data={regras} />
      </DashboardGrid>
    </PageContainer>
  );
}
