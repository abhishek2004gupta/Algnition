import React, { useRef, useState, useEffect } from 'react';
import {
  Card, CardContent, TextField, Button, Typography,
  Box, Divider, Dialog, DialogTitle, DialogContent,
  DialogActions, CircularProgress
} from '@mui/material';
import html2canvas from 'html2canvas';
import { summarizeJournals } from '../../utils/geminiService';

const JournalCard = () => {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const journalRef = useRef();

  useEffect(() => {
    const fetchEntries = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?._id) return;

      try {
        const res = await fetch(`http://localhost:5000/journal/${user._id}`);
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEntries();
  }, []);

  const handleDownload = async () => {
    if (journalRef.current) {
      const canvas = await html2canvas(journalRef.current);
      const link = document.createElement('a');
      link.download = `journal-entry-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleSave = async () => {
    if (entry.trim()) {
      const user = JSON.parse(localStorage.getItem('user'));
      const newEntry = { email: user.email, text: entry };

      try {
        const res = await fetch('http://localhost:5000/journal/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry),
        });

        const data = await res.json();
        setEntries((prev) => [data.entry, ...prev]);
        setEntry('');
      } catch (err) {
        console.error(err);
        alert('Failed to save journal.');
      }
    }
  };

  const handleSummarize = async () => {
    setLoadingSummary(true);
    setOpenModal(true);
    try {
      const result = await summarizeJournals(entries);
      setSummary(result);
    } catch (err) {
      console.error(err);
      setSummary('⚠️ Failed to summarize journal.');
    }
    setLoadingSummary(false);
  };

  return (
    <>
      <Card
        ref={journalRef}
        sx={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
          padding: '2rem',
          margin: '2rem auto',
          color: '#f5b04c',
          maxWidth: '500px',
          width: '100%',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', marginBottom: '1rem', color: '#f5b04c' }}
          >
            Daily Journal
          </Typography>

          <TextField
            multiline
            rows={6}
            placeholder="Write how you feel today..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              '& .MuiInputBase-root': {
                color: '#333',
              }
            }}
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleDownload} variant="outlined" sx={{ color: '#f5b04c', borderColor: '#f5b04c' }}>
              Download as Image
            </Button>
            <Button onClick={handleSave} variant="contained" sx={{
              backgroundColor: '#f5b04c', color: 'white',
              '&:hover': { backgroundColor: '#e19a39' }
            }}>
              Save
            </Button>
            <Button onClick={handleSummarize} variant="contained" sx={{
              backgroundColor: '#f5b04c', color: 'white',
              '&:hover': { backgroundColor: '#e19a39' }
            }}>
              Summarize Week
            </Button>
          </Box>

          {entries?.length > 0 && (
            <>
              <Divider sx={{ my: 3, borderColor: '#f5b04c' }} />
              <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
                Previous Entries
              </Typography>
              {entries.map((e, idx) => {
                if (!e || !e.text) return null;
                const displayDate = e.date ? new Date(e.date).toLocaleDateString() : 'Date not available';
                return (
                  <Box key={e._id || idx} mb={1}>
                    <Typography variant="caption" color="textSecondary">
                      {displayDate}
                    </Typography>
                    <Typography variant="body2">
                      {e.text.slice(0, 80)}...
                    </Typography>
                  </Box>
                );
              })}
            </>
          )}
        </CardContent>
      </Card>

      {/* Summary Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#f5b04c', fontWeight: 'bold' }}>
          🌿 Weekly Reflection
        </DialogTitle>

        <DialogContent dividers>
          {loadingSummary ? (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
              <CircularProgress sx={{ color: '#f5b04c' }} />
            </Box>
          ) : (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {summary}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)} sx={{ color: '#f5b04c' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JournalCard;
