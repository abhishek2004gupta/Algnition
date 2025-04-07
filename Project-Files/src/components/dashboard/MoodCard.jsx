import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { glassCard } from '../../styles/glassmorphism';

const MotionBox = motion(Box);

const MoodCard = () => {
  const mood = 'Calm'; // Placeholder mood (you can fetch from props or state later)
  const emoji = '🌿'; // Matching emoji for the mood
  const message = "You’re feeling calm today. Keep up the balance!";

  return (
    <MotionBox
      sx={{
        ...glassCard,
        p: 3,
        borderRadius: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(100, 197, 163, 0.3)',
          transform: 'translateY(-4px)',
        },
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Typography variant="h3" fontWeight={600} mb={1}>
        {emoji}
      </Typography>
      <Typography variant="h6" fontWeight={700} color="#64c5a3">
        Mood: {mood}
      </Typography>
      <Typography variant="body2" mt={1.5} sx={{ maxWidth: 220, color: '#333', opacity: 0.9 }}>
        {message}
      </Typography>
    </MotionBox>
  );
};

export default MoodCard;
