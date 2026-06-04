'use client';

/**
 * SelectFilter — dropdown select filter for larger option sets.
 *
 * CLIENT COMPONENT: dropdown interaction is client-side.
 *
 * @example
 * ```tsx
 * <SelectFilter
 *   label="WCAG Rule"
 *   options={rules.map(r => ({ value: r.id, label: r.id, count: r.count }))}
 *   value={selectedRule}
 *   onChange={setSelectedRule}
 *   size="small"
 * />
 * ```
 */

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import type { SelectFilterProps } from '@/types';

export function SelectFilter<T extends string = string>({
  label,
  options,
  value,
  onChange,
  size = 'small',
  sx,
}: SelectFilterProps<T>) {
  const labelId = `select-filter-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as T);
  };

  return (
    <FormControl size={size} sx={{ minWidth: 180, ...sx }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select<string>
        labelId={labelId}
        value={value}
        label={label}
        onChange={handleChange}
        aria-label={`Filter by ${label}`}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.count !== undefined
              ? `${option.label} (${option.count.toLocaleString()})`
              : option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
