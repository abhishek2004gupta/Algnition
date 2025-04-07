import { Grid, Typography, Box, Paper } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const features = [
  {
    icon: <MoodIcon fontSize="large" />,
    title: 'Mood Tracking',
    desc: 'Detects emotion through face and voice to help you stay aware.',
  },
  {
    icon: <PsychologyIcon fontSize="large" />,
    title: 'Coping Strategies',
    desc: 'Get personalized activities and techniques to manage stress.',
  },
  {
    icon: <GTranslateIcon fontSize="large" />,
    title: 'Multilingual Support',
    desc: 'Available in multiple languages for inclusivity.',
  },
  {
    icon: <LocalHospitalIcon fontSize="large" />,
    title: 'Emergency Mode',
    desc: 'Detects distress and alerts emergency contacts safely.',
  },
];

export default function Features() {
  return (
    <Box sx={{ py: 8, px: 4, background: '#f0f4ff' }}>
      <Typography variant="h4" textAlign="center" mb={5}>
        Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              {feat.icon}
              <Typography variant="h6" mt={2}>
                {feat.title}
              </Typography>
              <Typography variant="body2">{feat.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
