import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Bell, Calendar, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react'

const Alerts = () => {
  const [alerts] = useState([
    {
      id: 1,
      type: 'payment_due',
      title: 'Credit Card Payment Due',
      message: 'Your Standard Bank credit card payment of R2,200 is due in 3 days',
      date: '2025-01-18',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'goal_milestone',
      title: 'Goal Milestone Reached',
      message: 'Congratulations! You\'ve reached 75% of your Emergency Fund goal',
      date: '2025-01-15',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'subscription_renewal',
      title: 'Subscription Renewal',
      message: 'Your Netflix subscription will renew in 5 days for R199',
      date: '2025-01-20',
      priority: 'low',
      read: true
    },
    {
      id: 4,
      type: 'budget_exceeded',
      title: 'Budget Alert',
      message: 'You\'ve exceeded your dining budget by R450 this month',
      date: '2025-01-14',
      priority: 'medium',
      read: false
    },
    {
      id: 5,
      type: 'insurance_renewal',
      title: 'Insurance Renewal Due',
      message: 'Your car insurance policy expires in 30 days',
      date: '2025-02-15',
      priority: 'high',
      read: true
    }
  ])

  const getAlertIcon = (type) => {
    switch (type) {
      case 'payment_due':
        return <DollarSign className="h-5 w-5" />
      case 'goal_milestone':
        return <CheckCircle className="h-5 w-5" />
      case 'subscription_renewal':
        return <Calendar className="h-5 w-5" />
      case 'budget_exceeded':
        return <AlertTriangle className="h-5 w-5" />
      case 'insurance_renewal':
        return <Bell className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAlertTypeColor = (type) => {
    switch (type) {
      case 'payment_due':
        return 'text-red-600 bg-red-50'
      case 'goal_milestone':
        return 'text-green-600 bg-green-50'
      case 'subscription_renewal':
        return 'text-blue-600 bg-blue-50'
      case 'budget_exceeded':
        return 'text-orange-600 bg-orange-50'
      case 'insurance_renewal':
        return 'text-purple-600 bg-purple-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const unreadCount = alerts.filter(alert => !alert.read).length

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-4xl">🔔</span>
            Alerts & Notifications
          </h2>
          {unreadCount > 0 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {unreadCount} unread
            </div>
          )}
        </div>

        {/* Alert Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">High Priority</h3>
                <p className="text-sm text-gray-600">Urgent actions required</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.priority === 'high').length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Upcoming</h3>
                <p className="text-sm text-gray-600">Due soon</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {alerts.filter(a => a.priority === 'medium').length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Achievements</h3>
                <p className="text-sm text-gray-600">Goals & milestones</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {alerts.filter(a => a.type === 'goal_milestone').length}
            </p>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Recent Alerts</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {alerts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No alerts at this time</p>
                <p className="text-sm">You'll see important notifications here</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !alert.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getAlertTypeColor(alert.type)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(alert.priority)}`}>
                            {alert.priority.toUpperCase()}
                          </span>
                          {!alert.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{alert.message}</p>
                      <p className="text-sm text-gray-500">{formatDate(alert.date)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Alert Settings */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Notification Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Payment Reminders</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-600">Credit card payments</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-600">Loan payments</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-600">Insurance premiums</span>
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Goal Tracking</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-600">Milestone achievements</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-600">Budget exceeded warnings</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-gray-600">Weekly summaries</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Alerts