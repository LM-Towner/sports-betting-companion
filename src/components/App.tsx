function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tailwind CSS is Working! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          If you can see this styled card with a gradient background, Tailwind CSS is properly configured.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
          Click Me!
        </button>
      </div>
    </div>
  );
}

export default App; 