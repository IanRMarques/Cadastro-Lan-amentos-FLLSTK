// src/middlewares/loggerMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);  // Log da requisição com método HTTP e URL
  next();  // Passa a requisição para o próximo middleware
}
