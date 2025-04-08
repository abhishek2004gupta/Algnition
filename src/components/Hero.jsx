import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Hero = () => (
  <Box
    sx={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      px: 2,
      py: 4,
      background: 'linear-gradient(135deg, #fefcea, #fffef4)',
    }}
  >
    <Typography
      variant="h2"
      fontWeight={800}
      sx={{
        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
        background: 'linear-gradient(to right, #80cbc4, #ffb433)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      InnerEcho
    </Typography>

    <Typography
      variant="subtitle1"
      sx={{
        maxWidth: 600,
        mt: 2,
        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.25rem' },
        color: '#333',
        opacity: 0.85,
      }}
    >
      Nurture your mind. Grow your garden.
    </Typography>

    <Button
      component={Link}
      to="/dashboard"
      variant="contained"
      sx={{
        mt: 4,
        px: 4,
        py: 1.5,
        fontSize: '1rem',
        backgroundColor: '#64c5a3',
        '&:hover': {
          backgroundColor: '#4aa88a',
        },
        borderRadius: '25px',
        boxShadow: '0 4px 20px rgba(100, 197, 163, 0.3)',
      }}
    >
      Get Started
    </Button>
  </Box>
);

export default Hero;
