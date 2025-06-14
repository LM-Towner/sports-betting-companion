import { Link } from 'react-router-dom';
import { CalculatorIcon, BookOpenIcon, ClipboardDocumentListIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Odds Calculator',
    description: 'Calculate potential payouts and implied probabilities for your bets.',
    path: '/calculator',
    icon: CalculatorIcon,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Bet Glossary',
    description: 'Learn about different types of bets and betting terminology.',
    path: '/glossary',
    icon: BookOpenIcon,
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'Bet Slip Simulator',
    description: 'Practice placing bets and see potential outcomes.',
    path: '/simulator',
    icon: ClipboardDocumentListIcon,
    color: 'bg-yellow-100 text-yellow-700',
  },
];

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-16 pb-12 px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white select-none">BB</span>
          </div>
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight drop-shadow-lg">
          Welcome to <span className="text-blue-700 dark:text-blue-400">Bet Buddy</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Your companion for smarter, more confident sports betting. Explore tools, learn terms, and practice risk-free.
        </p>
        <Link
          to="/calculator"
          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Get Started
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 relative overflow-hidden"
            >
              <div className={`absolute -top-6 -left-6 w-20 h-20 rounded-full opacity-20 blur-2xl ${feature.color}`}></div>
              <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-5 shadow ${feature.color}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <span className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-400 font-semibold group-hover:underline">
                Explore <ArrowRightIcon className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-6 text-center text-gray-500 dark:text-gray-400 text-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        &copy; {new Date().getFullYear()} Bet Buddy. All rights reserved.
      </footer>
    </div>
  );
};

export default Home; 