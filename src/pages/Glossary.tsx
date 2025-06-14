import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SparklesIcon, MagnifyingGlassIcon, ShareIcon, LightBulbIcon, CalculatorIcon } from '@heroicons/react/24/outline';

type TermCategory = 'Bet Type' | 'Slang' | 'Odds Format' | 'Strategy';

type Term = {
  id: string;
  name: string;
  category: TermCategory;
  emoji: string;
  definition: string;
  example: string;
  calculatorExample?: {
    format: 'american' | 'decimal' | 'fractional';
    odds: string;
    stake: string;
  };
};

const terms: Term[] = [
  {
    id: 'moneyline',
    name: 'Moneyline',
    category: 'Bet Type',
    emoji: '💰',
    definition: 'A bet on which team will win the game outright, regardless of the score margin.',
    example: 'If you bet $100 on Team A at -150, you need to risk $150 to win $100. If you bet on Team B at +200, you risk $100 to win $200.',
    calculatorExample: {
      format: 'american',
      odds: '-150',
      stake: '100',
    },
  },
  {
    id: 'spread',
    name: 'Point Spread',
    category: 'Bet Type',
    emoji: '📊',
    definition: 'A handicap given to the favorite team to make the betting odds more even.',
    example: 'If Team A is favored by 7 points (-7), they must win by more than 7 points for you to win your bet.',
  },
  {
    id: 'over-under',
    name: 'Over/Under (Totals)',
    category: 'Bet Type',
    emoji: '📈',
    definition: 'A bet on whether the total combined score of both teams will be over or under a specified number.',
    example: 'If the over/under is 45.5 points, you can bet whether the total score will be higher or lower than 45.5.',
  },
  {
    id: 'parlay',
    name: 'Parlay',
    category: 'Strategy',
    emoji: '🎯',
    definition: 'A single bet that combines multiple individual bets, where all selections must win for the bet to pay out.',
    example: 'A 3-team parlay might pay 6-1 odds, meaning a $100 bet would win $600 if all three teams win.',
  },
  {
    id: 'teaser',
    name: 'Teaser',
    category: 'Strategy',
    emoji: '🎲',
    definition: 'A type of parlay where you can adjust the point spread in your favor, but with lower payouts.',
    example: 'A 6-point teaser might move a -7 spread to -1, making it easier to win but with reduced odds.',
  },
  {
    id: 'prop-bet',
    name: 'Prop Bet',
    category: 'Bet Type',
    emoji: '🎪',
    definition: 'A bet on a specific event or occurrence within a game that doesn\'t directly affect the final score.',
    example: 'Betting on which player will score first, or how many yards a quarterback will throw for.',
  },
  {
    id: 'futures',
    name: 'Futures',
    category: 'Bet Type',
    emoji: '🔮',
    definition: 'Bets placed on events that will occur in the future, such as championship winners.',
    example: 'Betting on which team will win the Super Bowl before the season starts.',
  },
  {
    id: 'live-betting',
    name: 'Live Betting',
    category: 'Strategy',
    emoji: '⚡',
    definition: 'Placing bets while the game is in progress, with odds that change based on the game situation.',
    example: 'Betting on the next team to score after watching the first quarter of play.',
  },
];

const quickTips = [
  "Always shop around for the best odds - different sportsbooks offer different lines",
  "Start with small stakes while learning new bet types",
  "Keep track of your bets to identify patterns and improve your strategy",
  "Don't chase losses - stick to your betting plan",
  "Consider the weather conditions for outdoor sports",
  "Research team injuries and lineup changes before placing bets",
  "Understand the difference between American, Decimal, and Fractional odds",
  "Don't bet more than you can afford to lose",
];

