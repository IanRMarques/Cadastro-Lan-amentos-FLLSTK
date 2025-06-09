// src/middlewares/errorMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);  // Loga o erro no servidor
  res.status(500).json({ error: 'Algo deu errado no servidor!' });  // Retorna um erro genérico
}
