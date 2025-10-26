// routes/banking.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock account data (for demo)
const accounts = {
  'user123': { balance: 5000, currency: 'USD' },
};

// ✅ Protected: Get account balance
router.get('/balance', auth, (req, res) => {
  const username = req.user.username;
  const account = accounts[username];

  if (!account) return res.status(404).json({ error: 'Account not found' });

  res.json({ username, balance: account.balance, currency: account.currency });
});

// ✅ Protected: Deposit funds
router.post('/deposit', auth, (req, res) => {
  const username = req.user.username;
  const { amount } = req.body;

  if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid deposit amount' });

  accounts[username].balance += amount;
  res.json({ message: `Deposited $${amount}`, newBalance: accounts[username].balance });
});

module.exports = router;
