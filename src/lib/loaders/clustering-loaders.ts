/**
 * Clustering & PCA data loaders.
 *
 * Server-side functions for feature engineering, clustering, and PCA data.
 */

import { parseCsv, parseCsvDynamic } from '@/lib/parsers';
import { toNumber } from '@/lib/validators';
import type {
  FeaturesEngineering,
  FeaturesClusterizadas,
  PcaCluster,
  CorrelacaoViolacao,
  MatrizSiteViolacao,
} from '@/types';

/**
 * Load engineered features per URL.
 * Source: features_engineering.csv
 *
 * Returns rows with all WCAG rule columns as numbers
 * plus total_erros, diversidade_erros, and url_origem.
 */
export async function loadFeaturesEngineering(): Promise<FeaturesEngineering[]> {
  const raw = await parseCsvDynamic<Record<string, unknown>>('features_engineering.csv');

  return raw.map((row) => {
    const result: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(row)) {
      if (key === 'url_origem') {
        result[key] = String(value ?? '');
      } else {
        result[key] = toNumber(value as string | number);
      }
    }
    return result as unknown as FeaturesEngineering;
  });
}

/**
 * Load clustered features (features_engineering + cluster label).
 * Source: features_clusterizadas.csv
 */
export async function loadFeaturesClusterizadas(): Promise<FeaturesClusterizadas[]> {
  const raw = await parseCsvDynamic<Record<string, unknown>>('features_clusterizadas.csv');

  return raw.map((row) => {
    const result: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(row)) {
      if (key === 'url_origem') {
        result[key] = String(value ?? '');
      } else {
        result[key] = toNumber(value as string | number);
      }
    }
    return result as unknown as FeaturesClusterizadas;
  });
}

/**
 * Load PCA-reduced cluster data.
 * Source: pca_clusters.csv
 */
export async function loadPcaClusters(): Promise<PcaCluster[]> {
  return parseCsv<PcaCluster>('pca_clusters.csv', {
    transform: (row) => ({
      pca_1: toNumber(row.pca_1),
      pca_2: toNumber(row.pca_2),
      cluster: toNumber(row.cluster),
    }),
  });
}

/**
 * Load the violation correlation matrix.
 * Source: correlacao_violacoes.csv
 *
 * Returns rows where the first column is the rule name and
 * remaining columns are correlation coefficients.
 */
export async function loadCorrelacaoViolacoes(): Promise<CorrelacaoViolacao[]> {
  const raw = await parseCsvDynamic<Record<string, unknown>>('correlacao_violacoes.csv');

  return raw.map((row) => {
    const result: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(row)) {
      if (key === 'regra_wcag_id') {
        result[key] = String(value ?? '');
      } else {
        result[key] = toNumber(value as string | number);
      }
    }
    return result as unknown as CorrelacaoViolacao;
  });
}

/**
 * Load the site × violation matrix.
 * Source: matriz_site_violacao.csv
 *
 * Returns rows where the first column is the URL and
 * remaining columns are per-violation counts.
 */
export async function loadMatrizSiteViolacao(): Promise<MatrizSiteViolacao[]> {
  const raw = await parseCsvDynamic<Record<string, unknown>>('matriz_site_violacao.csv');

  return raw.map((row) => {
    const result: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(row)) {
      if (key === 'url_origem') {
        result[key] = String(value ?? '');
      } else {
        result[key] = toNumber(value as string | number);
      }
    }
    return result as unknown as MatrizSiteViolacao;
  });
}
