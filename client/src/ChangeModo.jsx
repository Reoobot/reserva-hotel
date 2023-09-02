import React, { useState } from 'react';


export default function ChangeModo() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
    return (
        
        <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>

          <nav>
            <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
          </nav>
          
          {/* Cuerpo principal */}
          <main>
            
          </main>
        </div>
      );
    }
    