import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDateString, IsEnum, IsNumber, IsPositive, IsString } from "class-validator";

export enum TransactionType {
  Credit = "Crédito",
  Debit = "Débito",
}

@Entity('transaction') // Nome da tabela no banco de dados
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
    enumName: "TransactionType",
    default: TransactionType.Debit,  // Definindo um valor padrão 
  })
  @IsEnum(TransactionType)
  type!: TransactionType;
  constructor(
    date: string,
    description: string,
    value: number,
    type: TransactionType = TransactionType.Debit
  ) {
    this.date = date;
    this.description = description;
    this.value = value;
    this.type = type;
  }
}
