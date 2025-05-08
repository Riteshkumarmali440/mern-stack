import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { sellerLogin } from '../controllers/sellerController.js';

const router = express.Router();

//router.post('/register', upload.single('avatar'), registerUser);
router.post('/sellerLogin', sellerLogin);

// Example protected route:
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

export default router;
