import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarningIcon from '@mui/icons-material/Warning';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import type { NavigationSection } from '@/types/navigation';

export const navigation: NavigationSection[] = [
  {
    title: 'Visão Geral',
    items: [
      {
        label: 'Dashboard',
        href: '/',
        icon: <DashboardIcon />,
        description: 'Resumo de métricas e insights de acessibilidade',
      },
    ],
  },
  {
    title: 'Análise',
    items: [
      {
        label: 'Violações',
        href: '/violacoes',
        icon: <WarningIcon />,
        description: 'Principais violações WCAG e erros por domínio',
      },
    ],
  },
  {
    title: 'Machine Learning',
    items: [
      {
        label: 'Clustering & PCA',
        href: '/clusters',
        icon: <ScatterPlotIcon />,
        description: 'Clusterização de domínios e visualização PCA',
      },
      {
        label: 'Métricas do Modelo',
        href: '/modelo',
        icon: <TrendingUpIcon />,
        description: 'Relatórios de classificação e matriz de confusão',
      },
    ],
  },
  {
    title: 'Padrões',
    items: [
      {
        label: 'Regras de Associação',
        href: '/regras',
        icon: <AccountTreeIcon />,
        description: 'Itemsets frequentes e co-ocorrências de violações',
      },
      {
        label: 'Insights',
        href: '/insights',
        icon: <LightbulbIcon />,
        description: 'Recomendações geradas a partir dos dados',
      },
    ],
  },
];

