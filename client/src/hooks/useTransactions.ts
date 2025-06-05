import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  createTransaction as createTransactionApi,
  getTransactionsGroupedByMonth as getTransactionsGroupedByMonthApi,
  deleteTransaction as deleteTransactionApi,
  updateTransaction as updateTransactionApi
} from '@/services/api'
import { Transaction, MonthlyTransactions } from '@/types/transaction'
import { toast } from 'react-hot-toast'
import { useCallback } from 'react'

export const useTransactions = () => {
  const queryClient = useQueryClient()

  const { 
    data: groupedTransactions = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery<MonthlyTransactions[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      try {
        const data = await getTransactionsGroupedByMonthApi()
        // Garante que os valores numéricos sempre existam
        return data.map(month => ({
          ...month,
          totalCredit: month.totalCredit ?? 0,
          totalDebit: month.totalDebit ?? 0,
          transactions: month.transactions.map(t => ({
            ...t,
            amount: t.amount ?? 0
          }))
        }))
      } catch (error) {
        toast.error('Failed to load transactions')
        return []
      }
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  const createMutation = useMutation({
    mutationFn: createTransactionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Transaction created successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create transaction')
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Transaction>) => 
      updateTransactionApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Transaction updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update transaction')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTransactionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Transaction deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete transaction')
    }
  })

  const createTransaction = useCallback(async (transactionData: Omit<Transaction, 'id'>) => {
    try {
      await createMutation.mutateAsync(transactionData)
      return true
    } catch {
      return false
    }
  }, [createMutation])

  const updateTransaction = useCallback(async (id: number, transactionData: Partial<Transaction>) => {
    try {
      await updateMutation.mutateAsync({ id, ...transactionData })
      return true
    } catch {
      return false
    }
  }, [updateMutation])

  const deleteTransaction = useCallback(async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id)
      return true
    } catch {
      return false
    }
  }, [deleteMutation])

  return {
    groupedTransactions,
    loading: isLoading || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    error: error || createMutation.error || updateMutation.error || deleteMutation.error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    refetch
  }
}