import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import CVPage from './pages/CVPage';

function App() {
  const { i18n, ready } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0A0F1A] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    // make nothing in the basename
    <Router> 
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#0A0F1A]' : 'bg-white'} text-white relative overflow-hidden`}>
        {/* Animated Background */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
        </div>

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleLanguage={toggleLanguage} />} />
            <Route path="/projects" element={<ProjectsPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleLanguage={toggleLanguage} />} />
            <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleLanguage={toggleLanguage} />} />
            <Route path="/contact" element={<ContactPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleLanguage={toggleLanguage} />} />
            <Route path="/cv" element={<CVPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleLanguage={toggleLanguage} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;