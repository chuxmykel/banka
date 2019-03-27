import express from 'express';
import bodyParser from 'body-parser';
import router from './app/routes/routes';

const apiVersionOne = '/api/v1';
const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(301).redirect(apiVersionOne));
app.use(apiVersionOne, router);

app.listen(port);

export default app;
