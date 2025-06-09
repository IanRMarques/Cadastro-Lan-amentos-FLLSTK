// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];  // Pegando o token no cabeçalho da requisição

  if (!token) {
    return res.status(403).json({ error: 'Token de autenticação não fornecido!' });
  }

  // Aqui você pode validar o token (com JWT, por exemplo) ou verificar a sessão
  // Simulando a validação do token
  if (token === 'valid-token') {
    next();  // Se o token for válido, passa para o próximo middleware
  } else {
    return res.status(403).json({ error: 'Token inválido!' });
  }
}
