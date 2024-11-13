import React, { useState } from 'react';
import { HashRouter  as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/about/AboutMe';
import AboutHomePage from './pages/about/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ReviewPage from './pages/blog/ReviewPage';
import ReviewContentPage from './pages/blog/review/ReviewContent';



const App = () => {
  return (
    <LanguageProvider>
      <Router basename='/MyArticle'>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about/me" element={<AboutMePage />} />
            <Route path="/about/homepage" element={<AboutHomePage />} />
            <Route path="/blog/review" element={<ReviewPage  />} />
            <Route path="/portfolio" element={<PortfolioPage  />} />
            <Route path="/blog/review/:number" element={<ReviewContentPage  />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;