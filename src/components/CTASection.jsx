import { Box, Typography, Button } from '@mui/material';

export default function CTASection() {
  return (
    <Box
      sx={{
        py: 6,
        px: 4,
        background: 'linear-gradient(to right, #89f7fe, #66a6ff)',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Take control of your mental wellness today.
      </Typography>
      <Button variant="contained" color="secondary" size="large" href="/dashboard">
        Launch Dashboard
      </Button>
    </Box>
  );
}
