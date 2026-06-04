/**
 * Insights / overview data loaders.
 *
 * Server-side functions for loading summary and overview data.
 */

import { parseCsv } from '@/lib/parsers';
import { parseJson } from '@/lib/parsers';
import { toString, toNumber } from '@/lib/validators';
import type { Insights, DatasetTratado } from '@/types';

/**
 * Load high-level dashboard insights.
 * Source: insights.json
 */
export async function loadInsights(): Promise<Insights> {
  return parseJson<Insights>('insights.json');
}

/**
 * Load the cleaned base dataset (without severity).
 * Source: dataset_tratado.csv
 *
 * WARNING: This file has ~14,660 rows. Use with care —
 * prefer aggregated data files when possible.
 */
export async function loadDatasetTratado(): Promise<DatasetTratado[]> {
  return parseCsv<DatasetTratado>('dataset_tratado.csv', {
    transform: (row) => ({
      url_origem: toString(row.url_origem),
      regra_wcag_id: toString(row.regra_wcag_id),
      titulo_erro: toString(row.titulo_erro),
      seletor_css: toString(row.seletor_css),
      snippet_html: toString(row.snippet_html),
    }),
  });
}

/**
 * Load a limited sample of the base dataset.
 */
export async function loadDatasetTratadoSample(
  limit = 100,
): Promise<DatasetTratado[]> {
  const data = await loadDatasetTratado();
  return data.slice(0, limit);
}

/**
 * Get a quick count of total records in the dataset.
 * Useful for KPI cards without loading full data.
 */
export async function getDatasetRowCount(): Promise<number> {
  const data = await loadDatasetTratado();
  return data.length;
}

/**
 * Get a summary of unique values across key dimensions.
 * Useful for overview KPI cards.
 */
export async function getDatasetSummary(): Promise<{
  totalViolations: number;
  uniqueSites: number;
  uniqueRules: number;
}> {
  const data = await loadDatasetTratado();
  const sites = new Set(data.map((row) => row.url_origem));
  const rules = new Set(data.map((row) => row.regra_wcag_id));

  return {
    totalViolations: data.length,
    uniqueSites: sites.size,
    uniqueRules: rules.size,
  };
}
