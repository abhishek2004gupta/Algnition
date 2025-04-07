import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

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
        {/* Logo */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ fontSize: { xs: '1.3rem', md: '1.5rem' } }}
        >
          <span style={{ color: '#64c5a3' }}>Inner</span>
          <span style={{ color: '#f5b04c' }}>Echo</span>
        </Typography>

        {/* Navigation Buttons */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="text" sx={navBtnStyle}>Features</Button>
            <Button variant="text" sx={navBtnStyle}>About</Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#64c5a3',
                color: '#fff',
                textTransform: 'none',
                borderRadius: '20px',
                px: 3,
                '&:hover': {
                  backgroundColor: '#57b392',
                },
              }}
            >
              Sign In
            </Button>
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
