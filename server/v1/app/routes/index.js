import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../../../swagger.json';
import userRoutes from './users';
import accountRoutes from './accounts';
import transactionRoutes from './transactions';
import otherRoutes from './others';

const router = express.Router();

// Home
router.get('/', (req, res) => res.status(301).redirect('api/v1'));
router.get('/v1', (req, res) => res.status(200).json({
  status: res.statusCode,
  message: 'Welcome to banka API version 1',
}));

// Routes
router.use('/v1/auth', userRoutes);
router.use('/v1/accounts', accountRoutes);
router.use('/v1/transactions', transactionRoutes);
router.use('/v1/user', otherRoutes);
router.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default router;
