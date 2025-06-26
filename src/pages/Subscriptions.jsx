import React, { useState } from 'react'
import Layout from '../components/Layout'
import AddDataModal from '../components/AddDataModal'
import { Plus } from 'lucide-react'
import { useSubscriptions } from '../hooks/useFinancialData'
import { formatCurrency, formatDate } from '../utils/validation'

const Subscriptions = () => {
  const { subscriptions, loading, refetch } = useSubscriptions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const subscriptionFields = [
    { name: 'service_name', label: 'Service Name', type: 'text', required: true, placeholder: 'e.g., Netflix, Spotify' },
    { name: 'amount', label: 'Amount', type: 'number', required: true, step: '0.01', min: '0' },
    { name: 'billing_cycle', label: 'Billing Cycle', type: 'select', required: true, options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'annually', label: 'Annually' }
    ]},
    { name: 'renewal_date', label: 'Next Renewal Date', type: 'date' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'cancelled', label: 'Cancelled' },
      { value: 'paused', label: 'Paused' }
    ]}
  ]

  const handleAddSubscription = async (formData) => {
    try {
      console.log('Adding subscription:', formData)
      refetch()
    } catch (error) {
      alert('Error adding subscription: ' + error.message)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
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
            <span className="text-4xl">🔄</span>
            Subscriptions
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            <Plus size={20} />
            Add Subscription
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Billing Cycle</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Next Renewal</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscriptions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No subscriptions found. Add your first subscription to get started.
                    </td>
                  </tr>
                ) : (
                  subscriptions.map((subscription, index) => (
                    <tr key={index} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{subscription.service_name}</div>
                      </td>
                      <td className="px-6 py-4 text-red-600 font-semibold">
                        {formatCurrency(subscription.amount || 0)}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {subscription.billing_cycle?.charAt(0).toUpperCase() + subscription.billing_cycle?.slice(1) || 'Monthly'}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {subscription.renewal_date ? formatDate(subscription.renewal_date) : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status || 'active')}`}>
                          {subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1) || 'Active'}
                        </span>
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
          onSubmit={handleAddSubscription}
          fields={subscriptionFields}
          title="Add New Subscription"
        />
      </div>
    </Layout>
  )
}

export default Subscriptions