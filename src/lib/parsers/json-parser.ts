/**
 * Core JSON parser — typed, reusable loader for JSON data files.
 *
 * Designed for **server-side** usage in Next.js Server Components.
 * Reads files from the filesystem directly.
 */

import fs from 'fs/promises';
import path from 'path';

/** Base directory where all data files live (relative to project root). */
const DATA_DIR = path.join(process.cwd(), 'public', 'data', 'outputs');

/**
 * Parse a JSON file from the data directory and return a typed object.
 *
 * @param filename - File name within public/data/outputs/ (e.g. 'insights.json')
 * @returns Promise resolving to the parsed and typed JSON content
 *
 * @example
 * ```ts
 * const metrics = await parseJson<MetricasModelo>('metricas_modelo.json');
 * console.log(metrics.accuracy);
 * ```
 */
export async function parseJson<T>(filename: string): Promise<T> {
  const fullPath = path.join(DATA_DIR, filename);
  const content = await fs.readFile(fullPath, 'utf-8');
  return JSON.parse(content) as T;
}
