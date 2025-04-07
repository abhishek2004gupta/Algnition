import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        py: 2,
        background: 'rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <Typography variant="body2">
        © 2025 InnerEcho ·{' '}
        <Link href="#" color="inherit" underline="hover">
          GitHub
        </Link>{' '}
        ·{' '}
        <Link href="#" color="inherit" underline="hover">
          Contact
        </Link>
      </Typography>
    </Box>
  );
}
