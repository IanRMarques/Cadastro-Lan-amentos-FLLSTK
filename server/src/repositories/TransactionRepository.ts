import { EntityRepository, Repository } from "typeorm";
import { Transaction } from "../entities/Transaction";

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async findByMonthAndYear(month: number, year: number): Promise<Transaction[]> {
    return this.createQueryBuilder("transaction")
      .where("EXTRACT(MONTH FROM transaction.date) = :month", { month })
      .andWhere("EXTRACT(YEAR FROM transaction.date) = :year", { year })
      .orderBy("transaction.date", "ASC")
      .getMany();
  }

  async findAllGroupedByMonth(): Promise<{ month: number; year: number }[]> {
    return this.createQueryBuilder("transaction")
      .select("EXTRACT(MONTH FROM transaction.date) as month")
      .addSelect("EXTRACT(YEAR FROM transaction.date) as year")
      .groupBy("month, year")
      .orderBy("year", "ASC")
      .addOrderBy("month", "ASC")
      .getRawMany();
  }
}