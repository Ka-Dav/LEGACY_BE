import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";

import connectDB from './src/config/db.js';
import routes from './src/routes/index.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Legacy API server'));
app.use('/', routes);

app.listen(port, () => console.log(`Server running on port ${port}!`));
