import React, { useState, useEffect } from 'react'
import { TransactionType } from '@/types/transaction'
import { format } from 'date-fns'
import { Transaction } from '@/types/transaction'

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => Promise<boolean>
  initialData?: Transaction | null
  onCancel?: () => void
  isSubmitting: boolean
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ 
  onSubmit, 
  initialData, 
  onCancel,
  isSubmitting 
}) => {
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    amount: '',
    type: TransactionType.CREDIT,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date,
        description: initialData.description,
        amount: initialData.amount.toString(),
        type: initialData.type,
      })
    }
  }, [initialData])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.description) newErrors.description = 'Description is required'
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required'
    } else if (isNaN(Number(formData.amount))) {
      newErrors.amount = 'Amount must be a number'
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be positive'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    const success = await onSubmit({
      date: formData.date,
      description: formData.description,
      amount: Number(formData.amount),
      type: formData.type,
    })
    
    if (success && !initialData) {
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        description: '',
        amount: '',
        type: TransactionType.CREDIT,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.date ? 'border-red-500' : 'border'
          }`}
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.description ? 'border-red-500' : 'border'
          }`}
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="text"
          id="amount"
          name="amount"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.amount ? 'border-red-500' : 'border'
          }`}
          value={formData.amount}
          onChange={handleChange}
        />
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="type"
          name="type"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          value={formData.type}
          onChange={handleChange}
        >
          <option value={TransactionType.CREDIT}>Credit</option>
          <option value={TransactionType.DEBIT}>Debit</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : initialData ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  )
}