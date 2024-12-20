import React, { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`cursor-pointer border border-primary border-opacity-20 rounded-2xl p-4 flex flex-col gap-2.5 ${className}`}>
      {children}
    </div>
  )
}



export const CardHeader:React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  )
}

export const CardBody: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  )
}

export const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={'border border-black'}>
      {children}
    </div>
  )
}
