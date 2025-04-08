import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box, Grid, Typography } from '@mui/material';
import MoodTrackerCard from '../components/dashboard/MoodCard';
import JournalCard from '../components/dashboard/JournalCard';
import CopingTipCard from '../components/dashboard/CopingTipCard';
import EmergencyAlertCard from '../components/dashboard/EmergencyAlertCard';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Dashboard = () => {
  const navigate = useNavigate();

  // Safe user parsing
  let user = null;
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.warn('Invalid user in localStorage');
  }

  const displayName = user?.nickname || user?.name || 'Guest';

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 4, sm: 6 },
          background: 'linear-gradient(to bottom right, #fefcea, #f1daff)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Animated Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            fontWeight={900}
            gutterBottom
            sx={{ textAlign: 'left', color: '#444', mb: 6 }}
          >
            Hello,
            <Box component="span" sx={{ color: '#80CBC4', ml: 1 }}>
              {displayName}
            </Box>
          </Typography>
        </motion.div>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, mb: 4 }}>
          <Grid container spacing={4}>
            {/* Left Column - 70% width */}
            <Grid
              item
              xs={12}
              md={8.4}
              sx={{
                width: '100%',
                '@media (min-width: 900px)': {
                  width: '60%',
                  flex: '0 0 60%',
                },
              }}
            >
              <CopingTipCard />
            </Grid>

            {/* Right Column - 30% width */}
            <Grid
              item
              xs={12}
              md={3.6}
              sx={{
                width: '100%',
                '@media (min-width: 900px)': {
                  width: '32%',
                  flex: '0 0 32%',
                },
              }}
            >
              <Grid container spacing={4} direction="column">
                <Grid item>
                  <MoodTrackerCard />
                </Grid>
                <Grid item>
                  <JournalCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* Emergency Alert - Full width at bottom */}
        <Box sx={{ width: '100%', mt: 'auto' }}>
          <EmergencyAlertCard />
        </Box>
      </MotionBox>
    </>
  );
};

export default Dashboard;
