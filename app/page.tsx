import React from 'react';
import { PageContainer, PageHeader, DashboardGrid, KpiCard, InfoBanner } from '@/components';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WebIcon from '@mui/icons-material/Web';
import RuleIcon from '@mui/icons-material/Rule';
import {
  getDatasetSummary,
  loadInsightsSummary,
  loadDistribuicaoSeveridade,
  loadTopDominios,
} from '@/lib/loaders';
import { SeverityDistributionChart } from '@/features/overview/components/SeverityDistributionChart';
import { TopDomainsChart } from '@/features/overview/components/TopDomainsChart';

export default async function OverviewPage() {
  const [summary, insightsSummary, severityDistribution, topDomains] = await Promise.all([
    getDatasetSummary(),
    loadInsightsSummary(),
    loadDistribuicaoSeveridade(),
    loadTopDominios(),
  ]);

  return (
    <PageContainer>
      <PageHeader
        title="Visão Geral do Dashboard"
        description="Resumo de alto nível das análises de acessibilidade WCAG em todos os portais mapeados."
      />

      <InfoBanner
        message={`Tag HTML mais problemática: <${insightsSummary.tag_html_mais_problematica}>. Violação mais frequente: ${insightsSummary.violacao_mais_frequente}.`}
        severity="info"
        sx={{ mb: 2 }}
      />

      {/* KPIs */}
      <DashboardGrid columns={{ xs: 1, sm: 3 }}>
        <KpiCard
          title="Total de Violações"
          value={summary.totalViolations}
          icon={<WarningAmberIcon />}
          accentColor="#ef4444"
          aria-label={`Total de violações WCAG detectadas: ${summary.totalViolations.toLocaleString('pt-BR')}`}
        />
        <KpiCard
          title="Domínios Únicos"
          value={summary.uniqueSites}
          icon={<WebIcon />}
          accentColor="#3b82f6"
          aria-label={`Número de domínios únicos analisados: ${summary.uniqueSites.toLocaleString('pt-BR')}`}
        />
        <KpiCard
          title="Regras WCAG Violadas"
          value={summary.uniqueRules}
          icon={<RuleIcon />}
          accentColor="#eab308"
          aria-label={`Regras WCAG distintas violadas: ${summary.uniqueRules.toLocaleString('pt-BR')}`}
        />
      </DashboardGrid>

      {/* Charts */}
      <DashboardGrid columns={{ xs: 1, lg: 2 }} sx={{ mt: 2 }}>
        <SeverityDistributionChart data={severityDistribution} />
        <TopDomainsChart data={topDomains} />
      </DashboardGrid>
    </PageContainer>
  );
}
