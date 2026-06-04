/**
 * Core CSV parser — reusable, typed wrapper around PapaParse.
 *
 * Designed for **server-side** usage in Next.js Server Components.
 * Reads files from the filesystem (not HTTP), so it works in Node.js
 * without requiring a running dev server or public URL.
 *
 * All functions are async and return strongly-typed arrays.
 */

import fs from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Base directory where all data files live (relative to project root). */
const DATA_DIR = path.join(process.cwd(), 'public', 'data', 'outputs');

// ---------------------------------------------------------------------------
// Core parse function
// ---------------------------------------------------------------------------

export interface CsvParseOptions<T> {
  /** Override the file path (defaults to DATA_DIR/<filename>). */
  filePath?: string;
  /**
   * Optional transform applied to each raw row BEFORE it's added to results.
   * Use this for renaming columns, casting types, or filtering.
   */
  transform?: (row: Record<string, string>) => T | null;
  /**
   * Whether to treat the first row as header names.
   * @default true
   */
  header?: boolean;
  /**
   * Skip empty lines.
   * @default true
   */
  skipEmptyLines?: boolean;
}

/**
 * Parse a CSV file from the data directory and return typed rows.
 *
 * @param filename - File name within public/data/outputs/ (e.g. 'top_violacoes_wcag.csv')
 * @param options  - Parsing configuration
 * @returns Promise resolving to an array of typed rows
 *
 * @example
 * ```ts
 * const violations = await parseCsv<TopViolacao>('top_violacoes_wcag.csv', {
 *   transform: (row) => ({
 *     regra_wcag_id: row.regra_wcag_id,
 *     count: Number(row.count),
 *   }),
 * });
 * ```
 */
export async function parseCsv<T = Record<string, string>>(
  filename: string,
  options: CsvParseOptions<T> = {},
): Promise<T[]> {
  const {
    filePath,
    transform,
    header = true,
    skipEmptyLines = true,
  } = options;

  const fullPath = filePath ?? path.join(DATA_DIR, filename);
  const csvContent = await fs.readFile(fullPath, 'utf-8');

  const result = Papa.parse<Record<string, string>>(csvContent, {
    header,
    skipEmptyLines,
    dynamicTyping: false, // We handle typing via transform for safety
  });

  if (result.errors.length > 0) {
    console.warn(
      `[parseCsv] Warnings while parsing "${filename}":`,
      result.errors.slice(0, 5),
    );
  }

  if (!transform) {
    return result.data as unknown as T[];
  }

  const transformed: T[] = [];
  for (const row of result.data) {
    const mapped = transform(row);
    if (mapped !== null) {
      transformed.push(mapped);
    }
  }

  return transformed;
}

// ---------------------------------------------------------------------------
// Helper: parse CSV with auto numeric casting
// ---------------------------------------------------------------------------

/**
 * Parse a CSV file with PapaParse's `dynamicTyping` enabled.
 * Numeric strings are automatically converted to numbers.
 *
 * Useful for matrix-style CSVs where most columns are numeric.
 */
export async function parseCsvDynamic<T = Record<string, unknown>>(
  filename: string,
): Promise<T[]> {
  const fullPath = path.join(DATA_DIR, filename);
  const csvContent = await fs.readFile(fullPath, 'utf-8');

  const result = Papa.parse<T>(csvContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  if (result.errors.length > 0) {
    console.warn(
      `[parseCsvDynamic] Warnings while parsing "${filename}":`,
      result.errors.slice(0, 5),
    );
  }

  return result.data;
}

// ---------------------------------------------------------------------------
// Helper: parse a headerless CSV as a 2D numeric matrix
// ---------------------------------------------------------------------------

/**
 * Parse a headerless CSV file into a 2D number array.
 * Used for data like the confusion matrix.
 */
export async function parseCsvMatrix(filename: string): Promise<number[][]> {
  const fullPath = path.join(DATA_DIR, filename);
  const csvContent = await fs.readFile(fullPath, 'utf-8');

  const result = Papa.parse<string[]>(csvContent, {
    header: false,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  return result.data.map((row) => row.map(Number));
}
