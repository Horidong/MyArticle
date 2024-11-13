import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext.js';

const AboutPage = () => {
  const { isEnglish } = useLanguage();
  return (
    <div className="container mx-auto px-4 xl:px-8 2xl:px-16 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About This Homepage</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600">
            Your company story goes here. Add details about your company's history,
            mission, and values.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Your company mission statement and goals go here. Explain what drives
            your company and what you aim to achieve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;