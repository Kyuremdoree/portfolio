import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronLeft, Sun, Moon, Globe, Download } from 'lucide-react';
import { PageProps } from '../types';

function CVPage({ isDarkMode, toggleTheme, toggleLanguage }: PageProps) {
  const { t } = useTranslation();

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/SiWGKzw.pdf';
    link.download = 'CV-Alexis-Laurent.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0A0F1A]' : 'bg-white'} py-20`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <Link 
            to="/"
            className={`inline-flex items-center gap-2 ${
              isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
            } transition-colors`}
          >
            <ChevronLeft size={20} />
            {t('nav.backToHome')}
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`p-2 hover:bg-blue-600/10 rounded-full transition-colors flex items-center gap-2 ${
                isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Globe size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-blue-600/10 rounded-full transition-colors"
            >
              {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* CV Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${isDarkMode ? 'bg-[#070B14]' : 'bg-gray-50'} rounded-xl overflow-hidden shadow-xl`}
          >
            <img 
              src="https://imgur.com/SiWGKzw.png"
              alt="CV Alexis Laurent"
              className="w-full object-contain"
            />
          </motion.div>

          {/* Download Button at Bottom */}
          <div className="text-center mt-8">
            <motion.button
              onClick={downloadCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all inline-flex items-center gap-2 text-lg font-semibold"
            >
              <Download size={20} />
              Télécharger le CV
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CVPage;