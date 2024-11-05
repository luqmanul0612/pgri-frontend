import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-[16px] border border-[rgba(23,163,184,0.20)] bg-[#FFF] ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
