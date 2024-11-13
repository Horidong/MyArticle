import React, { useState, useEffect } from 'react';
import { Menu, Search, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

import logo from '../img/logo_title.png';

const Header  = () => {
  const { isEnglish, setIsEnglish } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  //const [] = useState(true);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = (e) => {
      // Show header if mouse is within 100px from top
      if (e.clientY <= 100) {
        setIsVisible(true);
      } else {
        // Only hide if we're not hovering over the header itself
        const headerElement = document.getElementById('main-header');
        if (headerElement && !headerElement.contains(e.target)) {
          timeoutId = setTimeout(() => {
            setIsVisible(false);
          }, 300);
        }
      }
    };

    // Add mouseleave event to the header
    const handleHeaderMouseLeave = (e) => {
      // Only hide if moving above the header or far below it
      if (e.clientY > 100) {
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }
    };

    const header = document.getElementById('main-header');
    if (header) {
      header.addEventListener('mouseleave', handleHeaderMouseLeave);
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (header) {
        header.removeEventListener('mouseleave', handleHeaderMouseLeave);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Cancel the hide timer when entering the header
  const handleHeaderMouseEnter = () => {
    setIsVisible(true);
  };


  const menuItems = [
    {
      title: 'Home',
      link: '/MyArticle/',
      submenu: null
    },
    {
      title: 'About',
      link: '/MyArticle/about/me',
      submenu: [
        {title: 'Me', link: '/MyArticle/about/me'},
        {title: 'Homepage', link: '/MyArticle/about/homepage'}
      ]
    },
    {
      title: 'Portfolio',
      link: '/MyArticle/portfolio',
      submenu: null
    },
    {
      title: 'Blog',
      link: '/MyArticle/blog/review',
      submenu: [
        {title: 'Review', link: '/MyArticle/blog/review'}
      ]
    }
  ];
  const currentMenuItems = isEnglish ? menuItems.en : menuItems.ko;
  return (
    <div 
      id="main-header"
      onMouseEnter={handleHeaderMouseEnter}
      className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <nav className="bg-white shadow-md w-full">
        <div className="container mx-auto relative">
          {/* Main navigation wrapper */}
          <div className="h-16 flex items-center justify-center">
            {/* Left Menu - Absolutely positioned to stay flush left */}
            <div className="hidden md:flex space-x-8 absolute left-4 xl:left-8 2xl:left-16">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    to={item.link}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group py-4"
                  >
                    {item.title}
                    {item.submenu && (
                      <ChevronDown size={16} className="ml-1 transform group-hover:rotate-180 transition-transform duration-200" />
                    )}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div className="absolute left-0 top-full bg-white border rounded-lg shadow-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-0 translate-y-2 transition-all duration-200">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Logo Section */}
            <div className="flex justify-center items-center px-4">
              <div className="relative w-full max-w-[200px] aspect-[3/1] hover:opacity-80 transition-opacity duration-200">
                <img src={logo} alt="Horidong" className="absolute top-0 left-0 w-full h-full object-contain"/> 
              </div>
            </div>
            
            
            {/* Mobile Menu Button - Absolutely positioned */}
            <div className="md:hidden absolute left-4">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Menu size={24} />
              </button>
            </div>
            
            {/* Logo Section - Centered */}
            <div className="flex justify-center items-center px-4">
                <img src={logo} alt="Horidong" className="absolute top-0 left-0 w-full h-full object-contain relative w-full max-w-[200px] aspect-[3/1] hover:opacity-80 transition-opacity duration-200"/> 

            </div>
            
            {/* Right Side Icons - Balanced with left menu */}
            <div className="hidden md:flex space-x-6 absolute right-4 xl:right-8 2xl:right-16">
              <button 
                onClick={() => setIsEnglish(!isEnglish)}
                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                {isEnglish ? 'KR' : 'EN'}
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <Search size={20} />
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
            
        {/* Mobile Menu Dropdown with animation */}
        <div 
          className={`md:hidden border-t transform transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="container mx-auto">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <a 
                    href={item.link}
                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.title}
                  </a>
                  {item.submenu && (
                    <div className="pl-4 mb-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.link}
                          className="block py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;