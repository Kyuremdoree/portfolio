import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ChevronLeft, Sun, Moon, Globe } from 'lucide-react';
import { useLocaleData } from '../hooks/useLocaleData';
import { PageProps } from '../types';

function ProjectsPage({ isDarkMode, toggleTheme, toggleLanguage }: PageProps) {
  const { t } = useTranslation();
  const { projectsData } = useLocaleData();

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
            {t('projects.title')}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${isDarkMode ? 'bg-[#070B14]' : 'bg-gray-50'} rounded-lg overflow-hidden shadow-xl`}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <span className="text-blue-500">{project.year}</span>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                  {project.shortDescription}
                </p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <a 
                    href={project.link}
                    className="inline-flex items-center text-blue-500 hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} className="mr-2" />
                    {t('projects.sourceCode')}
                  </a>
                  {project.demoLink && (
                    <a 
                      href={project.demoLink}
                      className="inline-flex items-center text-blue-500 hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('projects.liveDemo')} <ExternalLink size={16} className="ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;