
import React from 'react';

interface CalculatorButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, label, className = '' }) => {
  const baseClasses = "text-2xl font-bold rounded-xl h-20 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 flex items-center justify-center shadow-md";
  const defaultClasses = "bg-white/10 hover:bg-white/20 text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className.includes('bg-') ? '' : defaultClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;
