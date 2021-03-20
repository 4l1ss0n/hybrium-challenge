import express from 'express';
import routes from './routes';
import cors from 'cors';
import {v2 as cloud} from 'cloudinary';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
cloud.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME
});
const app = express();
app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(routes);

export default app;