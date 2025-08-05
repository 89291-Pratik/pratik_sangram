import React from 'react';
import { Trophy, TrendingUp, Eye } from 'lucide-react';

const Achievement = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold tracking-wide">ShopJoy</h3>
            <p className="text-purple-100 text-sm">Congratulations! 🎉</p>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Trophy className="w-6 h-6" />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold">420.8k</span>
            <div className="flex items-center text-green-300 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5%
            </div>
          </div>
          <p className="text-purple-100 text-sm">Total Sales This Month</p>
        </div>
        
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105">
          <Eye className="w-4 h-4" />
          View Sales
        </button>
      </div>
    </div>
  );
};

export default Achievement;