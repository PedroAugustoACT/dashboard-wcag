/**
 * Machine Learning metrics data loaders.
 *
 * Server-side functions for classification report, confusion matrix,
 * model metrics, and feature importance data.
 */

import { parseCsv, parseCsvMatrix } from '@/lib/parsers';
import { parseJson } from '@/lib/parsers';
import { toNumber, toString } from '@/lib/validators';
import type {
  ClassificationReportRow,
  ConfusionMatrix,
  MetricasModelo,
  FeatureImportante,
} from '@/types';

/**
 * Load classification report data.
 * Source: classification_report.csv
 *
 * Note: The CSV has an unnamed first column (index) used as the label.
 * Columns: (unnamed), precision, recall, f1-score, support
 */
export async function loadClassificationReport(): Promise<ClassificationReportRow[]> {
  return parseCsv<ClassificationReportRow>('classification_report.csv', {
    transform: (row) => {
      // The unnamed first column appears as '' in PapaParse headers
      const label = toString(row[''] || row['Unnamed: 0'] || row[Object.keys(row)[0]]);

      return {
        label,
        precision: toNumber(row.precision),
        recall: toNumber(row.recall),
        f1_score: toNumber(row['f1-score']),
        support: toNumber(row.support),
      };
    },
  });
}

/**
 * Load confusion matrix data.
 * Source: matriz_confusao.csv
 *
 * Returns a 2D array of numbers representing the confusion matrix.
 * For this dataset: [[16, 0], [0, 65]] (2 classes).
 */
export async function loadConfusionMatrix(): Promise<ConfusionMatrix> {
  return parseCsvMatrix('matriz_confusao.csv');
}

/**
 * Load aggregate model metrics.
 * Source: metricas_modelo.json
 */
export async function loadMetricasModelo(): Promise<MetricasModelo> {
  return parseJson<MetricasModelo>('metricas_modelo.json');
}

/**
 * Load feature importance scores.
 * Source: features_importantes.csv
 *
 * Note: The CSV columns are `regra_wcag_id` and `0` (unnamed importance column).
 */
export async function loadFeaturesImportantes(): Promise<FeatureImportante[]> {
  return parseCsv<FeatureImportante>('features_importantes.csv', {
    transform: (row) => ({
      regra_wcag_id: toString(row.regra_wcag_id),
      importance: toNumber(row['0']),
    }),
  });
}
