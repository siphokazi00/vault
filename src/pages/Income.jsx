import React from 'react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'

const Income = () => {
  const columns = [
    { header: 'Date', key: 'date', type: 'date' },
    { header: 'Details', key: 'description' },
    { header: 'IN', key: 'income', type: 'currency' },
    { header: 'OUT', key: 'expense', type: 'currency' }
  ]

  const data = [
    {
      date: '2025-01-15',
      description: 'Salary Payment - Company ABC',
      income: 25000,
      expense: 0
    },
    {
      date: '2025-01-14',
      description: 'Grocery Shopping - Pick n Pay',
      income: 0,
      expense: -1250
    },
    {
      date: '2025-01-13',
      description: 'Freelance Project Payment',
      income: 3500,
      expense: 0
    },
    {
      date: '2025-01-12',
      description: 'Petrol - Shell Station',
      income: 0,
      expense: -850
    },
    {
      date: '2025-01-11',
      description: 'Restaurant - Steers',
      income: 0,
      expense: -180
    }
  ]

  return (
    <Layout>
      <DataTable 
        title="Income & Expenses" 
        icon="💰"
        columns={columns} 
        data={data} 
      />
    </Layout>
  )
}

export default Income