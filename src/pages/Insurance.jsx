import React, { useState } from 'react'
import Layout from '../components/Layout'
import AddDataModal from '../components/AddDataModal'
import { Plus } from 'lucide-react'
import { useInsurancePolicies } from '../hooks/useFinancialData'
import { formatCurrency, formatDate } from '../utils/validation'

const Insurance = () => {
  const { policies, loading, refetch } = useInsurancePolicies()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const insuranceFields = [
    { name: 'policy_type', label: 'Policy Type', type: 'select', required: true, options: [
      { value: 'life', label: 'Life Insurance' },
      { value: 'car', label: 'Car Insurance' },
      { value: 'home', label: 'Home Insurance' },
      { value: 'medical', label: 'Medical Insurance' },
      { value: 'disability', label: 'Disability Insurance' },
      { value: 'travel', label: 'Travel Insurance' }
    ]},
    { name: 'provider', label: 'Insurance Provider', type: 'text', required: true, placeholder: 'e.g., Old Mutual, Santam' },
    { name: 'coverage_amount', label: 'Coverage Amount', type: 'number', step: '0.01', min: '0' },
    { name: 'monthly_premium', label: 'Monthly Premium', type: 'number', required: true, step: '0.01', min: '0' },
    { name: 'renewal_date', label: 'Renewal Date', type: 'date' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'expired', label: 'Expired' },
      { value: 'cancelled', label: 'Cancelled' }
    ]},
    { name: 'last_claim_date', label: 'Last Claim Date', type: 'date' }
  ]

  const handleAddInsurance = async (formData) => {
    try {
      console.log('Adding insurance policy:', formData)
      refetch()
    } catch (error) {
      alert('Error adding insurance policy: ' + error.message)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatPolicyType = (type) => {
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
            <span className="text-4xl">🛡️</span>
            Insurance Management
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            <Plus size={20} />
            Add Policy
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Policy Type</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Coverage Amount</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Monthly Premium</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Renewal Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Last Claim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {policies.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No insurance policies found. Add your first policy to get started.
                    </td>
                  </tr>
                ) : (
                  policies.map((policy, index) => (
                    <tr key={index} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">
                          {formatPolicyType(policy.policy_type)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {policy.provider}
                      </td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        {policy.coverage_amount ? formatCurrency(policy.coverage_amount) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-red-600 font-semibold">
                        {formatCurrency(policy.monthly_premium)}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {policy.renewal_date ? formatDate(policy.renewal_date) : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policy.status)}`}>
                          {policy.status?.charAt(0).toUpperCase() + policy.status?.slice(1) || 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {policy.last_claim_date ? formatDate(policy.last_claim_date) : 'None'}
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
          onSubmit={handleAddInsurance}
          fields={insuranceFields}
          title="Add New Insurance Policy"
        />
      </div>
    </Layout>
  )
}

export default Insurance