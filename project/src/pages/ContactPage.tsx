import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, ChevronLeft, Sun, Moon, Globe, Send, Download, User, MessageSquare } from 'lucide-react';
import { useLocaleData } from '../hooks/useLocaleData';
import { PageProps } from '../types';
import emailjs from '@emailjs/browser';

function ContactPage({ isDarkMode, toggleTheme, toggleLanguage }: PageProps) {
  const { t } = useTranslation();
  const { personalData } = useLocaleData();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    
    setIsSubmitting(true);

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then((result) => {
        console.log(result.text);
        setSubmitStatus('success');
        form.current?.reset();
      }, (error) => {
        console.log(error.text);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

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
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('contact.title')}
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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.subtitle')}
            </h2>
            <button
              onClick={downloadCV}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all font-medium"
            >
              <Download size={20} />
              Download CV
            </button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <a
                  href={`mailto:${personalData.social.find(s => s.platform === 'Email')?.url.replace('mailto:', '')}`}
                  className={`flex items-center gap-4 p-6 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-blue-400 bg-[#070B14] hover:bg-[#0A0F1A]' 
                      : 'text-gray-700 hover:text-blue-600 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Mail size={24} className="text-blue-400" />
                  <div>
                    <p className="font-medium text-lg">Email</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {personalData.social.find(s => s.platform === 'Email')?.username}
                    </p>
                  </div>
                </a>

                <a
                  href={personalData.social.find(s => s.platform === 'LinkedIn')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-6 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-blue-400 bg-[#070B14] hover:bg-[#0A0F1A]' 
                      : 'text-gray-700 hover:text-blue-600 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Linkedin size={24} className="text-blue-400" />
                  <div>
                    <p className="font-medium text-lg">LinkedIn</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {personalData.social.find(s => s.platform === 'LinkedIn')?.username}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${isDarkMode ? 'bg-[#070B14]' : 'bg-gray-50'} p-8 rounded-xl`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Send a Message
              </h3>

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <User size={16} className="inline mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-[#0A0F1A] border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-[#0A0F1A] border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <MessageSquare size={16} className="inline mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                      isDarkMode 
                        ? 'bg-[#0A0F1A] border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center">
                    Failed to send message. Please try again or contact me directly via email.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;