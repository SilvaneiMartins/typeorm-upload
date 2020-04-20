import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import createConnection from './database';

createConnection();
const app = express();

app.use(express.json());
app.use(routes);

app.use((e: Error, request: Request, response: Response, _: NextFunction) => {
  if (e instanceof AppError) {
    return response.status(e.statusCode).json({
      status: 'error',
      message: e.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
