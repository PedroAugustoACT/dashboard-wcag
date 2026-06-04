/**
 * Severity data loaders.
 *
 * Server-side functions for severity distribution and comparison data.
 */

import { parseCsv } from '@/lib/parsers';
import { toNumber, toString, toSeveridade } from '@/lib/validators';
import type {
  DistribuicaoSeveridade,
  ComparacaoGrupos,
  DatasetComSeveridade,
} from '@/types';

/**
 * Load severity distribution counts.
 * Source: distribuicao_severidade.csv
 */
export async function loadDistribuicaoSeveridade(): Promise<DistribuicaoSeveridade[]> {
  return parseCsv<DistribuicaoSeveridade>('distribuicao_severidade.csv', {
    transform: (row) => ({
      severidade: toSeveridade(row.severidade),
      count: toNumber(row.count),
    }),
  });
}

/**
 * Load tag group comparisons.
 * Source: comparacao_grupos.csv
 */
export async function loadComparacaoGrupos(): Promise<ComparacaoGrupos[]> {
  return parseCsv<ComparacaoGrupos>('comparacao_grupos.csv', {
    transform: (row) => ({
      grupo_tag: toString(row.grupo_tag),
      quantidade: toNumber(row.quantidade),
    }),
  });
}

/**
 * Load the full dataset with severity labels.
 * Source: dataset_com_severidade.csv
 *
 * WARNING: This file has ~14,660 rows. Use with care —
 * prefer aggregated data files when possible.
 * Consider using `loadDatasetComSeveridadeSample` for previews.
 */
export async function loadDatasetComSeveridade(): Promise<DatasetComSeveridade[]> {
  return parseCsv<DatasetComSeveridade>('dataset_com_severidade.csv', {
    transform: (row) => ({
      url_origem: toString(row.url_origem),
      regra_wcag_id: toString(row.regra_wcag_id),
      titulo_erro: toString(row.titulo_erro),
      seletor_css: toString(row.seletor_css),
      snippet_html: toString(row.snippet_html),
      tag_html: toString(row.tag_html),
      severidade: toSeveridade(row.severidade),
    }),
  });
}

/**
 * Load a limited sample of the severity dataset for previews.
 * Reads the full file but returns only the first N rows.
 */
export async function loadDatasetComSeveridadeSample(
  limit = 100,
): Promise<DatasetComSeveridade[]> {
  const data = await loadDatasetComSeveridade();
  return data.slice(0, limit);
}
