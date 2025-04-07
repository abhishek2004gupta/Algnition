import { Box, Typography, Button } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { motion } from 'framer-motion';
import { glassCard } from '../../styles/glassmorphism';

const MotionBox = motion(Box);

const EmergencyAlertCard = () => {
  // 🚧 Stub: Replace with real-time AI-based emergency detection
  const isEmergency = true; // Change to dynamic condition from backend
  const suggestion = 'We detected signs of distress. Would you like to talk to someone?';

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
        backgroundColor: isEmergency ? 'rgba(255, 235, 238, 0.5)' : 'transparent',
        border: isEmergency ? '1.5px solid rgba(244, 67, 54, 0.5)' : '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: isEmergency ? '0 8px 30px rgba(244, 67, 54, 0.2)' : '0 6px 20px rgba(0,0,0,0.1)',
          transform: 'translateY(-4px)',
        },
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberRoundedIcon color="error" />
        <Typography variant="h6" fontWeight={700} color="error.main">
          Emergency Mode
        </Typography>
      </Box>

      <Typography variant="body2" mt={2} sx={{ color: '#333', opacity: 0.9 }}>
        {isEmergency ? suggestion : 'All clear. No immediate alerts detected.'}
      </Typography>

      {isEmergency && (
        <Button
          variant="contained"
          sx={{
            mt: 3,
            alignSelf: 'flex-start',
            backgroundColor: '#f44336',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
            borderRadius: '20px',
            px: 3,
          }}
        >
          Contact Support
        </Button>
      )}
    </MotionBox>
  );
};

export default EmergencyAlertCard;
