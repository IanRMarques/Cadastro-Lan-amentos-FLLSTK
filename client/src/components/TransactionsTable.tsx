import React, { useState } from 'react'
import { MonthlyTransactions } from '@/types/transaction'
import { format, parseISO } from 'date-fns'
import { TransactionForm } from './TransactionForm'
import { Modal } from './Modal'
import { Transaction } from '@/types/transaction'

interface TransactionsTableProps {
  groupedTransactions: MonthlyTransactions[]
  onDelete: (id: number) => Promise<void>
  onUpdate: (id: number, transaction: Partial<Transaction>) => Promise<void>
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  groupedTransactions, 
  onDelete,
  onUpdate
}) => {
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getMonthName = (month: number) => {
    const date = new Date(2000, month - 1, 1)
    return format(date, 'MMMM')
  }

  const handleEdit = (transaction: Transaction) => {
    setEditTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleUpdate = async (updatedTransaction: Omit<Transaction, 'id'>): Promise<boolean> => {
    if (editTransaction) {
      try {
        // Tente fazer a atualização
        await onUpdate(editTransaction.id, updatedTransaction);
        setIsModalOpen(false);
        setEditTransaction(null);
        return true; // Sucesso
      } catch (error) {
        console.error(error);
        return false; // Falha
      }
    }
    return false;
  }

  return (
    <div className="space-y-8">
      {groupedTransactions.map((monthData) => (
        <div key={`${monthData.month}-${monthData.year}`} className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize">
              {getMonthName(monthData.month)} {monthData.year}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthData.transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(parseISO(transaction.date), 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))} 
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={2} className="px-6 py-3 text-sm font-medium text-gray-900">
                    Totals
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-green-600">
                    {formatCurrency(monthData.totalCredit)}
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-red-600">
                    {formatCurrency(monthData.totalDebit)}
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">
                    Balance: {formatCurrency(monthData.totalCredit - monthData.totalDebit)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Transaction">
        {editTransaction && (
          <TransactionForm
            onSubmit={handleUpdate}
            initialData={editTransaction}
            onCancel={() => setIsModalOpen(false)}
            isSubmitting={false}
          />
        )}
      </Modal>
    </div>
  )
}
