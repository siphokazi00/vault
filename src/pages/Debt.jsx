import React from 'react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'

const Debt = () => {
  const columns = [
    { header: 'Date', key: 'date', type: 'date' },
    { header: 'Details', key: 'description' },
    { header: 'Amount', key: 'amount', type: 'currency' },
    { header: 'Balance', key: 'balance', type: 'currency' }
  ]

  const data = [
    {
      date: '2025-01-15',
      description: 'Home Loan Payment - ABSA',
      amount: -8500,
      balance: 1250000
    },
    {
      date: '2025-01-15',
      description: 'Credit Card Payment - Standard Bank',
      amount: -2200,
      balance: 15800
    },
    {
      date: '2025-01-10',
      description: 'Vehicle Finance - Wesbank',
      amount: -4850,
      balance: 185600
    },
    {
      date: '2025-01-05',
      description: 'Store Account Payment - Edgars',
      amount: -650,
      balance: 3200
    }
  ]

  return (
    <Layout>
      <DataTable 
        title="Debt & Credit" 
        icon="⚠️"
        columns={columns} 
        data={data} 
      />
    </Layout>
  )
}

export default Debt