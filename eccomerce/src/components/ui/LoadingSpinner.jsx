import React from 'react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-16 w-16',
    xlarge: 'h-32 w-32'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-indigo-600 ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default LoadingSpinner;