import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ExternalLink, Code, Server, Settings, Twitter, ChevronLeft, ChevronRight, ChevronDown, Sun, Moon, Calendar, Building2, MapPin, Award, Globe, FileText } from 'lucide-react';
import { useLocaleData } from '../hooks/useLocaleData';
import { PageProps, Project } from '../types';

function HomePage({ isDarkMode, toggleTheme, toggleLanguage }: PageProps) {
  const { t } = useTranslation();
  const { personalData, projectsData, skillsData, careerData } = useLocaleData();
  const [projectStartIndex, setProjectStartIndex] = useState<number>(0);
  const [skillStartIndices, setSkillStartIndices] = useState<Record<number, number>>(
    skillsData.categories.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const careerRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      Github, Linkedin, Mail, Twitter, Code, Server, Settings
    };
    return icons[iconName];
  };

  const handleProjectScroll = (direction: 'left' | 'right') => {
    setProjectStartIndex(prev => {
      if (direction === 'left') {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(projectsData.projects.length - 1, prev + 1);
      }
    });
  };

  const handleSkillScroll = (categoryIndex: number, direction: 'left' | 'right') => {
    setSkillStartIndices(prev => ({
      ...prev,
      [categoryIndex]: direction === 'left' 
        ? Math.max(0, prev[categoryIndex] - 1)
        : Math.min(skillsData.categories[categoryIndex].skills.length - 1, prev[categoryIndex] + 1)
    }));
  };

  const getVisibleItems = (): number => {
    return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed w-full z-40 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#0A0F1A] to-[#0A0F1A]/95' 
          : 'bg-gradient-to-b from-white to-white/95 shadow-sm'
      }`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className={`text-2xl font-bold tracking-tighter py-6 px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Alexis.L
          </div>
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => scrollToSection(projectsRef)}
              className={`px-6 h-full hover:text-blue-400 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {t('nav.projects')}
            </button>
            <button 
              onClick={() => scrollToSection(skillsRef)}
              className={`px-6 h-full hover:text-blue-400 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {t('nav.skills')}
            </button>
            <button 
              onClick={() => scrollToSection(careerRef)}
              className={`px-6 h-full hover:text-blue-400 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {t('nav.career')}
            </button>
            <Link
              to="/about"
              className={`px-6 h-full hover:text-blue-400 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              About
            </Link>
            <button 
              onClick={() => scrollToSection(contactRef)}
              className={`px-6 h-full hover:text-blue-400 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {t('nav.contact')}
            </button>
            <button
              onClick={toggleLanguage}
              className={`p-2 hover:bg-blue-600/10 rounded-full transition-colors flex items-center gap-2 ml-4 ${
                isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Globe size={20} />
              <span className="text-sm font-medium">{t('nav.language')}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-blue-600/10 rounded-full transition-colors ml-4"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} className={isDarkMode ? 'text-white' : 'text-gray-900'} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative pt-20">
        <div className={`absolute inset-0 bg-gradient-to-r ${
          isDarkMode 
            ? 'from-[#0A0F1A] via-[#0A0F1A]/50 to-transparent'
            : 'from-white via-white/90 to-transparent'
        } z-10`}></div>
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-20">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:pr-12"
          >
            <h1 className={`text-5xl lg:text-7xl font-bold mb-4 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('hero.im')} {personalData.name}.<br />
              <span className="text-4xl lg:text-6xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {personalData.title}
              </span><br />
              <span className="text-3xl lg:text-5xl text-gray-600">
                {t('hero.basedIn')} {personalData.location}.
              </span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}
            >
              {personalData.bio}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex space-x-6"
            >
              {personalData?.social && Array.isArray(personalData.social) && personalData.social.map((platform) => {
                const IconComponent = getIconComponent(platform.icon);
                return (
                  <motion.a
                    key={platform.platform}
                    href={platform.url}
                    className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors group relative`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={24} />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-sm whitespace-nowrap">
                      {platform.username}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
              onClick={() => scrollToSection(projectsRef)}
              className={`mt-12 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors flex items-center gap-2`}
            >
              {t('hero.scrollToExplore')} <ChevronDown size={20} />
            </motion.button>
          </motion.div>
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <img 
                src={personalData.profileImage}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${
                isDarkMode 
                  ? 'from-[#0A0F1A]'
                  : 'from-white'
              } via-transparent to-transparent`}></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className={`py-12 md:py-20 ${isDarkMode ? 'bg-[#070B14]' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('projects.title')}
            </h2>
            <Link
              to="/projects"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 hover:from-blue-700 hover:to-blue-900 transition-all"
            >
              {t('nav.viewAll')}
            </Link>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="wait">
                {projectsData.projects.slice(projectStartIndex, projectStartIndex + getVisibleItems()).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${isDarkMode ? 'bg-[#0A0F1A]' : 'bg-white'} rounded-lg overflow-hidden shadow-xl cursor-pointer`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-48 md:h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-sm md:text-lg font-semibold">{project.technologies.join(' • ')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-xl md:text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        <span className="text-blue-400 text-sm md:text-base">{project.year}</span>
                      </div>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 text-sm md:text-base`}>
                        {project.shortDescription}
                      </p>
                      <div className="flex justify-between items-center">
                        <a 
                          href={project.link}
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm md:text-base"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                        >
                          <Github size={16} className="mr-2" />
                          {t('projects.sourceCode')}
                        </a>
                        {project.demoLink && (
                          <a 
                            href={project.demoLink}
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm md:text-base"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                          >
                            {t('projects.liveDemo')} <ExternalLink size={14} className="ml-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={() => handleProjectScroll('left')}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-16 ${
                isDarkMode ? 'bg-[#0A0F1A]' : 'bg-white'
              } p-2 rounded-full ${
                projectStartIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#070B14]'
              }`}
              disabled={projectStartIndex === 0}
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => handleProjectScroll('right')}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-16 ${
                isDarkMode ? 'bg-[#0A0F1A]' : 'bg-white'
              } p-2 rounded-full ${
                projectStartIndex >= projectsData.projects.length - getVisibleItems() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#070B14]'
              }`}
              disabled={projectStartIndex >= projectsData.projects.length - getVisibleItems()}
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className={`py-12 md:py-20 ${isDarkMode ? 'bg-[#0A0F1A]' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('skills.title')}
          </h2>
          <div className="space-y-12 md:space-y-16">
            {skillsData.categories.map((category, categoryIndex) => (
              <div key={category.name} className="space-y-6 md:space-y-8">
                <h3 className={`text-xl md:text-2xl font-semibold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {React.createElement(getIconComponent(category.icon), { size: 20, className: "md:w-6 md:h-6" })}
                  {category.name}
                </h3>
                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <AnimatePresence mode="wait">
                      {category.skills
                        .slice(skillStartIndices[categoryIndex], skillStartIndices[categoryIndex] + getVisibleItems())
                        .map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: skillIndex * 0.1 }}
                            className={`${isDarkMode ? 'bg-[#070B14]' : 'bg-gray-50'} p-4 md:p-6 rounded-lg`}
                          >
                            <h4 className={`text-lg md:text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {skill.name}
                            </h4>
                            <p className="text-blue-400 mb-1 text-sm md:text-base">{skill.level}</p>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs md:text-sm`}>
                              {skill.yearsOfExperience} {t('skills.years')}
                            </p>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => handleSkillScroll(categoryIndex, 'left')}
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-16 ${
                      isDarkMode ? 'bg-[#0A0F1A]' : 'bg-white'
                    } p-2 rounded-full ${
                      skillStartIndices[categoryIndex] === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#070B14]'
                    }`}
                    disabled={skillStartIndices[categoryIndex] === 0}
                  >
                    <ChevronLeft size={20} className="md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={() => handleSkillScroll(categoryIndex, 'right')}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-16 ${
                      isDarkMode ? 'bg-[#0A0F1A]' : 'bg-white'
                    } p-2 rounded-full ${
                      skillStartIndices[categoryIndex] >= category.skills.length - getVisibleItems() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#070B14]'
                    }`}
                    disabled={skillStartIndices[categoryIndex] >= category.skills.length - getVisibleItems()}
                  >
                    <ChevronRight size={20} className="md:w-6 md:h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section ref={careerRef} className={`py-12 md:py-20 ${isDarkMode ? 'bg-[#0A0F1A]' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('career.title')}
            </h2>
            <Link
              to="/cv"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all font-medium"
            >
              <FileText size={20} />
              CV
            </Link>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-600/30"></div>
            {careerData.timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:translate-y-24'
                }`}
              >
                <div className={`${isDarkMode ? 'bg-[#070B14]' : 'bg-gray-50'} p-6 rounded-lg shadow-xl ${
                  index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Calendar size={20} />
                      <span className="font-semibold">{item.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={16} />
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={20} className="text-blue-400" />
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.company}
                    </h3>
                  </div>
                  <p className="text-blue-400 font-medium mb-4">{item.position}</p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{item.description}</p>
                  <div className="space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Award size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{achievement}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-blue-600/20 text-blue-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`hidden md:block ${
                  index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'
                }`}></div>
                <div className="absolute left-0 md:left-1/2 top-8 transform -translate-x-[0.9rem] md:-translate-x-[0.9rem]">
                  <div className="w-7 h-7 rounded-full border-4 border-blue-600 bg-[#070B14]"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className={`py-12 md:py-20 ${isDarkMode ? 'bg-[#070B14]' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 md:mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('contact.title')}
          </h2>
          <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}  mb-6 md:mb-8`}>
            {t('contact.subtitle')}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all inline-block"
            >
              {t('contact.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative max-w-4xl w-full ${isDarkMode ? 'bg-[#070B14]' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden`}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors z-10"
              >
                ×
              </button>

              <div className="relative h-64 md:h-96">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDarkMode ? 'from-[#070B14]' : 'from-white'
                } to-transparent opacity-90`}></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t('projects.overview')}
                  </h4>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedProject.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Github size={20} />
                    {t('projects.sourceCode')}
                  </a>
                  {selectedProject.demoLink && (
                    <a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink size={20} />
                      {t('projects.liveDemo')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HomePage;