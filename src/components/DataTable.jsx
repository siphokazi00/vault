import React from 'react'
import { formatCurrency, formatDate } from '../utils/validation'

const DataTable = ({ title, columns, data, icon }) => {
  const formatCellValue = (value, type) => {
    if (type === 'currency') {
      return formatCurrency(value)
    }
    if (type === 'date') {
      return formatDate(value)
    }
    return value
  }

  const getCellClassName = (value, type) => {
    if (type === 'currency') {
      if (value > 0) return 'text-green-600 font-semibold'
      if (value < 0) return 'text-red-600 font-semibold'
      return 'text-gray-600'
    }
    return 'text-gray-800'
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <span className="text-4xl">{icon}</span>
        {title}
      </h2>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                {columns.map((column, index) => (
                  <th key={index} className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-indigo-50 transition-colors">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <div className={getCellClassName(row[column.key], column.type)}>
                        {column.render 
                          ? column.render(row[column.key], row)
                          : formatCellValue(row[column.key], column.type)
                        }
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataTable