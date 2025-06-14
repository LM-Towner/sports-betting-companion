import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../pages/Home';
import OddsCalculator from '../pages/OddsCalculator';
import Glossary from '../pages/Glossary';
import BetSlipSimulator from '../pages/BetSlipSimulator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background dark:bg-dark transition-colors duration-200">
        <NavBar />
        <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<OddsCalculator />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/simulator" element={<BetSlipSimulator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 