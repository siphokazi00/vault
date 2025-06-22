import React from 'react'
import Layout from '../components/Layout'

const Goals = () => {
  const goals = [
    {
      title: 'Emergency Fund',
      subtitle: '6 months expenses',
      target: 150000,
      current: 85600,
      targetDate: 'Dec 2025',
      monthlyRequired: 9200,
      status: 'On Track'
    },
    {
      title: 'House Deposit',
      subtitle: '20% deposit',
      target: 400000,
      current: 125000,
      targetDate: 'Jun 2027',
      monthlyRequired: 11458,
      status: 'On Track'
    },
    {
      title: 'New Car',
      subtitle: 'Upgrade vehicle',
      target: 350000,
      current: 45000,
      targetDate: 'Jan 2026',
      monthlyRequired: 43571,
      status: 'Behind'
    },
    {
      title: 'Vacation Fund',
      subtitle: 'Europe trip',
      target: 50000,
      current: 38200,
      targetDate: 'Nov 2025',
      monthlyRequired: 2360,
      status: 'Ahead'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800'
      case 'Behind': return 'bg-red-100 text-red-800'
      case 'Ahead': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="text-4xl">🎯</span>
          Financial Goals & Targets
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Goal</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Target Amount</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Current Amount</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Target Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Monthly Required</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {goals.map((goal, index) => {
                  const progress = (goal.current / goal.target) * 100
                  return (
                    <tr key={index} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-800">{goal.title}</div>
                          <div className="text-sm text-gray-500">{goal.subtitle}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        {formatCurrency(goal.target)}
                      </td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        {formatCurrency(goal.current)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {Math.round(progress)}% Complete
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800">{goal.targetDate}</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        {formatCurrency(goal.monthlyRequired)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Goals