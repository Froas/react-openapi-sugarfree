import React from 'react';
import { HashRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import DocsPage from './components/DocsPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import { Footer } from './components/Footer';

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
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;