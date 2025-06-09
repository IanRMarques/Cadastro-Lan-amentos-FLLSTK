import { Request, Response, NextFunction } from "express";
import { Transaction } from "../entities/Transaction";
import { validate } from "class-validator";

export const validateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = Object.assign(new Transaction(), req.body);
  const errors = await validate(transaction);

  if (errors.length > 0) {
    return res.status(400).json({ message: "Dados inválidos", errors });
  }

  next();
};
