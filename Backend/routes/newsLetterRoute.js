import express from 'express';
import { sendNewsletterEmail } from '../controllers/newsletterController.js';

const router = express.Router();

router.post('/send-email', sendNewsletterEmail);

export default router;
