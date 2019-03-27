import express from 'express';

const router = express.Router();

// Home
router.get('/', (req, res) => res.status(200).send('Welcome to banka'));

export default router;
