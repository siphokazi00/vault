import React from 'react'
import Layout from '../components/Layout'
import DashboardTile from '../components/DashboardTile'
import BurgerMenu from '../components/BurgerMenu'
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  RotateCcw, 
  BarChart3, 
  Target, 
  Shield, 
  FileText,
  PieChart,
  Bell
} from 'lucide-react'

const Dashboard = () => {
  const tiles = [
    {
      icon: <DollarSign className="text-white" />,
      title: 'Income & Expenses',
      description: 'Track your daily transactions and cash flow',
      path: '/income',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: <TrendingUp className="text-white" />,
      title: 'Savings & Investments',
      description: 'Monitor your wealth growth and portfolio',
      path: '/savings',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <AlertTriangle className="text-white" />,
      title: 'Debt & Credit',
      description: 'Manage loans, credit cards and payment schedules',
      path: '/debt',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: <RotateCcw className="text-white" />,
      title: 'Subscriptions',
      description: 'Track recurring payments and subscriptions',
      path: '/subscriptions',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: <BarChart3 className="text-white" />,
      title: 'Planning & Budgeting',
      description: 'Plan your finances and track budget performance',
      path: '/budget',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: <Target className="text-white" />,
      title: 'Financial Goals & Targets',
      description: 'Set and track your financial milestones',
      path: '/goals',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: <Shield className="text-white" />,
      title: 'Insurance Management',
      description: 'Manage all your insurance policies and claims',
      path: '/insurance',
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      icon: <FileText className="text-white" />,
      title: 'Tax Planning',
      description: 'Track deductions and manage tax obligations',
      path: '/tax',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      icon: <PieChart className="text-white" />,
      title: 'Reports & Analytics',
      description: 'Get monthly financial statements and spending category breakdowns',
      path: '/reports',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: <Bell className="text-white" />,
      title: 'Alerts & Notifications',
      description: 'Set and manage payment reminders',
      path: '/alerts',
      gradient: 'from-teal-500 to-teal-600'
    }
  ]

  return (
    <Layout>
      <div className="p-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <BurgerMenu />
          </div>
          <p className="mt-2 opacity-90">Welcome to your financial command center</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tiles.map((tile, index) => (
            <DashboardTile key={index} {...tile} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard