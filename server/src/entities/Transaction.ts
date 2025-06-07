import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDateString, IsEnum, IsNumber, IsPositive, IsString } from "class-validator";

export enum TransactionType {
  Credit = "Crédito",
  Debit = "Débito",
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;  // Assumindo que o TypeORM irá gerar o valor para 'id'

  @Column()
  @IsDateString()
  date!: string;

  @Column()
  @IsString()
  description!: string;

  @Column()
  @IsNumber()
  @IsPositive()
  value!: number;

  @Column({
    type: "enum",
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  type!: TransactionType;
}
