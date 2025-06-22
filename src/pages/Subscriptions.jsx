import React from 'react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'

const Subscriptions = () => {
  const columns = [
    { header: 'Date', key: 'date', type: 'date' },
    { header: 'Details', key: 'description' },
    { header: 'Amount', key: 'amount', type: 'currency' }
  ]

  const data = [
    {
      date: '2025-01-15',
      description: 'Netflix Premium Subscription',
      amount: -199
    },
    {
      date: '2025-01-15',
      description: 'Spotify Family Plan',
      amount: -99
    },
    {
      date: '2025-01-12',
      description: 'DStv Premium',
      amount: -899
    },
    {
      date: '2025-01-10',
      description: 'Gym Membership - Virgin Active',
      amount: -599
    },
    {
      date: '2025-01-05',
      description: 'Microsoft 365 Subscription',
      amount: -129
    },
    {
      date: '2025-01-01',
      description: 'Cell Phone Contract - MTN',
      amount: -499
    }
  ]

  return (
    <Layout>
      <DataTable 
        title="Subscriptions" 
        icon="🔄"
        columns={columns} 
        data={data} 
      />
    </Layout>
  )
}

export default Subscriptions