import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type OddsFormat = 'american' | 'decimal' | 'fractional';

type LocationState = {
  format?: OddsFormat;
  odds?: string;
  stake?: string;
};

const OddsCalculator = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const [format, setFormat] = useState<OddsFormat>(state?.format || 'american');
  const [odds, setOdds] = useState<string>(state?.odds || '');
  const [stake, setStake] = useState<string>(state?.stake || '');
  const [result, setResult] = useState<{
    impliedProbability: number;
    potentialPayout: number;
  } | null>(null);

  useEffect(() => {
    if (state?.format || state?.odds || state?.stake) {
      handleCalculate();
    }
  }, [state]);

  // Helper validation functions
  const isValidOdds = (odds: string, format: OddsFormat): boolean => {
    switch (format) {
      case 'american':
        return /^-?\d+$/.test(odds) && odds !== '0';
      case 'decimal':
        return /^\d*\.?\d+$/.test(odds) && parseFloat(odds) > 1;
      case 'fractional':
        return /^\d+\/\d+$/.test(odds) && odds.split('/').every((n) => Number(n) > 0);
      default:
        return false;
    }
  };

  const calculateImpliedProbability = (odds: string, format: OddsFormat): number => {
    switch (format) {
      case 'american': {
        const num = parseInt(odds, 10);
        return num > 0 ? 100 / (num + 100) : Math.abs(num) / (Math.abs(num) + 100);
      }
      case 'decimal': {
        const dec = parseFloat(odds);
        return 1 / dec;
      }
      case 'fractional': {
        const [num, denom] = odds.split('/').map(Number);
        return denom / (num + denom);
      }
      default:
        return 0;
    }
  };

  const calculatePayout = (odds: string, stake: number, format: OddsFormat): number => {
    switch (format) {
      case 'american': {
        const num = parseInt(odds, 10);
        return num > 0 ? (num / 100) * stake + stake : (100 / Math.abs(num)) * stake + stake;
      }
      case 'decimal': {
        const dec = parseFloat(odds);
        return dec * stake;
      }
      case 'fractional': {
        const [num, denom] = odds.split('/').map(Number);
        return (num / denom) * stake + stake;
      }
      default:
        return 0;
    }
  };

  const handleCalculate = () => {
    if (!isValidOdds(odds, format)) {
      setResult(null);
      return;
    }
    const stakeNum = parseFloat(stake);
    if (isNaN(stakeNum) || stakeNum <= 0) {
      setResult(null);
      return;
    }
    const impliedProb = calculateImpliedProbability(odds, format);
    const payout = calculatePayout(odds, stakeNum, format);
    setResult({
      impliedProbability: impliedProb * 100,
      potentialPayout: payout,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-primary dark:text-white">Odds Calculator</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Odds Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as OddsFormat)}
            className="w-full p-2 border rounded-md bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          >
            <option value="american">American (-110, +150)</option>
            <option value="decimal">Decimal (1.91, 2.50)</option>
            <option value="fractional">Fractional (10/11, 3/2)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Odds
          </label>
          <input
            type="text"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            placeholder={
              format === 'fractional'
                ? 'e.g., 10/11'
                : format === 'decimal'
                ? 'e.g., 1.91'
                : 'e.g., -110'
            }
            className={`w-full p-2 border rounded-md bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 ${
              odds && !isValidOdds(odds, format) ? 'border-red-500' : ''
            }`}
          />
          {odds && !isValidOdds(odds, format) && (
            <p className="text-red-500 text-xs mt-1">
              Enter valid odds for the selected format.<br />
              <span className="text-gray-600">
                Example: {format === 'fractional' ? '10/11' : format === 'decimal' ? '1.91' : '-110 or +150'}
              </span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Stake ($)
          </label>
          <input
            type="number"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            placeholder="Enter stake amount"
            className="w-full p-2 border rounded-md bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-4 bg-white dark:bg-dark rounded-md shadow-md transition-all duration-200">
            <h2 className="text-lg font-semibold mb-4 text-primary dark:text-white">Results</h2>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                Implied Probability: {result.impliedProbability.toFixed(2)}%
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Potential Payout: ${result.potentialPayout.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OddsCalculator; 