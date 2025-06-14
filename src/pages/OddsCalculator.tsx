import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CalculatorIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 py-12 px-2">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Calculator Card */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900 bg-white dark:bg-gray-900 overflow-hidden w-full">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white border-b border-blue-800">
              <CalculatorIcon className="w-7 h-7" />
              <h1 className="text-2xl font-bold tracking-wide">Odds Calculator</h1>
            </div>
            {/* Body */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-0 mb-10">
                <div className="min-w-0">
                  <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Odds Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as OddsFormat)}
                    className="w-full p-4 text-sm border rounded-lg bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    title="Select the odds format you want to use."
                  >
                    <option value="american">American (-110, +150)</option>
                    <option value="decimal">Decimal (1.91, 2.50)</option>
                    <option value="fractional">Fractional (10/11, 3/2)</option>
                  </select>
                </div>
                <div className="min-w-0">
                  <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
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
                    className={`w-full text-sm p-4 border rounded-lg bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 ${
                      odds && !isValidOdds(odds, format) ? 'border-red-500' : ''
                    }`}
                    title="Enter the odds in the selected format. For American, use -110 or +150."
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
                <div className="min-w-0">
                  <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Stake ($)
                  </label>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(e.target.value)}
                    placeholder="Enter stake amount"
                    className="w-full text-sm p-4 border rounded-lg bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    title="Enter the amount you want to bet."
                  />
                </div>
              </div>
              <button
                onClick={handleCalculate}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all text-lg"
                title="Click to calculate your implied probability and potential payout."
              >
                Calculate
              </button>
              {result && (
                <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow border border-blue-100 dark:border-blue-900">
                  <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-200">Results</h2>
                  <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Implied Probability:</span> {result.impliedProbability.toFixed(2)}%
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">Potential Payout:</span> ${result.potentialPayout.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Sidebar Info Panel */}
        <aside className="hidden lg:block bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 sticky top-8">
          <div className="flex items-center gap-2 mb-4">
            <InformationCircleIcon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            <span className="text-lg font-bold text-blue-700 dark:text-blue-400">Tips & Info</span>
          </div>
          <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-3">
            <li><b>American Odds:</b> Negative means favorite, positive means underdog.</li>
            <li><b>Decimal Odds:</b> Your total return per $1 staked.</li>
            <li><b>Fractional Odds:</b> Shows profit relative to stake (e.g., 5/1 means $5 profit per $1).</li>
            <li>Implied probability is the chance the bet will win, based on the odds.</li>
            <li>Always double-check your inputs before placing a real bet!</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default OddsCalculator; 