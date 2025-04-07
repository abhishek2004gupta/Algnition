import { Box, Grid, Typography } from '@mui/material';
import MoodTrackerCard from '../components/dashboard/MoodCard';
import JournalInputCard from '../components/dashboard/JournalSummary';
import CopingTipCard from '../components/dashboard/CopingTipCard';
import EmergencyAlertCard from '../components/dashboard/EmergencyAlertCard';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Dashboard = () => {
  return (
    
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: 6,
        background: 'linear-gradient(to bottom right, #fefcea, #f1daff)',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{ textAlign: 'center', color: '#444' }}
      >
        Your Mental Health Dashboard
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <MoodTrackerCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <JournalInputCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <CopingTipCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <EmergencyAlertCard />
        </Grid>
      </Grid>
    </MotionBox>
  );
};

export default Dashboard;
