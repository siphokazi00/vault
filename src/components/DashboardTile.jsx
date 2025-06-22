import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardTile = ({ icon, title, description, path, gradient }) => {
  const navigate = useNavigate()

  return (
    <div 
      onClick={() => navigate(path)}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
    >
      <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center text-2xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default DashboardTile