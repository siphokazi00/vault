import React from 'react'
import Layout from '../components/Layout'
import { useInsurancePolicies } from '../hooks/useFinancialData'
import { formatCurrency, formatDate } from '../utils/validation'

const Insurance = () => {
  const { policies, loading, error } = useInsurancePolicies()

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
            Error loading insurance data: {error}
          </div>
        </div>
      </Layout>
    )
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

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="text-4xl">🛡️</span>
          Insurance Management
        </h2>
        
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
                          {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
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
      </div>
    </Layout>
  )
}

export default Insurance