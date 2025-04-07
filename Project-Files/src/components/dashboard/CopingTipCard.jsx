import { Box, Typography } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { motion } from 'framer-motion';
import { glassCard } from '../../styles/glassmorphism';

const MotionBox = motion(Box);

const CopingTipCard = () => {
  // 🚧 Stub: Replace this with dynamic tip from AI model via props or API
  const aiTip = 'Take a 10-minute mindful walk to reset your focus and mood.';

  return (
    <MotionBox
      sx={{
        ...glassCard,
        p: 3,
        height: '100%',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(100, 197, 163, 0.25)',
          transform: 'translateY(-4px)',
        },
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EmojiObjectsIcon color="primary" />
        <Typography variant="h6" fontWeight={700} color="#64c5a3">
          AI Coping Tip
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: '#333', opacity: 0.9 }}>
        {aiTip}
      </Typography>

      {/* 🚀 Your backend team will inject AI-based tips here */}
    </MotionBox>
  );
};

export default CopingTipCard;
