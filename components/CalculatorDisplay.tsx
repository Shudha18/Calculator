
import React from 'react';

interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
  const displayValue = value.length > 12 ? parseFloat(value).toPrecision(7) : value;

  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-right mb-2 shadow-inner shadow-black/30">
      <div 
        className="text-5xl font-bold text-cyan-300 text-glow break-all" 
        style={{
            wordWrap: 'break-word',
            fontSize: displayValue.length > 8 ? '2.5rem' : '3rem'
        }}
      >
        {displayValue}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
