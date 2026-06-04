/**
 * Insights page — dynamically renders all analytical insights from insights.json.
 *
 * SERVER COMPONENT: loads and renders data server-side.
 * No hardcoded insight content — all data is sourced from the JSON file.
 */

import React from 'react';
import { PageContainer, PageHeader } from '@/components';
import { loadInsights } from '@/lib/loaders/overview-loaders';
import { InsightCard } from '@/features/insights/components/InsightCard';
import { Box, Grid, Paper, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default async function InsightsPage() {
  const insights = await loadInsights();

  return (
    <PageContainer>
      <PageHeader
        title="Insights e Recomendações"
        description="Recomendações baseadas em dados para melhorar sistematicamente a conformidade WCAG."
      />

      {/* ── Executive summary banner ── */}
      <Paper
        sx={{
          p: 3,
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 2.5,
          bgcolor: 'primary.dark',
          color: 'primary.contrastText',
          borderRadius: 2,
        }}
        role="note"
        aria-label="Resumo executivo dos principais problemas de acessibilidade identificados"
      >
        <AutoAwesomeIcon
          aria-hidden="true"
          sx={{ fontSize: 44, color: '#fcd34d', flexShrink: 0 }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            Resumo Executivo
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
            Os modelos de machine learning analisaram o conjunto completo de dados para identificar
            os gargalos mais críticos de acessibilidade. Os insights abaixo foram gerados
            automaticamente a partir das violações, clusters, regras de associação e padrões
            estruturais detectados nos portais avaliados.
          </Typography>
        </Box>
      </Paper>

      {/* ── Insight count summary ── */}
      <Typography
        variant="overline"
        component="p"
        color="text.secondary"
        sx={{ mb: 2, letterSpacing: '0.1em' }}
        aria-live="polite"
      >
        {insights.length} insight{insights.length !== 1 ? 's' : ''} encontrado
        {insights.length !== 1 ? 's' : ''}
      </Typography>

      {/* ── Dynamic insight grid ── */}
      <Grid
        container
        spacing={3}
        component="section"
        aria-label="Lista de insights de acessibilidade"
      >
        {insights.map((insight) => (
          <Grid
            key={insight.id}
            size={{ xs: 12, md: 6 }}
          >
            <InsightCard insight={insight} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