const Glossary = () => {
  const [learnedTerms, setLearnedTerms] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TermCategory | 'All'>('All');
  const [showQuickTip, setShowQuickTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLearnedTerms = localStorage.getItem('learnedTerms');
    if (savedLearnedTerms) {
      setLearnedTerms(new Set(JSON.parse(savedLearnedTerms)));
    }
  }, []);

  const toggleLearned = (termId: string) => {
    const newLearnedTerms = new Set(learnedTerms);
    if (newLearnedTerms.has(termId)) {
      newLearnedTerms.delete(termId);
    } else {
      newLearnedTerms.add(termId);
    }
    setLearnedTerms(newLearnedTerms);
    localStorage.setItem('learnedTerms', JSON.stringify([...newLearnedTerms]));
  };

  const handleTryTerm = (term: Term) => {
    if (term.calculatorExample) {
      navigate('/calculator', {
        state: {
          format: term.calculatorExample.format,
          odds: term.calculatorExample.odds,
          stake: term.calculatorExample.stake,
        },
      });
    }
  };

  const handleSurpriseMe = () => {
    const randomTerm = terms[Math.floor(Math.random() * terms.length)];
    const element = document.getElementById(`term-${randomTerm.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('animate-pulse');
      setTimeout(() => {
        element.classList.remove('animate-pulse');
      }, 2000);
    }
  };

  const handleShare = async (term: Term) => {
    const shareText = `Check out this betting term: ${term.name} - ${term.definition}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bet Buddy Term',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Term copied to clipboard!');
    }
  };

  const showRandomTip = () => {
    const randomTip = quickTips[Math.floor(Math.random() * quickTips.length)];
    setCurrentTip(randomTip);
    setShowQuickTip(true);
    setTimeout(() => setShowQuickTip(false), 5000);
  };

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const progress = Math.round((learnedTerms.size / terms.length) * 100);

  return (
    <main id="main-content" className="max-w-7xl mx-auto p-6" aria-label="Betting Glossary">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-primary dark:text-white" tabIndex={0} aria-label="Betting Glossary">Betting Glossary</h1>
        <div className="flex gap-2">
          <button
            onClick={showRandomTip}
            className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Show a quick betting tip"
            title="Show a quick betting tip"
          >
            <LightBulbIcon className="h-5 w-5" aria-hidden="true" />
            Quick Tip
          </button>
          <button
            onClick={handleSurpriseMe}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Surprise me with a random term"
            title="Surprise me with a random term"
          >
            <SparklesIcon className="h-5 w-5" aria-hidden="true" />
            Surprise Me
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <section className="mb-8" aria-label="Learning Progress">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Learning Progress</span>
          <span className="text-sm font-medium text-primary">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" aria-hidden="true">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      {/* Search and Filter */}
      <section className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:gap-4" aria-label="Search and Filter Terms">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Search terms"
          />
        </div>
        <label className="sr-only" htmlFor="category-select">Filter by category</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as TermCategory | 'All')}
          className="w-full sm:w-48 p-2 border rounded-md bg-white dark:bg-dark border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Filter by category"
        >
          <option value="All">All Categories</option>
          <option value="Bet Type">Bet Types</option>
          <option value="Strategy">Strategy</option>
          <option value="Slang">Slang</option>
          <option value="Odds Format">Odds Format</option>
        </select>
      </section>

      {/* Quick Tip Toast */}
      {showQuickTip && (
        <aside className="fixed bottom-4 right-4 bg-white dark:bg-dark p-4 rounded-lg shadow-lg border border-accent/20 animate-fade-in-up z-50" role="status" aria-live="polite">
          <div className="flex items-start gap-3">
            <LightBulbIcon className="h-6 w-6 text-accent flex-shrink-0" aria-hidden="true" />
            <p className="text-gray-700 dark:text-gray-300">{currentTip}</p>
          </div>
        </aside>
      )}
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Glossary Terms">
        {filteredTerms.map((term) => (
          <article
            key={term.id}
            id={`term-${term.id}`}
            className={`bg-white dark:bg-dark rounded-lg shadow-md p-6 transition-all duration-200 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg focus-within:ring-2 focus-within:ring-accent ${
              expandedTerm === term.id ? 'ring-2 ring-accent' : ''
            }`}
            tabIndex={0}
            aria-expanded={expandedTerm === term.id}
            aria-label={`Term: ${term.name}`}
            role="region"
            onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                setExpandedTerm(expandedTerm === term.id ? null : term.id);
              }
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{term.emoji}</span>
                <div>
                  <h2 className="text-xl font-semibold text-primary dark:text-white">
                    {term.name}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {term.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {learnedTerms.has(term.id) && (
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium" aria-label="Learned">Learned</span>
                )}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleShare(term);
                  }}
                  className="p-1 text-gray-500 hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`Share term ${term.name}`}
                  title="Share term"
                >
                  <ShareIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {term.definition}
            </p>

            {expandedTerm === term.id && (
              <div className="mt-4 space-y-4 transition-all duration-300">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-primary dark:text-accent">Example:</span> {term.example}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {term.calculatorExample && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleTryTerm(term);
                      }}
                      className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={`Try this term in the calculator: ${term.name}`}
                      title="Try this term in the calculator"
                    >
                      Try This Term
                    </button>
                  )}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleLearned(term.id);
                    }}
                    className={`w-full py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      learnedTerms.has(term.id)
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        : 'bg-accent/10 text-accent hover:bg-accent/20'
                    }`}
                    aria-label={learnedTerms.has(term.id) ? `Mark ${term.name} as unlearned` : `Mark ${term.name} as learned`}
                    title={learnedTerms.has(term.id) ? 'Mark as unlearned' : 'Mark as learned'}
                  >
                    {learnedTerms.has(term.id) ? 'Mark as Unlearned' : 'Mark as Learned'}
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default Glossary; 