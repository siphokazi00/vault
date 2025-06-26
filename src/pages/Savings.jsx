import React, { useState } from 'react'
import Layout from '../components/Layout'
import AddDataModal from '../components/AddDataModal'
import { Plus } from 'lucide-react'
import { useSavingsAccounts } from '../hooks/useFinancialData'
import { formatCurrency, formatDate } from '../utils/validation'

const Savings = () => {
  const { accounts, loading, refetch } = useSavingsAccounts()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const savingsFields = [
    { name: 'institution', label: 'Institution', type: 'text', required: true, placeholder: 'e.g., FNB, Standard Bank' },
    { name: 'account_type', label: 'Account Type', type: 'select', required: true, options: [
      { value: 'savings', label: 'Savings Account' },
      { value: 'investment', label: 'Investment Account' },
      { value: 'tfsa', label: 'Tax-Free Savings Account' },
      { value: 'retirement', label: 'Retirement Account' },
      { value: 'money_market', label: 'Money Market Account' }
    ]},
    { name: 'balance', label: 'Current Balance', type: 'number', required: true, step: '0.01', min: '0' },
    { name: 'interest_rate', label: 'Interest Rate (%)', type: 'number', step: '0.01', min: '0', max: '100' }
  ]

  const handleAddSavings = async (formData) => {
    try {
      // Here you would call your savings service
      console.log('Adding savings account:', formData)
      // For now, just refresh the data
      refetch()
    } catch (error) {
      alert('Error adding savings account: ' + error.message)
    }
  }

  const formatAccountType = (type) => {
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
            <span className="text-4xl">📈</span>
            Savings & Investments
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            <Plus size={20} />
            Add Account
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Institution</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Account Type</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Interest Rate</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {accounts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No savings accounts found. Add your first account to get started.
                    </td>
                  </tr>
                ) : (
                  accounts.map((account, index) => (
                    <tr key={index} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{account.institution}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {formatAccountType(account.account_type || 'savings')}
                      </td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        {formatCurrency(account.balance || 0)}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {account.interest_rate ? `${account.interest_rate}%` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {account.updated_at ? formatDate(account.updated_at) : 'N/A'}
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
          onSubmit={handleAddSavings}
          fields={savingsFields}
          title="Add New Savings Account"
        />
      </div>
    </Layout>
  )
}

export default Savings