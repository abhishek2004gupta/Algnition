import React, { useState } from 'react';
import styles from './MoodSelector.module.css';
import { motion } from 'framer-motion';

const moods = [
  { id: 1, label: 'Awful', emoji: '😞', color: '#e57373', tip: 'Take a deep breath and be kind to yourself today.' },
  { id: 2, label: 'Bad', emoji: '😕', color: '#f06292', tip: 'It’s okay to have down days. Try a short walk?' },
  { id: 3, label: 'Okay', emoji: '😐', color: '#FFD54F', tip: 'You’re doing fine. Maybe some journaling?' },
  { id: 4, label: 'Good', emoji: '😊', color: '#81C784', tip: 'Nice! Keep riding this wave of calm.' },
  { id: 5, label: 'Great', emoji: '😄', color: '#4DB6AC', tip: 'Awesome! Spread that joy to someone else too!' },
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const currentMood = moods.find((m) => m.id === selectedMood);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>How are you feeling today?</h3>

      <div className={styles.moodRow}>
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            className={`${styles.moodCard} ${selectedMood === mood.id ? styles.active : ''}`}
            onClick={() => setSelectedMood(mood.id)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundColor: selectedMood === mood.id ? mood.color : '#fff',
              color: selectedMood === mood.id ? '#fff' : '#444',
            }}
          >
            <span className={styles.emoji}>{mood.emoji}</span>
            <span className={styles.label}>{mood.label}</span>
          </motion.button>
        ))}
      </div>

      {currentMood && (
        <motion.div
          className={styles.tipBox}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {currentMood.tip}
        </motion.div>
      )}
    </div>
  );
};

export default MoodSelector;
