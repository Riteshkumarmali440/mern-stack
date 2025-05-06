import express from 'express';
import { registerUser, loginUser, upload } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);

// Example protected route:
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

export default router;
