import React, { useState } from 'react'
import Layout from '../components/Layout'
import AddDataModal from '../components/AddDataModal'
import { Plus } from 'lucide-react'
import { useGoals } from '../hooks/useFinancialData'

const Goals = () => {
  const { goals, addGoal, updateGoal, loading } = useGoals()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const goalFields = [
    { name: 'title', label: 'Goal Title', type: 'text', required: true, placeholder: 'e.g., Emergency Fund' },
    { name: 'target_amount', label: 'Target Amount', type: 'number', required: true, step: '0.01', min: '0' },
    { name: 'current_amount', label: 'Current Amount', type: 'number', step: '0.01', min: '0', placeholder: '0' },
    { name: 'target_date', label: 'Target Date', type: 'date' }
  ]

  const handleAddGoal = async (formData) => {
    const { error } = await addGoal(formData)
    if (error) {
      alert('Error adding goal: ' + error)
    }
  }

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

  const calculateStatus = (current, target, targetDate) => {
    const progress = (current / target) * 100
    if (progress >= 100) return 'Completed'
    if (progress >= 75) return 'On Track'
    if (progress >= 50) return 'Behind'
    return 'Just Started'
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
            <span className="text-4xl">🎯</span>
            Financial Goals & Targets
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            <Plus size={20} />
            Add Goal
          </button>
        </div>
        
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
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {goals.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No goals found. Add your first financial goal to get started.
                    </td>
                  </tr>
                ) : (
                  goals.map((goal, index) => {
                    const progress = ((goal.current_amount || 0) / (goal.target_amount || 1)) * 100
                    const status = calculateStatus(goal.current_amount || 0, goal.target_amount || 1, goal.target_date)
                    return (
                      <tr key={index} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-800">{goal.title}</div>
                        </td>
                        <td className="px-6 py-4 text-green-600 font-semibold">
                          {formatCurrency(goal.target_amount || 0)}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-semibold">
                          {formatCurrency(goal.current_amount || 0)}
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
                        <td className="px-6 py-4 text-gray-800">
                          {goal.target_date ? new Date(goal.target_date).toLocaleDateString('en-ZA') : 'No date set'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                            {status}
                          </span>
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
          onSubmit={handleAddGoal}
          fields={goalFields}
          title="Add New Financial Goal"
        />
      </div>
    </Layout>
  )
}

export default Goals