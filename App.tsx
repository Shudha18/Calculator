
import React, { useState, useCallback } from 'react';
import CalculatorDisplay from './components/CalculatorDisplay';
import CalculatorButton from './components/CalculatorButton';

type Operator = '+' | '-' | '×' | '÷';

const App: React.FC = () => {
  const [currentOperand, setCurrentOperand] = useState<string>('0');
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [overwrite, setOverwrite] = useState<boolean>(true);

  const calculate = useCallback((): string => {
    const prev = parseFloat(previousOperand || '0');
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return '';

    let result: number;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) return 'Error';
        result = prev / current;
        break;
      default:
        return currentOperand;
    }
    return result.toString();
  }, [currentOperand, previousOperand, operator]);

  const handleNumberClick = (num: string) => {
    if (overwrite) {
      setCurrentOperand(num);
      setOverwrite(false);
    } else {
      if (num === '0' && currentOperand === '0') return;
      if (num === '.' && currentOperand.includes('.')) return;
      setCurrentOperand((prev) => (prev === '0' && num !== '.' ? num : prev + num));
    }
  };

  const handleOperatorClick = (op: Operator) => {
    if (currentOperand === 'Error') {
        handleClear();
        return;
    }
    if (previousOperand !== null && operator && !overwrite) {
      const result = calculate();
      setCurrentOperand(result);
      setPreviousOperand(result);
    } else {
      setPreviousOperand(currentOperand);
    }
    setOperator(op);
    setOverwrite(true);
  };

  const handleEquals = () => {
    if (operator && previousOperand !== null) {
      const result = calculate();
      setCurrentOperand(result);
      setPreviousOperand(null);
      setOperator(null);
      setOverwrite(true);
    }
  };

  const handleClear = () => {
    setCurrentOperand('0');
    setPreviousOperand(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleDelete = () => {
    if (overwrite) return;
    if (currentOperand.length === 1) {
      setCurrentOperand('0');
      setOverwrite(true);
    } else {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  };
  
  const handleToggleSign = () => {
      if (currentOperand === 'Error' || currentOperand === '0') return;
      setCurrentOperand( (parseFloat(currentOperand) * -1).toString() );
  }

  const handlePercentage = () => {
      if (currentOperand === 'Error') return;
      setCurrentOperand( (parseFloat(currentOperand) / 100).toString() );
  }
  
  const buttonLayout = [
    { label: 'AC', onClick: handleClear, className: 'bg-sky-400/20 hover:bg-sky-400/40 text-sky-300' },
    { label: '+/-', onClick: handleToggleSign, className: 'bg-sky-400/20 hover:bg-sky-400/40 text-sky-300' },
    { label: '%', onClick: handlePercentage, className: 'bg-sky-400/20 hover:bg-sky-400/40 text-sky-300' },
    { label: '÷', onClick: () => handleOperatorClick('÷'), className: 'bg-fuchsia-500/30 hover:bg-fuchsia-500/50 text-fuchsia-300' },
    { label: '7', onClick: () => handleNumberClick('7') },
    { label: '8', onClick: () => handleNumberClick('8') },
    { label: '9', onClick: () => handleNumberClick('9') },
    { label: '×', onClick: () => handleOperatorClick('×'), className: 'bg-fuchsia-500/30 hover:bg-fuchsia-500/50 text-fuchsia-300' },
    { label: '4', onClick: () => handleNumberClick('4') },
    { label: '5', onClick: () => handleNumberClick('5') },
    { label: '6', onClick: () => handleNumberClick('6') },
    { label: '-', onClick: () => handleOperatorClick('-'), className: 'bg-fuchsia-500/30 hover:bg-fuchsia-500/50 text-fuchsia-300' },
    { label: '1', onClick: () => handleNumberClick('1') },
    { label: '2', onClick: () => handleNumberClick('2') },
    { label: '3', onClick: () => handleNumberClick('3') },
    { label: '+', onClick: () => handleOperatorClick('+'), className: 'bg-fuchsia-500/30 hover:bg-fuchsia-500/50 text-fuchsia-300' },
    { label: '0', onClick: () => handleNumberClick('0'), className: 'col-span-2' },
    { label: '.', onClick: () => handleNumberClick('.') },
    { label: '=', onClick: handleEquals, className: 'bg-cyan-500/40 hover:bg-cyan-500/60 text-cyan-200' },
  ];

  return (
    <main className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto p-5 bg-black/30 rounded-3xl shadow-2xl shadow-cyan-500/10 border border-white/10 backdrop-blur-lg">
        <CalculatorDisplay value={currentOperand} />
        <div className="grid grid-cols-4 gap-3 mt-6">
            {buttonLayout.map(btn => (
                <CalculatorButton
                    key={btn.label}
                    onClick={btn.onClick}
                    className={btn.className}
                    label={btn.label}
                />
            ))}
        </div>
      </div>
    </main>
  );
};

export default App;
