/**
 * Data transformation utilities.
 *
 * Reusable functions for transforming loaded data into shapes
 * optimized for charts, tables, and dashboard components.
 * These run on the server after data loading.
 */

// ---------------------------------------------------------------------------
// Frozenset parsing
// ---------------------------------------------------------------------------

/**
 * Parse a Python frozenset string representation into an array of items.
 *
 * Input format: "frozenset({'item1', 'item2'})"
 * Output: ["item1", "item2"]
 *
 * @example
 * ```ts
 * parseFromFrozenset("frozenset({'link-name', 'color-contrast'})");
 * // => ['link-name', 'color-contrast']
 * ```
 */
export function parseFromFrozenset(frozensetStr: string): string[] {
  if (!frozensetStr || !frozensetStr.includes('frozenset')) {
    return [frozensetStr].filter(Boolean);
  }

  const match = frozensetStr.match(/\{([^}]+)\}/);
  if (!match) return [];

  return match[1]
    .split(',')
    .map((item) => item.trim().replace(/'/g, ''))
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Grouping & aggregation
// ---------------------------------------------------------------------------

/**
 * Group an array of items by a key function.
 *
 * @example
 * ```ts
 * const grouped = groupBy(violations, (v) => v.severidade);
 * // => { critico: [...], serio: [...], ... }
 * ```
 */
export function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of items) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

/**
 * Count occurrences of each unique value for a given key.
 *
 * @example
 * ```ts
 * const counts = countBy(violations, (v) => v.regra_wcag_id);
 * // => { 'color-contrast': 923, 'link-name': 1130, ... }
 * ```
 */
export function countBy<T>(items: T[], keyFn: (item: T) => string): Record<string, number> {
  const result: Record<string, number> = {};
  for (const item of items) {
    const key = keyFn(item);
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}

/**
 * Convert a Record<string, number> into a sorted array of { name, value } pairs.
 * Useful for converting countBy results into chart-ready data.
 *
 * @param descending - Sort by value in descending order (default: true)
 */
export function toRankedList(
  counts: Record<string, number>,
  descending = true,
): Array<{ name: string; value: number }> {
  const entries = Object.entries(counts).map(([name, value]) => ({ name, value }));
  entries.sort((a, b) => (descending ? b.value - a.value : a.value - b.value));
  return entries;
}

// ---------------------------------------------------------------------------
// Top-N & filtering
// ---------------------------------------------------------------------------

/**
 * Take the top N items from an array (assumes already sorted or sorts by value).
 */
export function topN<T extends { count?: number; value?: number }>(
  items: T[],
  n: number,
): T[] {
  return items.slice(0, n);
}

// ---------------------------------------------------------------------------
// URL / domain utilities
// ---------------------------------------------------------------------------

/**
 * Extract domain from a full URL string.
 *
 * @example
 * ```ts
 * extractDomain('https://www.ufpe.br/acessibilidade');
 * // => 'www.ufpe.br'
 * ```
 */
export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    // Fallback: try to extract domain manually
    const match = url.match(/^(?:https?:\/\/)?([^/?#]+)/);
    return match ? match[1] : url;
  }
}

// ---------------------------------------------------------------------------
// Severity utilities
// ---------------------------------------------------------------------------

/** Map severity levels to sort order (most severe first). */
const SEVERITY_ORDER: Record<string, number> = {
  critico: 0,
  serio: 1,
  moderado: 2,
  menor: 3,
};

/**
 * Sort an array of items by severity level (most severe first).
 */
export function sortBySeverity<T extends { severidade: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => (SEVERITY_ORDER[a.severidade] ?? 99) - (SEVERITY_ORDER[b.severidade] ?? 99),
  );
}

/**
 * Map severity level to a display label (Portuguese → English).
 */
export function severityLabel(severidade: string): string {
  const labels: Record<string, string> = {
    critico: 'Critical',
    serio: 'Serious',
    moderado: 'Moderate',
    menor: 'Minor',
  };
  return labels[severidade] ?? severidade;
}

/**
 * Map severity level to a theme-compatible color token.
 */
export function severityColor(severidade: string): string {
  const colors: Record<string, string> = {
    critico: '#ef4444',   // Red
    serio: '#f97316',     // Orange
    moderado: '#eab308',  // Yellow
    menor: '#3b82f6',     // Blue
  };
  return colors[severidade] ?? '#6b7280'; // Gray fallback
}

// ---------------------------------------------------------------------------
// Percentage & formatting
// ---------------------------------------------------------------------------

/**
 * Format a number as a percentage string.
 *
 * @example
 * ```ts
 * formatPercent(0.9534);  // => '95.34%'
 * formatPercent(0.9534, 1); // => '95.3%'
 * ```
 */
export function formatPercent(value: number, decimals = 2): string {
  const pct = value <= 1 ? value * 100 : value;
  return `${pct.toFixed(decimals)}%`;
}

/**
 * Format a large number with locale-aware separators.
 *
 * @example
 * ```ts
 * formatNumber(14659); // => '14,659'
 * ```
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

/**
 * Truncate a string to a max length, adding ellipsis if needed.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 1)}…`;
}
