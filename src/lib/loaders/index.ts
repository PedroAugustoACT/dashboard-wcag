/**
 * Barrel export for all data loaders.
 *
 * Import from '@/lib/loaders' for any data loading function.
 *
 * @example
 * ```ts
 * import { loadTopViolacoes, loadInsights } from '@/lib/loaders';
 *
 * // In a Server Component:
 * const violations = await loadTopViolacoes();
 * const insights = await loadInsights();
 * ```
 */

// Violations
export {
  loadTopViolacoes,
  loadErrosPorSite,
  loadTopDominios,
  loadTopTagsHtml,
  loadTopSelectorsCss,
} from './violation-loaders';

// Severity
export {
  loadDistribuicaoSeveridade,
  loadComparacaoGrupos,
  loadDatasetComSeveridade,
  loadDatasetComSeveridadeSample,
} from './severity-loaders';

// Clustering & PCA
export {
  loadFeaturesEngineering,
  loadFeaturesClusterizadas,
  loadPcaClusters,
  loadCorrelacaoViolacoes,
  loadMatrizSiteViolacao,
} from './clustering-loaders';

// ML metrics
export {
  loadClassificationReport,
  loadConfusionMatrix,
  loadMetricasModelo,
  loadFeaturesImportantes,
} from './ml-loaders';

// Association rules
export {
  loadRegrasAssociacao,
  loadFrequentItemsets,
  loadRedeCoocorrencia,
} from './association-loaders';

// Overview & insights
export {
  loadInsights,
  loadDatasetTratado,
  loadDatasetTratadoSample,
  getDatasetRowCount,
  getDatasetSummary,
} from './overview-loaders';
