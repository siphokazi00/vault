import React, { useState } from 'react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import AddDataModal from '../components/AddDataModal'
import { Plus } from 'lucide-react'
import { useTransactions } from '../hooks/useFinancialData'

const Income = () => {
  const { transactions, addTransaction, loading } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns = [
    { header: 'Date', key: 'date', type: 'date' },
    { header: 'Details', key: 'note' },
    { header: 'Type', key: 'type' },
    { header: 'Amount', key: 'amount', type: 'currency' },
    { header: 'Category', key: 'category' }
  ]

  const transactionFields = [
    { name: 'type', label: 'Type', type: 'select', required: true, options: [
      { value: 'income', label: 'Income' },
      { value: 'expense', label: 'Expense' }
    ]},
    { name: 'amount', label: 'Amount', type: 'number', required: true, step: '0.01', min: '0' },
    { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g., Salary, Groceries, Transport' },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'note', label: 'Description', type: 'text', required: true, placeholder: 'Transaction description' }
  ]

  const handleAddTransaction = async (formData) => {
    const { error } = await addTransaction(formData)
    if (error) {
      alert('Error adding transaction: ' + error)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-4xl">💰</span>
            Income & Expenses
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            <Plus size={20} />
            Add Transaction
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  {columns.map((column, index) => (
                    <th key={index} className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                      No transactions found. Add your first transaction to get started.
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-indigo-50 transition-colors">
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                          <div className={`${
                            column.type === 'currency' 
                              ? transaction.type === 'income' 
                                ? 'text-green-600 font-semibold' 
                                : 'text-red-600 font-semibold'
                              : 'text-gray-800'
                          }`}>
                            {column.type === 'currency' 
                              ? new Intl.NumberFormat('en-ZA', {
                                  style: 'currency',
                                  currency: 'ZAR'
                                }).format(transaction[column.key])
                              : column.type === 'date'
                              ? new Date(transaction[column.key]).toLocaleDateString('en-ZA')
                              : transaction[column.key]
                            }
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <AddDataModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTransaction}
          fields={transactionFields}
          title="Add New Transaction"
        />
      </div>
    </Layout>
  )
}

export default Income