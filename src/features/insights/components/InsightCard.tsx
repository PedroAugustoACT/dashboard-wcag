/**
 * InsightCard — card displaying an actionable insight and recommendation.
 *
 * SERVER COMPONENT: no interactivity, no browser APIs.
 * Hover animation is CSS-only and respects prefers-reduced-motion.
 */

import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface InsightCardProps {
  title: string;
  value: string | number;
  recommendation: string;
  icon: React.ReactNode;
  color: string;
}

export function InsightCard({ title, value, recommendation, icon, color }: InsightCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
        },
      }}
    >
      {/* Decorative color strip */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 4,
          height: '100%',
          backgroundColor: color,
        }}
      />
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            aria-hidden="true"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: `${color}15`,
              color,
              mr: 2,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', wordBreak: 'break-word', mt: 0.5 }}>
              {value}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 'auto' }}>
          <CheckCircleIcon
            aria-hidden="true"
            sx={{ color: 'success.main', mr: 1, mt: 0.5, fontSize: 20, flexShrink: 0 }}
          />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} gutterBottom>
              Recomendação
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {recommendation}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
