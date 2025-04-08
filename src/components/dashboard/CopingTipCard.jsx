import { Box, Typography, Avatar, TextField, Button } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { motion } from 'framer-motion';
import { glassCard } from '../../styles/glassmorphism';
import { useState } from 'react';

const MotionBox = motion(Box);

const CopingTipCard = () => {
  const [userInput, setUserInput] = useState('');
  const [aiTip, setAiTip] = useState('');
  const userName = 'Alex'; // 🔁 Later make dynamic

  const fetchTip = async () => {
    if (!userInput.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/ai-tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      setAiTip(data.summary || 'No tip generated.');
    } catch (err) {
      console.error(err);
      setAiTip('Something went wrong. Try again.');
    }
  };

  return (
    <MotionBox
      sx={{
        ...glassCard,
        p: { xs: 2, sm: 3 },
        height: '92.5%',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 3,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header with Avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar alt="AI Assistant" src="/ai-avatar.png" sx={{ width: 48, height: 48 }} />
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#888' }}>
            Hey {userName || 'Friend'},
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#64c5a3' }}>
            Share what’s on your mind
          </Typography>
        </Box>
      </Box>

      {/* Input box */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Type how you're feeling..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" onClick={fetchTip} sx={{ bgcolor: '#64c5a3' }}>
          Send
        </Button>
      </Box>

      {/* Tip Content */}
      {aiTip && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiObjectsIcon sx={{ color: '#f5b04c' }} />
          <Typography variant="body1" sx={{ color: '#444', fontStyle: 'italic' }}>
            {aiTip}
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Typography variant="caption" sx={{ color: '#aaa' }}>
          Powered by InnerEcho AI 🌿
        </Typography>
      </Box>
    </MotionBox>
  );
};

export default CopingTipCard;
