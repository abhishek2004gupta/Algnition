import { Box, Typography, Avatar, TextField, Button } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { motion } from 'framer-motion';
import { glassCard } from '../../styles/glassmorphism';
import { useState } from 'react';

const MotionBox = motion(Box);

const CopingTipCard = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const userName = 'Alex'; // 🔁 Later make dynamic

  const fetchReply = async () => {
    if (!userInput.trim()) return;

    const updatedMessages = [
      ...conversation,
      { role: 'user', content: userInput }
    ];

    try {
      const res = await fetch('http://localhost:5100/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      const botReply = data.reply || 'Sorry, something went wrong.';

      setConversation([
        ...updatedMessages,
        { role: 'assistant', content: botReply }
      ]);
      setUserInput('');
    } catch (err) {
      console.error(err);
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
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar alt="AI Assistant" src="/ai-avatar.png" sx={{ width: 48, height: 48 }} />
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#888' }}>
            Hey {userName},
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#64c5a3' }}>
            I'm here for you 💬
          </Typography>
        </Box>
      </Box>

      {/* Conversation Box */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 1,
          border: '1px solid #eee',
          borderRadius: '10px',
          bgcolor: '#f9f9f9',
        }}
      >
        {conversation.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              bgcolor: msg.role === 'user' ? '#d4f3ef' : '#ffffff',
              px: 2,
              py: 1,
              borderRadius: 2,
              maxWidth: '75%',
              boxShadow: 1,
              color: '#333',
            }}
          >
            <Typography variant="body2">{msg.content}</Typography>
          </Box>
        ))}
      </Box>

      {/* Input */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Type how you're feeling..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" onClick={fetchReply} sx={{ bgcolor: '#64c5a3' }}>
          Send
        </Button>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Typography variant="caption" sx={{ color: '#aaa' }}>
          Powered by InnerEcho AI 🌿
        </Typography>
      </Box>
    </MotionBox>
  );
};

export default CopingTipCard;
