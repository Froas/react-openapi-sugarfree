import React from 'react';
import { HashRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import DocsPage from './components/DocsPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <NavBar />
          
          <main className="min-h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Updated Footer */}
          <footer className="bg-white/80 backdrop-blur-sm border-t border-green-200 py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-700 mb-4 md:mb-0">
                  <p className="flex items-center space-x-2">
                    <span>&copy; 2024 Sugarless API.</span>
                    <span className="text-green-600">🌱</span>
                    <span>Built with React & TypeScript.</span>
                  </p>
                </div>
                <div className="flex space-x-6 text-sm text-gray-600">
                  <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a>
                  <a 
                    href="https://github.com/Froas/react-openapi-sugarfree" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-green-600 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;