import { Box, Grid, Paper, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { glassCard } from '../styles/glassmorphism';

const features = [
  {
    icon: <EmojiEmotionsIcon sx={{ fontSize: 40, color: '#64c5a3' }} />,
    title: 'Emotion Detection',
    desc: 'Track emotions from voice and video with our advanced AI technology.',
  },
  {
    icon: <FavoriteBorderIcon sx={{ fontSize: 40, color: '#f48fb1' }} />,
    title: 'Coping Strategies',
    desc: 'Personalized support and wellness suggestions tailored just for you.',
  },
  {
    icon: <WarningAmberIcon sx={{ fontSize: 40, color: '#ff8a65' }} />,
    title: 'Emergency Mode',
    desc: 'Detect crisis and suggest immediate help when you need it most.',
  },
  {
    icon: <GTranslateIcon sx={{ fontSize: 40, color: '#9575cd' }} />,
    title: 'Multilingual Support',
    desc: 'Support in multiple languages to help everyone grow.',
  },
];

const FeaturesSection = () => (
  <Box sx={{ px: { xs: 2, sm: 6 }, py: 10, background: '#fffef4' }}>
    <Grid container spacing={4} justifyContent="center">
      {features.map((f, i) => (
        <Grid item xs={12} sm={6} md={5} key={i} display="flex" justifyContent="center">
          <Paper
            sx={{
              ...glassCard,
              p: 3,
              minHeight: 220,
              width: '100%',
              maxWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
              },
            }}
          >
            <Box>{f.icon}</Box>
            <Typography variant="h6" fontWeight={600} mt={2}>
              {f.title}
            </Typography>
            <Typography variant="body2" mt={1} sx={{ color: '#444' }}>
              {f.desc}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default FeaturesSection;
