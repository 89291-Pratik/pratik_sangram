import React from 'react';
import { TrendingUp, Users, Package, DollarSign, MoreVertical } from 'lucide-react';

const salesData = [
  {
    stats: '245K',
    title: "Sales",
    color: "from-yellow-400 to-orange-500",
    icon: <TrendingUp className="w-6 h-6" />,
    change: "+12.5%",
    changeType: "increase"
  },
  {
    stats: '12.5K',
    title: "Customers",
    color: "from-green-400 to-emerald-500",
    icon: <Users className="w-6 h-6" />,
    change: "+8.2%",
    changeType: "increase"
  },
  {
    stats: '1.54K',
    title: "Products",
    color: "from-red-400 to-pink-500",
    icon: <Package className="w-6 h-6" />,
    change: "+3.1%",
    changeType: "increase"
  },
  {
    stats: '88K',
    title: "Revenue",
    color: "from-blue-400 to-cyan-500",
    icon: <DollarSign className="w-6 h-6" />,
    change: "+15.3%",
    changeType: "increase"
  }
];

const MonthlyOverview = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Monthly Overview</h2>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-green-600">Total 48.5% growth</span> this month
          </p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {salesData.map((item, index) => (
          <div key={index} className="group">
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>
              
              <div className="flex-1">
                <p className="text-gray-600 text-sm font-medium">{item.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{item.stats}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.changeType === 'increase' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyOverview;