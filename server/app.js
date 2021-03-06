import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import debug from 'debug';
import morgan from 'morgan';
import router from './v1/app/routes';
import ErrorHandler from './v1/app/middlewares/erroHandler';

const port = process.env.PORT || 5000;
const app = express();
const log = debug('dev');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.status(301).redirect('/api'));
app.use('/api', router);

app.use('*', (req, res) => res.status(404).json({
  status: res.statusCode,
  error: 'Oops! Endpoint not found. Please check that you are making the correct request',
}));

app.use(ErrorHandler.sendError);

app.listen(port, log(`app is live and listening on port ${port}`));

export default app;
