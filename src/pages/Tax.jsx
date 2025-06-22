import React from 'react'
import Layout from '../components/Layout'
import { useTaxData } from '../hooks/useFinancialData'
import { formatCurrency, formatDate } from '../utils/validation'

const Tax = () => {
  const { taxRecords, deductionsTracker, loading, error } = useTaxData()

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
            Error loading tax data: {error}
          </div>
        </div>
      </Layout>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'assessed': return 'bg-green-100 text-green-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDeductionType = (type) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="text-4xl">📋</span>
          Tax Planning
        </h2>
        
        {/* Tax Records Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Tax Year</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Taxable Income</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Tax Payable</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Deductions Claimed</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Refund/Owing</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">SARS Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Submission Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {taxRecords.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No tax records found. Add your tax information to get started.
                    </td>
                  </tr>
                ) : (
                  taxRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{record.tax_year}</div>
                        <div className="text-sm text-gray-500">
                          {record.tax_year === new Date().getFullYear() ? 'Current Year' : 'Filed'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        {formatCurrency(record.taxable_income || 0)}
                      </td>
                      <td className="px-6 py-4 text-red-600 font-semibold">
                        {formatCurrency(record.tax_payable || 0)}
                      </td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        {formatCurrency(record.deductions_claimed || 0)}
                      </td>
                      <td className="px-6 py-4">
                        {record.refund_amount > 0 ? (
                          <span className="text-green-600 font-semibold">
                            {formatCurrency(record.refund_amount)}
                          </span>
                        ) : record.amount_owing > 0 ? (
                          <span className="text-red-600 font-semibold">
                            -{formatCurrency(record.amount_owing)}
                          </span>
                        ) : (
                          <span className="text-gray-600">In Progress</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.sars_status)}`}>
                          {record.sars_status.charAt(0).toUpperCase() + record.sars_status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {record.submission_date ? formatDate(record.submission_date) : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deductions Tracker */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            Current Year Deductions Tracker
          </h3>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Deduction Type</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">YTD Amount</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Annual Limit</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Remaining</th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Last Entry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {deductionsTracker.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No deduction tracking data found. Start tracking your deductions for the current tax year.
                      </td>
                    </tr>
                  ) : (
                    deductionsTracker.map((deduction, index) => {
                      const remaining = deduction.annual_limit ? deduction.annual_limit - (deduction.ytd_amount || 0) : null
                      return (
                        <tr key={index} className="hover:bg-indigo-50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-800">
                            {formatDeductionType(deduction.deduction_type)}
                          </td>
                          <td className="px-6 py-4 text-green-600 font-semibold">
                            {formatCurrency(deduction.ytd_amount || 0)}
                          </td>
                          <td className="px-6 py-4 text-gray-800">
                            {deduction.annual_limit ? formatCurrency(deduction.annual_limit) : 'No Limit'}
                          </td>
                          <td className="px-6 py-4 text-green-600 font-semibold">
                            {remaining !== null ? formatCurrency(Math.max(0, remaining)) : '-'}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {deduction.last_updated ? formatDate(deduction.last_updated) : '-'}
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
      </div>
    </Layout>
  )
}

export default Tax