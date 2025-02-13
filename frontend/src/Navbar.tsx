import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'; 
import './Navbar.css';

const Navbar: React.FC<{ activeSection: string; changeLanguage: (language: string) => void; language: string }> = ({
  activeSection,
  changeLanguage,
  language,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path: string, sectionId: string) => {
    navigate(path);
    setIsOpen(false); // Close menu when a link is clicked
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('nav')?.clientHeight || 0;
      const scrollToPosition = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">Vinicius</div>

        {/* Hamburger Menu for Mobile */}
        <button className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Links (Hidden in Mobile, Visible in Desktop) */}
        <ul className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`}>
          {[
            { section: 'home', label: language === 'en' ? 'Home' : 'Accueil', path: '/' },
            { section: 'projects', label: language === 'en' ? 'Projects' : 'Projets', path: '/projects' },
            { section: 'education', label: language === 'en' ? 'Education' : 'Éducation', path: '/education' },
            { section: 'reviews', label: language === 'en' ? 'Reviews' : 'Avis', path: '/reviews' },
            { section: 'contact', label: language === 'en' ? 'Contact Me' : 'Contactez-moi', path: '/contact' },
            { section: 'admin/reviews', label: 'Admin', path: '/admin/reviews' },
            { section: 'login', label: language === 'en' ? 'Log in' : 'Connexion', path: '/login' }
          ].map(({ section, label, path }) => (
            <li key={section}>
              <button
                className={`navbar-link ${activeSection === section ? 'navbar-link-active' : ''}`}
                onClick={() => handleNavigation(path, section)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Social Links */}
        <div className="social-links">
          {[
            { Icon: FaGithub, href: "https://github.com/vinivelozo" },
            { Icon: FaLinkedin, href: "https://www.linkedin.com/in/vinicius-velozo-de-sousa-612bb6216/" },
            { Icon: FaEnvelope, href: "mailto:vinivelozo02@outlook.com" }
          ].map(({ Icon, href }, index) => (
            <a key={index} href={href} className="social-icon" target="_blank" rel="noopener noreferrer">
              <Icon size={24} />
            </a>
          ))}
        </div>

        {/* Language Selector */}
        <select className="language-selector" onChange={(e) => changeLanguage(e.target.value)} value={language}>
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
