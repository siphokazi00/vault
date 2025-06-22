import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, Menu } from 'lucide-react'

const Layout = ({ children, title = 'Vault' }) => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-xl font-bold hover:text-gray-200 transition-colors"
              >
                {title}
              </button>
              {user && (
                <div className="flex items-center gap-4">
                  <span className="text-sm opacity-90">{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Sign Out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="min-h-[600px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout