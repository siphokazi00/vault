import React, { useState } from 'react'
import Layout from '../components/Layout'
import AddDataModal from '../components/AddDataModal'
import { Plus } from 'lucide-react'
import { useBudgetPlans } from '../hooks/useFinancialData'
import { formatCurrency, formatDate } from '../utils/validation'

const Budget = () => {
  const { budgetPlans, loading, refetch } = useBudgetPlans()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const budgetFields = [
    { name: 'month_year', label: 'Month/Year', type: 'month', required: true },
    { name: 'projected_income', label: 'Projected Income', type: 'number', step: '0.01', min: '0' },
    { name: 'projected_expenditure', label: 'Projected Expenditure', type: 'number', step: '0.01', min: '0' },
    { name: 'actual_income', label: 'Actual Income', type: 'number', step: '0.01', min: '0' },
    { name: 'actual_expenditure', label: 'Actual Expenditure', type: 'number', step: '0.01', min: '0' },
    { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Optional notes about this budget period' }
  ]

  const handleAddBudget = async (formData) => {
    try {
      // Convert month input to first day of month for database
      if (formData.month_year) {
        formData.month_year = formData.month_year + '-01'
      }
      console.log('Adding budget plan:', formData)
      refetch()
    } catch (error) {
      alert('Error adding budget plan: ' + error.message)
    }
  }

  const calculateSurplusDeficit = (actualIncome, actualExpenditure) => {
    return (actualIncome || 0) - (actualExpenditure || 0)
  }

  const getSurplusDeficitClass = (amount) => {
    if (amount > 0) return 'text-green-600 font-semibold'
    if (amount < 0) return 'text-red-600 font-semibold'
    return 'text-gray-600 font-semibold'
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
            <span className="text-4xl">📊</span>
            Planning & Budgeting
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            <Plus size={20} />
            Add Budget Plan
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Month</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Projected Income</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Projected Expenditure</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Actual Income</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Actual Expenditure</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Surplus/Deficit</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {budgetPlans.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No budget plans found. Start by creating your first budget plan.
                    </td>
                  </tr>
                ) : (
                  budgetPlans.map((plan, index) => {
                    const surplusDeficit = calculateSurplusDeficit(plan.actual_income, plan.actual_expenditure)
                    return (
                      <tr key={index} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {formatDate(plan.month_year)}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-semibold">
                          {formatCurrency(plan.projected_income || 0)}
                        </td>
                        <td className="px-6 py-4 text-red-600 font-semibold">
                          {formatCurrency(plan.projected_expenditure || 0)}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-semibold">
                          {formatCurrency(plan.actual_income || 0)}
                        </td>
                        <td className="px-6 py-4 text-red-600 font-semibold">
                          {formatCurrency(plan.actual_expenditure || 0)}
                        </td>
                        <td className={`px-6 py-4 ${getSurplusDeficitClass(surplusDeficit)}`}>
                          {formatCurrency(surplusDeficit)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {plan.notes || '-'}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <AddDataModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBudget}
          fields={budgetFields}
          title="Add New Budget Plan"
        />
      </div>
    </Layout>
  )
}

export default Budget