export interface PersonalData {
  name: string;
  title: string;
  bio: string;
  location: string;
  profileImage: string;
  social: SocialPlatform[];
}

export interface SocialPlatform {
  platform: string;
  icon: string;
  url: string;
  username: string;
}

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  demoLink?: string;
  year: number;
}

export interface ProjectsData {
  projects: Project[];
}

export interface Skill {
  name: string;
  level: string;
  yearsOfExperience: number;
  icon: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface CareerItem {
  id: number;
  year: string;
  company: string;
  position: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface CareerData {
  timeline: CareerItem[];
}

export interface AboutContent {
  title: string;
  icon: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface AboutSection {
  id: string;
  title: string;
  icon: string;
  content: AboutContent[];
}

export interface AboutData {
  sections: AboutSection[];
}

export interface PageProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}