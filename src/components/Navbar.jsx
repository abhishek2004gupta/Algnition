import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  // Safe parse user from localStorage
  let user = null;
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.warn('Invalid user JSON in localStorage');
  }

  const nickname = user?.nickname;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        px: { xs: 2, md: 6 },
        py: 1,
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: { xs: '1.3rem', md: '1.5rem' },
              background: 'linear-gradient(90deg, #64c5a3, #f5b04c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            InnerEcho
          </Typography>
        </Link>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="text" sx={navBtnStyle}>
              Features
            </Button>
            <Button variant="text" sx={navBtnStyle}>
              About
            </Button>

            {!user ? (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#64c5a3',
                    color: '#fff',
                    textTransform: 'none',
                    borderRadius: '20px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#80CBC4',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Link>
            ) : (
              <>
                <Typography sx={{ color: '#444', fontWeight: 500 }}>
                  Hi, {nickname || user.name?.split(' ')[0] || 'User'}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    color: '#64c5a3',
                    borderColor: '#64c5a3',
                    borderRadius: '20px',
                    px: 3,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#e0f2f1',
                      borderColor: '#80CBC4',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

const navBtnStyle = {
  color: '#444',
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '1rem',
  '&:hover': {
    color: '#64c5a3',
  },
};

export default Navbar;
