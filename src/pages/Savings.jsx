import React from 'react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'

const Savings = () => {
  const columns = [
    { header: 'Date', key: 'date', type: 'date' },
    { header: 'Details', key: 'description' },
    { header: 'Amount', key: 'amount', type: 'currency' },
    { header: 'Balance', key: 'balance', type: 'currency' }
  ]

  const data = [
    {
      date: '2025-01-15',
      description: 'Monthly Savings - FNB Savings',
      amount: 5000,
      balance: 85600
    },
    {
      date: '2025-01-15',
      description: 'Unit Trust Investment - Allan Gray',
      amount: 2000,
      balance: 42300
    },
    {
      date: '2025-01-10',
      description: 'Stock Purchase - JSE:SBK',
      amount: 10000,
      balance: 25400
    },
    {
      date: '2025-01-05',
      description: 'Emergency Fund Deposit',
      amount: 3000,
      balance: 18500
    }
  ]

  return (
    <Layout>
      <DataTable 
        title="Savings & Investments" 
        icon="📈"
        columns={columns} 
        data={data} 
      />
    </Layout>
  )
}

export default Savings