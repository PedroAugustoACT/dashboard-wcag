'use client';

/**
 * ThemeRegistry — Emotion cache + MUI ThemeProvider for App Router SSR.
 *
 * This is a Client Component that:
 * 1. Creates an Emotion cache
 * 2. Uses useServerInsertedHTML to inject styles before content (SSR)
 * 3. Wraps children in MUI ThemeProvider + CssBaseline
 *
 * Must be rendered in the root layout INSIDE <body>.
 *
 * Pattern from: https://mui.com/material-ui/guides/next-js-app-router/
 */

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { theme } from '@/lib/theme';

// Singleton cache ref — created once per server render
let emotionCacheInstance: ReturnType<typeof createCache> | null = null;

function getEmotionCache() {
  if (!emotionCacheInstance) {
    emotionCacheInstance = createCache({ key: 'wcag-dash', prepend: true });
    emotionCacheInstance.compat = true;
  }
  return emotionCacheInstance;
}

interface ThemeRegistryProps {
  children: React.ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: 'wcag-dash', prepend: true });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        // biome-ignore lint: required for Emotion SSR
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
