import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            projects: 'Projects',
            skills: 'Skills',
            career: 'Career',
            contact: 'Contact',
            about: 'About',
            viewAll: 'View All Projects',
            backToHome: 'Back to Home',
            language: 'EN',
            cv: 'CV'
          },
          hero: {
            im: "I'm",
            basedIn: 'based in',
            scrollToExplore: 'Scroll to explore'
          },
          projects: {
            title: 'Projects',
            sourceCode: 'Source Code',
            liveDemo: 'Live Demo',
            overview: 'Project Overview'
          },
          skills: {
            title: 'Experience & Skills',
            years: 'years'
          },
          career: {
            title: 'Career Journey'
          },
          contact: {
            title: "Let's Create Together",
            subtitle: "Have a project in mind? Let's bring it to life.",
            cta: 'Start a Conversation'
          }
        }
      },
      fr: {
        translation: {
          nav: {
            projects: 'Projets',
            skills: 'Compétences',
            career: 'Carrière',
            contact: 'Contact',
            about: 'À propos',
            viewAll: 'Voir tous les projets',
            backToHome: 'Retour à l\'accueil',
            language: 'FR',
            cv: 'CV'
          },
          hero: {
            im: 'Je suis',
            basedIn: 'basé en',
            scrollToExplore: 'Défiler pour explorer'
          },
          projects: {
            title: 'Projets',
            sourceCode: 'Code source',
            liveDemo: 'Démo en direct',
            overview: 'Aperçu du projet'
          },
          skills: {
            title: 'Expérience & Compétences',
            years: 'ans'
          },
          career: {
            title: 'Parcours professionnel'
          },
          contact: {
            title: 'Créons ensemble',
            subtitle: 'Vous avez un projet en tête ? Donnons-lui vie.',
            cta: 'Démarrer une conversation'
          }
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;