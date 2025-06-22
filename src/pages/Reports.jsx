import React from 'react'
import Layout from '../components/Layout'
import { useTransactions, useGoals, useSavingsAccounts, useDebts } from '../hooks/useFinancialData'
import { formatCurrency } from '../utils/validation'
import { PieChart, BarChart3, TrendingUp, TrendingDown } from 'lucide-react'

const Reports = () => {
  const { transactions } = useTransactions()
  const { goals } = useGoals()
  const { accounts } = useSavingsAccounts()
  const { debts } = useDebts()

  // Calculate summary statistics
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0)

  const totalSavings = accounts
    .reduce((sum, a) => sum + parseFloat(a.balance || 0), 0)

  const totalDebt = debts
    .reduce((sum, d) => sum + parseFloat(d.balance || 0), 0)

  const netWorth = totalSavings - totalDebt

  // Calculate goal progress
  const goalsProgress = goals.map(goal => ({
    ...goal,
    progress: ((goal.current_amount || 0) / (goal.target_amount || 1)) * 100
  }))

  // Expense categories analysis
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const category = t.category || 'Other'
      acc[category] = (acc[category] || 0) + parseFloat(t.amount || 0)
      return acc
    }, {})

  const topExpenseCategories = Object.entries(expensesByCategory)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="text-4xl">📊</span>
          Reports & Analytics
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalSavings)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Worth</p>
                <p className={`text-2xl font-bold ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(netWorth)}
                </p>
              </div>
              <PieChart className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Charts and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Expense Categories */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Top Expense Categories</h3>
            <div className="space-y-4">
              {topExpenseCategories.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No expense data available</p>
              ) : (
                topExpenseCategories.map(([category, amount], index) => {
                  const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                          index === 0 ? 'from-red-500 to-red-600' :
                          index === 1 ? 'from-orange-500 to-orange-600' :
                          index === 2 ? 'from-yellow-500 to-yellow-600' :
                          index === 3 ? 'from-green-500 to-green-600' :
                          'from-blue-500 to-blue-600'
                        }`}></div>
                        <span className="font-medium text-gray-800">{category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">{formatCurrency(amount)}</div>
                        <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Goals Progress</h3>
            <div className="space-y-4">
              {goalsProgress.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No goals set yet</p>
              ) : (
                goalsProgress.map((goal, index) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{goal.title}</span>
                      <span className="text-sm text-gray-600">{Math.round(goal.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(goal.progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatCurrency(goal.current_amount || 0)}</span>
                      <span>{formatCurrency(goal.target_amount || 0)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Monthly Cash Flow */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Financial Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-600 mb-2">Monthly Cash Flow</p>
              <p className={`text-2xl font-bold ${(totalIncome - totalExpenses) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalIncome - totalExpenses)}
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-600 mb-2">Savings Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-600 mb-2">Debt-to-Assets Ratio</p>
              <p className="text-2xl font-bold text-purple-600">
                {totalSavings > 0 ? (totalDebt / totalSavings * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Reports