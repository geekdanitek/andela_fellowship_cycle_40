import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import meetupRoutes from './routes/meetupRoutes';
import questionRoutes from './routes/questionRoutes';

dotenv.config();

const port = process.env.PORT || 2000;

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/v1', questionRoutes);
app.use('/api/v1', meetupRoutes);

app.use((req, res)=> {
	res.status(404).json({status: 404, error: 'resource not found on the server'});
})

app.listen(port);

export default app;
