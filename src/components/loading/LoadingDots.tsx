import React from 'react';

const LoadingDots: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="dot bg-primary w-3 h-3 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="dot bg-primary w-3 h-3 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="dot bg-primary w-3 h-3 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

export default LoadingDots;