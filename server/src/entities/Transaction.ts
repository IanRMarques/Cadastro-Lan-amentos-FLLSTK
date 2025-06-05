import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "enum", enum: TransactionType })
  type: TransactionType;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}