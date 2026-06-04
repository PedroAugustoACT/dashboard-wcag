/**
 * Association rules & pattern data loaders.
 *
 * Server-side functions for association rules, frequent itemsets,
 * and co-occurrence network data.
 */

import { parseCsv } from '@/lib/parsers';
import { toNumber, toString } from '@/lib/validators';
import type {
  RegraAssociacao,
  FrequentItemset,
  RedeCoocorrencia,
} from '@/types';

/**
 * Load association rules with all statistical metrics.
 * Source: regras_associacao.csv
 *
 * Note: antecedents/consequents contain Python frozenset string representations
 * like "frozenset({'rule1', 'rule2'})". Use `parseFromFrozenset` to extract items.
 */
export async function loadRegrasAssociacao(): Promise<RegraAssociacao[]> {
  return parseCsv<RegraAssociacao>('regras_associacao.csv', {
    transform: (row) => ({
      antecedents: toString(row.antecedents),
      consequents: toString(row.consequents),
      antecedent_support: toNumber(row['antecedent support']),
      consequent_support: toNumber(row['consequent support']),
      support: toNumber(row.support),
      confidence: toNumber(row.confidence),
      lift: toNumber(row.lift),
      representativity: toNumber(row.representativity),
      leverage: toNumber(row.leverage),
      conviction: toNumber(row.conviction),
      zhangs_metric: toNumber(row.zhangs_metric),
      jaccard: toNumber(row.jaccard),
      certainty: toNumber(row.certainty),
      kulczynski: toNumber(row.kulczynski),
    }),
  });
}

/**
 * Load frequent itemsets with support values.
 * Source: frequent_itemsets.csv
 *
 * Note: The `itemsets` column contains Python frozenset string representations.
 * Use `parseFromFrozenset` to extract individual items.
 */
export async function loadFrequentItemsets(): Promise<FrequentItemset[]> {
  return parseCsv<FrequentItemset>('frequent_itemsets.csv', {
    transform: (row) => ({
      support: toNumber(row.support),
      itemsets: toString(row.itemsets),
    }),
  });
}

/**
 * Load co-occurrence network edges.
 * Source: rede_coocorrencia.csv
 */
export async function loadRedeCoocorrencia(): Promise<RedeCoocorrencia[]> {
  return parseCsv<RedeCoocorrencia>('rede_coocorrencia.csv', {
    transform: (row) => ({
      source: toString(row.source),
      target: toString(row.target),
      weight: toNumber(row.weight),
    }),
  });
}
