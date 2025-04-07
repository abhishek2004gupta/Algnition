import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { glassCard } from '../../styles/glassmorphism';

const MotionBox = motion(Box);

const JournalSummary = () => {
  // Placeholder journal entry
  const entryPreview = `"I’ve been feeling overwhelmed but I’m proud of taking small steps today..."`;
  const date = 'April 7, 2025';

  return (
    <MotionBox
      sx={{
        ...glassCard,
        p: 3,
        height: '100%',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(245, 176, 76, 0.2)',
          transform: 'translateY(-4px)',
        },
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        color="#f5b04c"
        sx={{ mb: 1 }}
      >
        Latest Journal Entry
      </Typography>

      <Typography
        variant="body2"
        sx={{ fontStyle: 'italic', color: '#333', opacity: 0.9, mb: 2 }}
      >
        {entryPreview}
      </Typography>

      <Typography
        variant="caption"
        sx={{ alignSelf: 'flex-end', color: '#666' }}
      >
        {date}
      </Typography>
    </MotionBox>
  );
};

export default JournalSummary;
