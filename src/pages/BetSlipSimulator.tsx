import { useState } from 'react';

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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-primary dark:text-white">Bet Slip Simulator</h1>
      
      <div className="space-y-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Outcome
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsWin(true)}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                isWin
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-accent/10'
              }`}
            >
              Win
            </button>
            <button
              onClick={() => setIsWin(false)}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                !isWin
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-accent/10'
              }`}
            >
              Loss
            </button>
          </div>
        </div>

        <button
          onClick={handleSimulate}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200"
        >
          Simulate Bet
        </button>

        {result && (
          <div className="mt-6 p-4 bg-white dark:bg-dark rounded-md shadow-md transition-all duration-200">
            <h2 className="text-lg font-semibold mb-4 text-primary dark:text-white">Simulation Results</h2>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                Payout: ${result.payout.toFixed(2)}
              </p>
              <p className={`text-lg font-medium ${
                result.profit >= 0 ? 'text-primary' : 'text-secondary'
              }`}>
                Profit/Loss: ${result.profit.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BetSlipSimulator; 