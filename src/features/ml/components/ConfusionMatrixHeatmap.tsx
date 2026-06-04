/**
 * ConfusionMatrixHeatmap — renders a 2D confusion matrix as a heatmap.
 *
 * SERVER COMPONENT: no interactivity, no browser APIs.
 * Uses MUI sx color tokens instead of useTheme().
 */

import { Card, CardHeader, Divider, Box, Typography } from '@mui/material';

interface ConfusionMatrixHeatmapProps {
  matrix: number[][];
}

/** Maps a cell value to a blue-opacity heatmap background. */
function getCellBg(value: number, maxValue: number): string {
  if (value === 0) return 'background.default';
  const intensity = Math.max(0.1, value / maxValue);
  // Inline rgba — not a theme token but an intentional design constant
  return `rgba(59, 130, 246, ${intensity})`;
}

export function ConfusionMatrixHeatmap({ matrix }: ConfusionMatrixHeatmapProps) {
  const maxValue = Math.max(...matrix.flat());

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={<Typography variant="h5" sx={{ fontWeight: 600 }}>Matriz de Confusão</Typography>}
        subheader="Classes reais versus classes preditas pelo modelo"
      />
      <Divider />
      <Box
        sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        role="table"
        aria-label="Matriz de confusão do modelo de classificação"
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 2, alignItems: 'center' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            role="rowheader"
            sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Classe Real
          </Typography>

          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center', mb: 2 }}
              role="columnheader"
            >
              Classe Predita
            </Typography>

            <Box
              sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}
              role="rowgroup"
            >
              {matrix.map((row, rowIndex) =>
                row.map((val, colIndex) => {
                  const isCorrect = rowIndex === colIndex;
                  return (
                    <Box
                      key={`${rowIndex}-${colIndex}`}
                      role="cell"
                      aria-label={`Real: Classe ${rowIndex}, Predita: Classe ${colIndex} — ${val} ${isCorrect ? 'corretas' : 'incorretas'}`}
                      sx={{
                        width: 100,
                        height: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: getCellBg(val, maxValue),
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        color: val > maxValue / 2 ? '#fff' : 'text.primary',
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {val}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {isCorrect ? 'Correto' : 'Erro'}
                      </Typography>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
