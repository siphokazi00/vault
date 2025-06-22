import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  User, 
  Settings, 
  HelpCircle, 
  FileText, 
  Download, 
  LogOut,
  Home,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  BarChart3,
  Target,
  Shield,
  FileBarChart,
  PieChart,
  Bell
} from 'lucide-react'

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setIsOpen(false)
  }

  const handleNavigation = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: DollarSign, label: 'Income & Expenses', path: '/income' },
    { icon: TrendingUp, label: 'Savings & Investments', path: '/savings' },
    { icon: AlertTriangle, label: 'Debt & Credit', path: '/debt' },
    { icon: RotateCcw, label: 'Subscriptions', path: '/subscriptions' },
    { icon: BarChart3, label: 'Planning & Budgeting', path: '/budget' },
    { icon: Target, label: 'Financial Goals', path: '/goals' },
    { icon: Shield, label: 'Insurance', path: '/insurance' },
    { icon: FileBarChart, label: 'Tax Planning', path: '/tax' },
    { icon: PieChart, label: 'Reports & Analytics', path: '/reports' },
    { icon: Bell, label: 'Alerts & Notifications', path: '/alerts' }
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-6 flex flex-col gap-1 cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Menu"
      >
        <div className={`w-full h-1 bg-white rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-full h-1 bg-white rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-full h-1 bg-white rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* User Info Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <p className="font-semibold">{user?.email}</p>
                <p className="text-sm opacity-90">Vault User</p>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navigation
            </div>
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
              >
                <item.icon size={18} className="text-gray-500" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Account Actions */}
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </div>
            <button
              onClick={() => handleNavigation('/profile')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
            >
              <Settings size={18} className="text-gray-500" />
              <span className="text-sm">Profile Settings</span>
            </button>
            <button
              onClick={() => handleNavigation('/help')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
            >
              <HelpCircle size={18} className="text-gray-500" />
              <span className="text-sm">Help & Support</span>
            </button>
            <button
              onClick={() => window.open('/api/export', '_blank')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700"
            >
              <Download size={18} className="text-gray-500" />
              <span className="text-sm">Export Data</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Sign Out */}
          <div className="py-2">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors text-red-600"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BurgerMenu