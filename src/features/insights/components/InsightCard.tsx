/**
 * InsightCard — professional analytical insight section.
 *
 * SERVER COMPONENT: no interactivity, no browser APIs.
 * Renders a single Insight object from the new insights.json schema.
 * Hover animation is CSS-only and respects prefers-reduced-motion.
 */

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { Insight } from '@/types';

/** Accent palette — one colour per insight id (cycles if needed). */
const ACCENT_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface InsightCardProps {
  insight: Insight;
}

export function InsightCard({ insight }: InsightCardProps) {
  const accentColor = ACCENT_COLORS[(insight.id - 1) % ACCENT_COLORS.length];

  return (
    <Card
      component="article"
      aria-labelledby={`insight-title-${insight.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 },
      }}
    >
      {/* Decorative left accent bar */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 5,
          height: '100%',
          background: `linear-gradient(180deg, ${accentColor}, ${accentColor}88)`,
        }}
      />

      <CardContent sx={{ p: 3, pl: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* ── Header ── */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            aria-hidden="true"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: `${accentColor}18`,
              color: accentColor,
              flexShrink: 0,
              mt: 0.25,
            }}
          >
            <LightbulbIcon fontSize="small" />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="overline"
              sx={{ color: accentColor, fontWeight: 700, lineHeight: 1, letterSpacing: '0.08em' }}
            >
              Insight {insight.id}
            </Typography>
            <Typography
              id={`insight-title-${insight.id}`}
              variant="h6"
              sx={{ fontWeight: 700, lineHeight: 1.3, mt: 0.5 }}
            >
              {insight.titulo}
            </Typography>
          </Box>
        </Box>

        {/* ── Description ── */}
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {insight.descricao}
        </Typography>

        <Divider />

        {/* ── Evidence ── */}
        <Box component="section" aria-label="Evidências">
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 0.75 }}
          >
            <FiberManualRecordIcon sx={{ fontSize: 10, color: accentColor }} aria-hidden="true" />
            Evidências
          </Typography>

          <List dense disablePadding aria-label={`Evidências do Insight ${insight.id}`}>
            {insight.evidencias.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ alignItems: 'flex-start', mb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 20, mt: 0.6 }}>
                  <FiberManualRecordIcon
                    aria-hidden="true"
                    sx={{ fontSize: 7, color: 'text.disabled' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  slotProps={{
                    primary: { variant: 'body2', color: 'text.secondary', sx: { lineHeight: 1.6 } },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        {/* ── Practical Impact ── */}
        <Box component="section" aria-label="Impacto prático" sx={{ mt: 'auto' }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.75 }}
          >
            <TrendingUpIcon sx={{ fontSize: 16, color: accentColor }} aria-hidden="true" />
            Impacto Prático
          </Typography>

          <Box
            component="ul"
            aria-label={`Impactos práticos do Insight ${insight.id}`}
            sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            {insight.impacto_pratico.map((item, index) => (
              <Box
                component="li"
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  p: 1.25,
                  borderRadius: 1.5,
                  bgcolor: `${accentColor}0d`,
                  border: `1px solid ${accentColor}28`,
                }}
              >
                <TrendingUpIcon
                  aria-hidden="true"
                  sx={{ fontSize: 15, color: accentColor, flexShrink: 0, mt: 0.3 }}
                />
                <Typography variant="body2" sx={{ lineHeight: 1.6, fontWeight: 500 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
}
