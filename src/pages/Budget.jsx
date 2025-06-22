import React from 'react'
import Layout from '../components/Layout'
import { useBudgetPlans } from '../hooks/useFinancialData'
import { formatCurrency, formatDate } from '../utils/validation'

const Budget = () => {
  const { budgetPlans, loading, error } = useBudgetPlans()

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Error loading budget data: {error}
          </div>
        </div>
      </Layout>
    )
  }

  const calculateSurplusDeficit = (actualIncome, actualExpenditure) => {
    return actualIncome - actualExpenditure
  }

  const getSurplusDeficitClass = (amount) => {
    if (amount > 0) return 'text-green-600 font-semibold'
    if (amount < 0) return 'text-red-600 font-semibold'
    return 'text-gray-600 font-semibold'
  }

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="text-4xl">📊</span>
          Planning & Budgeting
        </h2>
        
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
                    const surplusDeficit = calculateSurplusDeficit(plan.actual_income || 0, plan.actual_expenditure || 0)
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
      </div>
    </Layout>
  )
}

export default Budget