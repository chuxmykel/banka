import express from 'express';
import bodyParser from 'body-parser';
import router from './app/routes';

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(301).redirect('/api'));
app.use('/api', router);

app.use('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Oops! Endpoint not found. Please check that you are making the correct request',
}));

app.listen(port);

export default app;
