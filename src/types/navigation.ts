/**
 * Navigation types for the dashboard sidebar.
 */

import type { ReactNode } from 'react';

export interface NavigationItem {
  /** Unique route path */
  href: string;
  /** Display label in sidebar */
  label: string;
  /** MUI Icon component */
  icon: ReactNode;
  /** Brief description for tooltips / accessibility */
  description?: string;
}

export interface NavigationSection {
  /** Section group title (shown above items) */
  title: string;
  /** Nav items within this section */
  items: NavigationItem[];
}
