import { useState } from 'react';
import { ClipboardDocumentListIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

type Team = {
  id: string;
  name: string;
};

const teams: Team[] = [
  { id: 'team1', name: 'Team A' },
  { id: 'team2', name: 'Team B' },
];

const BetSlipSimulator = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [odds, setOdds] = useState<string>('');
  const [stake, setStake] = useState<string>('');
  const [isWin, setIsWin] = useState<boolean>(true);
  const [result, setResult] = useState<{
    payout: number;
    profit: number;
  } | null>(null);

  const calculatePayout = (odds: number, stake: number): number => {
    return odds > 0
      ? (odds / 100) * stake + stake
      : (100 / Math.abs(odds)) * stake + stake;
  };

  const handleSimulate = () => {
    const oddsNum = parseFloat(odds);
    const stakeNum = parseFloat(stake);

    if (isNaN(oddsNum) || isNaN(stakeNum) || stakeNum <= 0 || !selectedTeam) {
      setResult(null);
      return;
    }

    const payout = calculatePayout(oddsNum, stakeNum);
    const profit = isWin ? payout - stakeNum : -stakeNum;

    setResult({
      payout: isWin ? payout : 0,
      profit,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-950 dark:to-yellow-950 py-12 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl shadow-lg border border-yellow-100 dark:border-yellow-900 bg-white dark:bg-gray-900 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-yellow-900 border-b border-yellow-600">
            <ClipboardDocumentListIcon className="w-7 h-7" />
            <h1 className="text-2xl font-bold tracking-wide">Bet Slip Simulator</h1>
          </div>
          {/* Body */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Team
                </label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  American Odds
                </label>
                <input
                  type="text"
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                  placeholder="e.g., -110 or +150"
                  className="w-full p-2 border rounded-md bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                />
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Outcome
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsWin(true)}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 font-semibold flex items-center justify-center gap-2 ${
                    isWin
                      ? 'bg-yellow-500 text-yellow-900 shadow'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                  }`}
                >
                  <CheckCircleIcon className="w-5 h-5" /> Win
                </button>
                <button
                  onClick={() => setIsWin(false)}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 font-semibold flex items-center justify-center gap-2 ${
                    !isWin
                      ? 'bg-yellow-700 text-white shadow'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                  }`}
                >
                  <XCircleIcon className="w-5 h-5" /> Loss
                </button>
              </div>
            </div>
            <button
              onClick={handleSimulate}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-semibold py-3 px-4 rounded-lg shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all text-lg mt-2"
            >
              Simulate Bet
            </button>
            {result && (
              <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl shadow border border-yellow-100 dark:border-yellow-900">
                <h2 className="text-lg font-semibold mb-4 text-yellow-700 dark:text-yellow-200">Simulation Results</h2>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium">Payout:</span> ${result.payout.toFixed(2)}
                  </p>
                  <p className={`text-lg font-medium ${
                    result.profit >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                  }`}>
                    <span className="font-medium">Profit/Loss:</span> ${result.profit.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetSlipSimulator; 