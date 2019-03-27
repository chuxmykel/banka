import express from 'express';
import userRoutes from './users';

const router = express.Router();

// Home
router.get('/', (req, res) => res.status(301).redirect('api/v1'));
router.get('/v1', (req, res) => res.status(200).json({
  status: res.statusCode,
  message: 'Welcome to banka API version 1',
}));

// Routes
router.use('/v1/auth', userRoutes);

export default router;
