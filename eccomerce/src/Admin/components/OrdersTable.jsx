import React, { useState } from 'react';
import { Search, Filter, Download, Eye, MoreVertical, Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const ordersData = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    product: 'Premium T-Shirt',
    amount: '$29.99',
    status: 'completed',
    date: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    product: 'Designer Jeans',
    amount: '$89.99',
    status: 'pending',
    date: '2024-01-14',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  },
  {
    id: '#ORD-003',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    product: 'Sports Shoes',
    amount: '$129.99',
    status: 'processing',
    date: '2024-01-13',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  },
  {
    id: '#ORD-004',
    customer: 'Sarah Wilson',
    email: 'sarah@example.com',
    product: 'Summer Dress',
    amount: '$59.99',
    status: 'cancelled',
    date: '2024-01-12',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'pending':
      return <Clock className="w-4 h-4" />;
    case 'processing':
      return <Package className="w-4 h-4" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'cancelled':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Recent Orders</h2>
          <p className="text-gray-600 text-sm">Manage your recent orders and transactions</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Order</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.avatar}
                      alt={order.customer}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900">{order.product}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-gray-900">{order.amount}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No orders found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;