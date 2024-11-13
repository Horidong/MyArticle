import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isEnglish, setIsEnglish] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('language', JSON.stringify(isEnglish));
  }, [isEnglish]);

  return (
    <LanguageContext.Provider value={{ isEnglish, setIsEnglish }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);