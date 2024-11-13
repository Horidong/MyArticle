import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path={process.env.PUBLIC_URL +"/"} element={<HomePage />} />
            <Route path={process.env.PUBLIC_URL +"/about/me"} element={<AboutMePage />} />
            <Route path={process.env.PUBLIC_URL +"/about/homepage"} element={<AboutHomePage />} />
            <Route path={process.env.PUBLIC_URL +"/blog/review"} element={<ReviewPage  />} />
            <Route path={process.env.PUBLIC_URL +"/portfolio"} element={<PortfolioPage  />} />
            <Route path={process.env.PUBLIC_URL +"/blog/review/:number"} element={<ReviewContentPage  />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;