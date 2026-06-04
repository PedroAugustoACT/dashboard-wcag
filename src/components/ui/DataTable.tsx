'use client';

/**
 * DataTable — reusable, accessible data table.
 *
 * CLIENT COMPONENT: sorting state is client-side.
 *
 * Features:
 * - Generic TypeScript row type
 * - Configurable columns with accessor functions
 * - Client-side single-column sorting
 * - Sticky header on scroll
 * - Loading skeleton (N rows × N cols)
 * - Empty state fallback
 * - Accessible caption and aria attributes
 *
 * @example
 * ```tsx
 * const columns: TableColumn<TopViolacao>[] = [
 *   { id: 'rule',  label: 'Rule',  accessor: 'regra_wcag_id' },
 *   { id: 'count', label: 'Count', accessor: 'count', align: 'right', sortable: true },
 * ];
 *
 * <DataTable
 *   columns={columns}
 *   rows={violations}
 *   getRowKey={(r) => r.regra_wcag_id}
 *   caption="Top WCAG violations by count"
 *   maxHeight={400}
 * />
 * ```
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import type { DataTableProps, TableColumn } from '@/types';
import { EmptyState } from './EmptyState';

// ---------------------------------------------------------------------------
// Sort state
// ---------------------------------------------------------------------------

type SortOrder = 'asc' | 'desc';

interface SortState {
  column: string | null;
  order: SortOrder;
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

function TableSkeleton({
  columns,
  rows = 6,
}: {
  columns: number;
  rows?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <TableRow key={r} aria-hidden="true">
          {Array.from({ length: columns }).map((_, c) => (
            <TableCell key={c}>
              <Skeleton variant="text" width={`${60 + (c % 3) * 15}%`} height={16} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  maxHeight,
  loading = false,
  emptyMessage = 'No data to display.',
  caption,
  sx,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>({ column: null, order: 'desc' });

  const handleSort = useCallback((columnId: string) => {
    setSort((prev) =>
      prev.column === columnId
        ? { column: columnId, order: prev.order === 'desc' ? 'asc' : 'desc' }
        : { column: columnId, order: 'desc' },
    );
  }, []);

  const sortedRows = useMemo(() => {
    if (!sort.column) return rows;

    const col = columns.find((c) => c.id === sort.column);
    if (!col || typeof col.accessor !== 'string') return rows;

    const key = col.accessor as keyof T;
    return [...rows].sort((a, b) => {
      const av = a[key];
      const bv = b[key];

      if (typeof av === 'number' && typeof bv === 'number') {
        return sort.order === 'asc' ? av - bv : bv - av;
      }

      const as = String(av ?? '');
      const bs = String(bv ?? '');
      return sort.order === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as);
    });
  }, [rows, sort, columns]);

  const isEmpty = !loading && rows.length === 0;

  return (
    <Paper
      sx={{ width: '100%', overflow: 'hidden', ...sx }}
      role="region"
      aria-label={caption ?? 'Data table'}
    >
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader aria-label={caption} size="small">
          {/* Accessible caption */}
          {caption && (
            <caption style={{ position: 'absolute', left: '-9999px' }}>
              {caption}
            </caption>
          )}

          {/* Header */}
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align ?? 'left'}
                  sx={{ width: col.width }}
                  aria-sort={
                    sort.column === col.id
                      ? sort.order === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                >
                  {col.sortable ? (
                    <TableSortLabel
                      active={sort.column === col.id}
                      direction={sort.column === col.id ? sort.order : 'desc'}
                      onClick={() => handleSort(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {loading ? (
              <TableSkeleton columns={columns.length} />
            ) : isEmpty ? (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ border: 0, p: 0 }}>
                  <EmptyState message={emptyMessage} />
                </TableCell>
              </TableRow>
            ) : (
              sortedRows.map((row) => (
                <TableRow key={getRowKey(row)} hover tabIndex={-1}>
                  {columns.map((col) => {
                    const value =
                      typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : row[col.accessor as keyof T];

                    return (
                      <TableCell key={col.id} align={col.align ?? 'left'}>
                        {value as React.ReactNode}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Row count footer */}
      {!loading && !isEmpty && (
        <Box
          sx={{
            px: 2,
            py: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {rows.length.toLocaleString()} rows
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
