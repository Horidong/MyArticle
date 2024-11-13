import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext.js';

import SnowWrapper from '../components/SnowEffect';
import { Snow, Snowflake, Sun } from 'lucide-react';

const HomePage = () => {
  const { isEnglish } = useLanguage();
  const [showSnow, setShowSnow] = useState(true);

 

  return (
    <SnowWrapper isEnabled={showSnow}>
      {/* Hero Section */}
      <div className="bg-sky-100">
      <button
          onClick={() => setShowSnow(!showSnow)}
          className="fixed top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
          title={isEnglish ? "Toggle snow effect" : "눈 효과 켜기/끄기"}
        >
          {showSnow ? (
            <Sun className="text-white" size={24} />
          ) : (
            <Snowflake className="text-white" size={24} />
          )}
        </button>
        <div className="container mx-auto px-4 xl:px-8 2xl:px-16 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isEnglish?"Welcome to Your Website":"Horidong의 홈페이지에 오신 것을 환영합니다."}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
          {isEnglish?"This is a beautiful homepage built with React and Tailwind CSS":"아직 처음 만들어보는 홈페이지라 미흡하지만, 열심히 꾸며보도록 하겠습니다."}
          </p>
          {/*<button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
            Get Started
          </button>*/}  
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-sky-100">
        <div className="container mx-auto px-4 xl:px-8 2xl:px-16 py-16">
            
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-semibold mb-2">Feature {item}</h3>
                <p className="text-gray-600">
                  Description of feature {item}. Add your content here.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SnowWrapper>
  );
};

export default HomePage;