/**
 * Data validation helpers.
 *
 * Lightweight runtime validators for parsed data.
 * These guard against malformed CSV rows, missing columns,
 * and invalid numeric values.
 */

import type { Severidade } from '@/types';

// ---------------------------------------------------------------------------
// Numeric validation
// ---------------------------------------------------------------------------

/**
 * Safely convert a string value to a number, returning a fallback
 * if the conversion results in NaN or the value is empty.
 */
export function toNumber(value: string | number | undefined | null, fallback = 0): number {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  const num = Number(value);
  return Number.isNaN(num) ? fallback : num;
}

/**
 * Safely convert a value to a percentage (0–100 range).
 * If the raw value is in 0–1 range, multiplies by 100.
 */
export function toPercentage(value: string | number | undefined | null): number {
  const num = toNumber(value);
  return num <= 1 && num >= 0 ? num * 100 : num;
}

// ---------------------------------------------------------------------------
// String validation
// ---------------------------------------------------------------------------

/**
 * Return a string value or a fallback if the value is empty/undefined.
 */
export function toString(value: string | undefined | null, fallback = ''): string {
  if (value === undefined || value === null) {
    return fallback;
  }
  const trimmed = value.trim();
  return trimmed.length === 0 ? fallback : trimmed;
}

// ---------------------------------------------------------------------------
// Severity validation
// ---------------------------------------------------------------------------

const VALID_SEVERITIES: ReadonlySet<string> = new Set([
  'critico',
  'serio',
  'moderado',
  'menor',
]);

/**
 * Validate and normalize a severity string.
 * Returns the severity or 'moderado' as a safe fallback.
 */
export function toSeveridade(value: string | undefined | null): Severidade {
  const normalized = (value ?? '').trim().toLowerCase();
  return VALID_SEVERITIES.has(normalized) ? (normalized as Severidade) : 'moderado';
}

/**
 * Check if a value is a valid severity level.
 */
export function isValidSeveridade(value: string): value is Severidade {
  return VALID_SEVERITIES.has(value.trim().toLowerCase());
}

// ---------------------------------------------------------------------------
// Row validation
// ---------------------------------------------------------------------------

/**
 * Check that a parsed row has all required fields (non-empty).
 * Returns true if every specified key exists and is non-empty.
 */
export function hasRequiredFields(
  row: Record<string, unknown>,
  fields: string[],
): boolean {
  return fields.every((field) => {
    const value = row[field];
    return value !== undefined && value !== null && value !== '';
  });
}

/**
 * Filter an array of rows, removing those that lack required fields.
 * Logs a warning with the count of removed rows.
 */
export function filterValidRows<T extends Record<string, unknown>>(
  rows: T[],
  requiredFields: string[],
  datasetName?: string,
): T[] {
  const valid = rows.filter((row) => hasRequiredFields(row, requiredFields));
  const removed = rows.length - valid.length;

  if (removed > 0) {
    console.warn(
      `[filterValidRows]${datasetName ? ` ${datasetName}:` : ''} Removed ${removed} rows with missing fields (${requiredFields.join(', ')})`,
    );
  }

  return valid;
}
