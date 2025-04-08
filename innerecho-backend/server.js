const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const journalRoutes = require('./routes/journalRoutes'); // ✅ fixed this line

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://hardikj112:ZJxCunmdOKOBgIZP@innerecho.zqpckcp.mongodb.net/?retryWrites=true&w=majority&appName=InnerEcho', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected ✅");
}).catch(err => {
  console.error("MongoDB connection error ❌", err);
});

// Simple route
app.get('/', (req, res) => {
  res.send('InnerEcho backend is running ✅');
});

// Journal Routes
app.use('/journal', journalRoutes); // ✅ moved here

//GeminiRoutes
const geminiRoutes = require('./routes/geminiRoutes');
app.use('/gemini', geminiRoutes);


// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { name, nickname, age, gender, occupation, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      nickname,
      age,
      gender,
      occupation,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        age: user.age,
        gender: user.gender,
        occupation: user.occupation
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
