import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronLeft, Sun, Moon, Globe, Gamepad2, Film, Image, GraduationCap, Trophy, Sword, Clapperboard, Tv2, Palette, Video, Award, Plane } from 'lucide-react';
import { useLocaleData } from '../hooks/useLocaleData';
import { PageProps } from '../types';

function AboutPage({ isDarkMode, toggleTheme, toggleLanguage }: PageProps) {
  const { t } = useTranslation();
  const { aboutData } = useLocaleData();

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      Gamepad2, Film, Image, GraduationCap, Trophy, Sword, Clapperboard, Tv2, Palette, Video, Award, Plane
    };
    return icons[iconName] || Image;
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
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            About Me
          </h1>
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

        <div className="space-y-16">
          {aboutData.sections.map((section, sectionIndex) => {
            const SectionIcon = getIconComponent(section.icon);
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.2 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <SectionIcon size={32} className="text-blue-400" />
                  <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {section.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {section.content.map((item, itemIndex) => {
                    const ItemIcon = getIconComponent(item.icon);
                    return (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (sectionIndex * 0.2) + (itemIndex * 0.1) }}
                        className={`${isDarkMode ? 'bg-[#070B14]' : 'bg-gray-50'} rounded-xl overflow-hidden shadow-xl`}
                      >
                        <div className="relative h-48">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <ItemIcon size={24} className="text-white" />
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          </div>
                        </div>

                        <div className="p-6">
                          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
                            {item.description}
                          </p>

                          <div className="space-y-2">
                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                              Highlights:
                            </h4>
                            {item.highlights.map((highlight, highlightIndex) => (
                              <div key={highlightIndex} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;