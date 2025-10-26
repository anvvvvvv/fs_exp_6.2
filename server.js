const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const logger = require('./middleware/logger');
const bankingRoutes = require('./routes/banking');

dotenv.config();
const app = express();

app.use(express.json());
app.use(logger);

// 🧾 Dummy user credentials (for login demo)
const users = [
  { username: 'user123', password: 'bank@123' },
];

// ✅ Public Route: Login to get JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  // Generate JWT Token
  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login successful', token });
});

// Protected banking routes
app.use('/api/banking', bankingRoutes);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏦 Secure Banking API running on http://localhost:${PORT}`);
});
