/**
 * Violation data loaders.
 *
 * Server-side functions that load and transform violation-related CSV files.
 * Each function returns strongly-typed, validated data ready for components.
 */

import { parseCsv } from '@/lib/parsers';
import { toNumber, toString } from '@/lib/validators';
import type {
  TopViolacao,
  ErrosPorSite,
  TopDominio,
  TopTagHtml,
  TopSelectorCss,
} from '@/types';

/**
 * Load top WCAG violations ranked by frequency.
 * Source: top_violacoes_wcag.csv
 */
export async function loadTopViolacoes(): Promise<TopViolacao[]> {
  return parseCsv<TopViolacao>('top_violacoes_wcag.csv', {
    transform: (row) => ({
      regra_wcag_id: toString(row.regra_wcag_id),
      count: toNumber(row.count),
    }),
  });
}

/**
 * Load error counts per site URL.
 * Source: erros_por_site.csv
 *
 * Note: The CSV has columns `url_origem` and `0` (unnamed count column).
 */
export async function loadErrosPorSite(): Promise<ErrosPorSite[]> {
  return parseCsv<ErrosPorSite>('erros_por_site.csv', {
    transform: (row) => ({
      url_origem: toString(row.url_origem),
      count: toNumber(row['0']),
    }),
  });
}

/**
 * Load top domains by error count.
 * Source: top_dominios.csv
 */
export async function loadTopDominios(): Promise<TopDominio[]> {
  return parseCsv<TopDominio>('top_dominios.csv', {
    transform: (row) => ({
      dominio: toString(row.dominio),
      count: toNumber(row.count),
    }),
  });
}

/**
 * Load HTML tags ranked by error frequency.
 * Source: top_tags_html.csv
 */
export async function loadTopTagsHtml(): Promise<TopTagHtml[]> {
  return parseCsv<TopTagHtml>('top_tags_html.csv', {
    transform: (row) => ({
      tag_html: toString(row.tag_html),
      count: toNumber(row.count),
    }),
  });
}

/**
 * Load CSS selectors ranked by error frequency.
 * Source: top_selectors_css.csv
 */
export async function loadTopSelectorsCss(): Promise<TopSelectorCss[]> {
  return parseCsv<TopSelectorCss>('top_selectors_css.csv', {
    transform: (row) => ({
      seletor_css: toString(row.seletor_css),
      count: toNumber(row.count),
    }),
  });
}
