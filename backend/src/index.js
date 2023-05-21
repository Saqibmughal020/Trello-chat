/** @format */

import express from 'express';
import * as path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import cors from 'cors';
import db from './db/index.js';
import Router from './routes.js';
import socketioConfig from './socketIO/socketioConfig.js';

config();
const { PORT } = process.env;
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(morgan('dev'));
try {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('../index.html'));
  });
  db();
  socketioConfig(server);
  app.use('/api', Router);
  server.listen(PORT, () => {
    console.log(`Successfully connected on PORT ${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}
