import React, { useEffect } from 'react';

const SnowEffect = () => {
  useEffect(() => {
    // Create initial snowflakes
    createSnowflakes();

    // Clean up when component unmounts
    return () => {
      const snow = document.getElementById('snow-container');
      if (snow) {
        snow.remove();
      }
    };
  }, []);

  const createSnowflakes = () => {
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    snowContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `;

    // Create multiple snowflakes
    for (let i = 0; i < 150; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❅';
      snowflake.style.cssText = `
        position: absolute;
        color: #fff;
        font-size: ${Math.random() * 20 + 10}px;
        opacity: ${Math.random() * 0.5 + 0.2};
        left: ${Math.random() * 100}vw;
        animation: snowfall ${Math.random() * 3 + 2}s linear infinite;
        animation-delay: -${Math.random() * 5}s;
      `;

      // Set random start position
      snowflake.style.top = `-${Math.random() * 20}px`;

      snowContainer.appendChild(snowflake);
    }

    // Add keyframe animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes snowfall {
        0% {
          transform: translateY(-10px) rotate(0deg);
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
        }
      }

      .snowflake {
        will-change: transform;
      }
    `;

    document.head.appendChild(styleSheet);
    document.body.appendChild(snowContainer);
  };

  return null; // This component doesn't render anything visible itself
};

// Wrapper component to control when snow effect is shown
const SnowWrapper = ({ isEnabled = true, children }) => {
  return (
    <div className="relative">
      {isEnabled && <SnowEffect />}
      {children}
    </div>
  );
};

export default SnowWrapper;