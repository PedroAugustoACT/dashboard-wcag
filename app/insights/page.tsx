import React from 'react';
import { PageContainer, PageHeader, DashboardGrid } from '@/components';
import { loadInsights } from '@/lib/loaders/overview-loaders';
import { InsightCard } from '@/features/insights/components/InsightCard';

import RuleIcon from '@mui/icons-material/Rule';
import CodeIcon from '@mui/icons-material/Code';
import CssIcon from '@mui/icons-material/Css';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { Box, Typography, Paper } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default async function InsightsPage() {
  const insights = await loadInsights();

  return (
    <PageContainer>
      <PageHeader
        title="Insights e Recomendações"
        description="Recomendações baseadas em dados para melhorar sistematicamente a conformidade WCAG."
      />

      <Paper
        sx={{
          p: 3,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'primary.dark',
          color: 'primary.contrastText',
          borderRadius: 2,
        }}
        role="note"
        aria-label="Resumo executivo dos principais problemas de acessibilidade identificados"
      >
        <AutoAwesomeIcon aria-hidden="true" sx={{ fontSize: 40, mr: 3, color: '#fcd34d', flexShrink: 0 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
            Resumo Executivo
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Os modelos de machine learning analisaram o conjunto completo de dados para identificar os gargalos
            mais críticos de acessibilidade. Priorizar a correção das tags HTML, seletores CSS e regras listados
            abaixo gerará o maior impacto na pontuação geral de acessibilidade dos portais.
          </Typography>
        </Box>
      </Paper>

      <DashboardGrid columns={{ xs: 1, md: 2 }} sx={{ mb: 4 }}>
        <InsightCard
          title="Violação Mais Frequente"
          value={insights.violacao_mais_frequente}
          icon={<RuleIcon fontSize="medium" />}
          color="#ef4444"
          recommendation="Garantir que alvos interativos tenham no mínimo 44×44 pixels CSS. Revise o estilo de botões e links em todos os breakpoints, especialmente em dispositivos móveis. Realize uma auditoria manual de áreas de toque."
        />

        <InsightCard
          title="Tag HTML Mais Problemática"
          value={`<${insights.tag_html_mais_problematica}>`}
          icon={<CodeIcon fontSize="medium" />}
          color="#f97316"
          recommendation="Links de âncora devem ter texto discernível, foco visível e contraste de cores adequado. Certifique-se de que aria-labels estejam presentes quando o texto do link for visualmente oculto ou puramente icônico."
        />

        <InsightCard
          title="Seletor CSS Crítico"
          value={insights.seletor_css_mais_problematico}
          icon={<CssIcon fontSize="medium" />}
          color="#3b82f6"
          recommendation="Esta estrutura de navegação aninhada é altamente propensa a erros. Refatore o HTML para usar tags semânticas nativas <nav> e certifique-se de que os menus suspensos sejam totalmente acessíveis via teclado e leitores de tela."
        />

        <InsightCard
          title="Cluster Dominante"
          value={`Cluster ${insights.cluster_dominante}`}
          icon={<ScatterPlotIcon fontSize="medium" />}
          color="#8b5cf6"
          recommendation={`O Cluster ${insights.cluster_dominante} representa a maioria dos domínios com perfis idênticos de violações. Concentre os esforços de correção nas regras características deste cluster para obter o maior impacto simultâneo no portfólio.`}
        />
      </DashboardGrid>
    </PageContainer>
  );
}
