'use client';

/**
 * ChipFilterGroup — multi-value or single-value filter using chip buttons.
 *
 * CLIENT COMPONENT: filter state managed by parent via controlled props.
 *
 * Renders a label + row of MUI Chips, each representing a filter option.
 * Supports both single-select and multi-select modes.
 *
 * @example
 * ```tsx
 * // Single-select severity filter
 * <ChipFilterGroup
 *   label="Severity"
 *   options={[
 *     { value: 'critico',  label: 'Critical',  count: 1193 },
 *     { value: 'serio',    label: 'Serious',   count: 1391 },
 *     { value: 'moderado', label: 'Moderate',  count: 11224 },
 *     { value: 'menor',    label: 'Minor',     count: 851 },
 *   ]}
 *   value={selectedSeverity}
 *   onChange={setSelectedSeverity}
 * />
 * ```
 */

import { Box, Chip, Typography } from '@mui/material';
import type { ChipFilterGroupProps } from '@/types';

export function ChipFilterGroup<T extends string = string>({
  label,
  options,
  value,
  onChange,
  multiple = false,
  sx,
}: ChipFilterGroupProps<T>) {
  const selectedValues = Array.isArray(value) ? value : [value];

  const isSelected = (optionValue: T) => selectedValues.includes(optionValue);

  const handleClick = (optionValue: T) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [value];
      const next = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue];
      onChange(next as T | T[]);
    } else {
      onChange(optionValue);
    }
  };

  return (
    <Box
      sx={sx}
      role="group"
      aria-label={`Filter by ${label}`}
    >
      <Typography
        variant="overline"
        component="p"
        sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
      >
        {label}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        {options.map((option) => {
          const selected = isSelected(option.value as T);
          return (
            <Chip
              key={option.value}
              label={
                option.count !== undefined
                  ? `${option.label} (${option.count.toLocaleString()})`
                  : option.label
              }
              size="small"
              onClick={() => handleClick(option.value as T)}
              aria-pressed={selected}
              aria-label={`${selected ? 'Remove' : 'Add'} filter: ${option.label}`}
              sx={{
                cursor: 'pointer',
                fontWeight: selected ? 600 : 400,
                transition: 'all 150ms ease',
                ...(selected
                  ? {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    }
                  : {
                      backgroundColor: 'transparent',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'primary.main',
                      },
                    }),
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
