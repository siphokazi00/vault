import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Shield, Target, PieChart } from 'lucide-react'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative">
      {/* Powered by Bolt Badge - Bottom Right */}
      <div className="bottom-6 left-6 z-10">
        <a 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity duration-300"
        >
          <img 
            src="/logotext_poweredby_360w.png" 
            alt="Powered by Bolt" 
            className="h-8 w-auto"
          />
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-white text-2xl font-bold">Vault</div>
        <div className="flex gap-4">
          <Link 
            to="/login" 
            className="px-6 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The future of 
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              financial management
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Take complete control of your finances with Vault - designed specifically for South African users
          </p>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col items-center text-white">
              <TrendingUp className="w-12 h-12 mb-4 text-green-300" />
              <h3 className="font-semibold mb-2">Track Growth</h3>
              <p className="text-sm text-gray-300">Monitor your wealth</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <Shield className="w-12 h-12 mb-4 text-blue-300" />
              <h3 className="font-semibold mb-2">Stay Secure</h3>
              <p className="text-sm text-gray-300">Bank-level security</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <Target className="w-12 h-12 mb-4 text-purple-300" />
              <h3 className="font-semibold mb-2">Reach Goals</h3>
              <p className="text-sm text-gray-300">Achieve milestones</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <PieChart className="w-12 h-12 mb-4 text-orange-300" />
              <h3 className="font-semibold mb-2">Get Insights</h3>
              <p className="text-sm text-gray-300">Smart analytics</p>
            </div>
          </div>

          <Link 
            to="/signup"
            className="inline-block px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold text-lg rounded-full hover:from-yellow-300 hover:to-orange-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Your Financial Journey
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing