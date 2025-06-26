import React, { useState } from 'react'
import Layout from '../components/Layout'
import AddDataModal from '../components/AddDataModal'
import { Plus } from 'lucide-react'
import { useDebts } from '../hooks/useFinancialData'
import { formatCurrency, formatDate } from '../utils/validation'

const Debt = () => {
  const { debts, loading, refetch } = useDebts()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const debtFields = [
    { name: 'creditor', label: 'Creditor', type: 'text', required: true, placeholder: 'e.g., ABSA, Standard Bank' },
    { name: 'debt_type', label: 'Debt Type', type: 'select', required: true, options: [
      { value: 'home_loan', label: 'Home Loan' },
      { value: 'vehicle_finance', label: 'Vehicle Finance' },
      { value: 'credit_card', label: 'Credit Card' },
      { value: 'personal_loan', label: 'Personal Loan' },
      { value: 'store_account', label: 'Store Account' },
      { value: 'student_loan', label: 'Student Loan' }
    ]},
    { name: 'balance', label: 'Outstanding Balance', type: 'number', required: true, step: '0.01', min: '0' },
    { name: 'monthly_payment', label: 'Monthly Payment', type: 'number', step: '0.01', min: '0' },
    { name: 'interest_rate', label: 'Interest Rate (%)', type: 'number', step: '0.01', min: '0', max: '100' },
    { name: 'payment_due_date', label: 'Payment Due Date (Day of Month)', type: 'number', min: '1', max: '31' }
  ]

  const handleAddDebt = async (formData) => {
    try {
      console.log('Adding debt:', formData)
      refetch()
    } catch (error) {
      alert('Error adding debt: ' + error.message)
    }
  }

  const formatDebtType = (type) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
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
            <span className="text-4xl">⚠️</span>
            Debt & Credit
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            <Plus size={20} />
            Add Debt
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Creditor</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Debt Type</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Monthly Payment</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Interest Rate</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {debts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No debts found. Add your first debt account to get started.
                    </td>
                  </tr>
                ) : (
                  debts.map((debt, index) => (
                    <tr key={index} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{debt.creditor}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {formatDebtType(debt.debt_type || 'personal_loan')}
                      </td>
                      <td className="px-6 py-4 text-red-600 font-semibold">
                        {formatCurrency(debt.balance || 0)}
                      </td>
                      <td className="px-6 py-4 text-red-600 font-semibold">
                        {formatCurrency(debt.monthly_payment || 0)}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {debt.interest_rate ? `${debt.interest_rate}%` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {debt.payment_due_date ? `${debt.payment_due_date}th of month` : 'N/A'}
                      </td>
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
          onSubmit={handleAddDebt}
          fields={debtFields}
          title="Add New Debt Account"
        />
      </div>
    </Layout>
  )
}

export default Debt