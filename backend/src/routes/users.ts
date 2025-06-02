
import express from 'express';

const router = express.Router();

// Mock user data for demo
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    transfers: ['TXN1', 'TXN2']
  }
];

// Get user profile
router.get('/profile/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Update user profile
router.put('/profile/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

export { router as userRoutes };
