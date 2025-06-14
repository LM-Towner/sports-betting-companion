import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Odds Calculator',
    description: 'Calculate potential payouts and implied probabilities for your bets.',
    path: '/calculator',
  },
  {
    title: 'Bet Glossary',
    description: 'Learn about different types of bets and betting terminology.',
    path: '/glossary',
  },
  {
    title: 'Bet Slip Simulator',
    description: 'Practice placing bets and see potential outcomes.',
    path: '/simulator',
  },
];

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to Bet Buddy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your companion for smarter sports betting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              {feature.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Remember to bet responsibly and never risk more than you can afford to lose.
        </p>
      </div>
    </div>
  );
};

export default Home; 