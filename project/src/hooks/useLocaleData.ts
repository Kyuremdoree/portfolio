import { useTranslation } from 'react-i18next';
import { PersonalData, ProjectsData, SkillsData, CareerData, AboutData } from '../types';

// Import all language-specific data
import enPersonal from '../data/en/personal.json';
import enProjects from '../data/en/projects.json';
import enSkills from '../data/en/skills.json';
import enCareer from '../data/en/career.json';
import enAbout from '../data/en/about.json';

import frPersonal from '../data/fr/personal.json';
import frProjects from '../data/fr/projects.json';
import frSkills from '../data/fr/skills.json';
import frCareer from '../data/fr/career.json';
import frAbout from '../data/fr/about.json';

interface LocaleData {
  personal: PersonalData;
  projects: ProjectsData;
  skills: SkillsData;
  career: CareerData;
  about: AboutData;
}

const data: Record<string, LocaleData> = {
  en: {
    personal: enPersonal as PersonalData,
    projects: enProjects as ProjectsData,
    skills: enSkills as SkillsData,
    career: enCareer as CareerData,
    about: enAbout as AboutData,
  },
  fr: {
    personal: frPersonal as PersonalData,
    projects: frProjects as ProjectsData,
    skills: frSkills as SkillsData,
    career: frCareer as CareerData,
    about: frAbout as AboutData,
  },
};

export const useLocaleData = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0];

  return {
    personalData: data[currentLanguage].personal,
    projectsData: data[currentLanguage].projects,
    skillsData: data[currentLanguage].skills,
    careerData: data[currentLanguage].career,
    aboutData: data[currentLanguage].about,
  };
};