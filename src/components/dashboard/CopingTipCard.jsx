import { Box, Typography, Avatar } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { motion } from 'framer-motion';
import { glassCard } from '../../styles/glassmorphism';
import MoodIcon from '@mui/icons-material/Mood';

const MotionBox = motion(Box);

const CopingTipCard = () => {
  const aiTip = 'Take a 10-minute mindful walk to reset your focus and mood.';
  const userName = 'Alex'; // 🔁 Later make this dynamic

  return (
    <MotionBox
      sx={{
        ...glassCard,
        p: { xs: 2, sm: 3 },
        height: '92.5%',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 3,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(100, 197, 163, 0.25)',
          transform: 'translateY(-4px)',
        },
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header with Avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          alt="AI Assistant"
          src="/ai-avatar.png" // 🧠 You can replace this with any avatar or illustration
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#888' }}>
            Hey {userName || 'Friend'},
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#64c5a3' }}>
            Here's something to help you today
          </Typography>
        </Box>
      </Box>

      {/* Tip Content */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EmojiObjectsIcon sx={{ color: '#f5b04c' }} />
        <Typography variant="body1" sx={{ color: '#444', fontStyle: 'italic' }}>
          {aiTip}
        </Typography>
      </Box>

      {/* Placeholder for backend injection */}
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Typography variant="caption" sx={{ color: '#aaa' }}>
          Powered by InnerEcho AI 🌿
        </Typography>
      </Box>
    </MotionBox>
  );
};

export default CopingTipCard;
