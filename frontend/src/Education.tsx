// import { motion } from "framer-motion";
// import React from "react";
// import { FaGraduationCap, FaLaptopCode } from "react-icons/fa";
// import "./Education.css"; 

// const Education: React.FC<{ language: string }> = ({ language }) => {
//     const timelineEvents = [
//         {
//             date: language === 'en' ? "Feb 2025 - May 2025" : "Février 2025 - Mai 2025",
//             icon: <FaLaptopCode />,
//             title: language === 'en' 
//                 ? "Full Stack Developer - ACL Health Care Systems Inc." 
//                 : "Développeur Full Stack - ACL Health Care Systems Inc.",
//             text: language === 'en' 
//                 ? "Developed a complete web application for ACL Health Care Systems Inc. to manage appointments, invoices, customers and notifications."
//                 : "Développé une application web complète pour ACL Health Care Systems Inc. pour gérer les rendez-vous, les factures, les clients et les notifications."
//         },
//         {
//             date: language === 'en' ? "Sept 2024 - Feb 2025" : "Septembre 2024 - Février 2025",
//             icon: <FaLaptopCode />,
//             title: language === 'en' 
//                 ? "Full Stack Developer - C CLEAN INC" 
//                 : "Développeur Full Stack - C CLEAN INC",
//             text: language === 'en' 
//                 ? "Developed a complete web application for C Clean Inc to manage appointments, employees, and invoicing."
//                 : "Développé une application web complète pour C Clean Inc afin de gérer les rendez-vous, les employés et la facturation."
//         },
//         {
//             date: language === 'en' ? "June 2025" : "Juin 2025",
//             icon: <FaGraduationCap />,
//             title: language === 'en' 
//                 ? "Champlain College - Computer Science Graduate" 
//                 : "Collège Champlain - Diplômé en technique informatique",
//             text: language === 'en' 
//                 ? "Expected to complete a 3-year DEC in Computer Science, gaining hands-on experience in software development."
//                 : "Prévu pour terminer un programme de D.E.C. en informatique de 3 ans, acquérant une expérience pratique en développement logiciel."
//         }
        
//     ];

//     return (
//         <div className="page">
//             <div className="education-container">
//                 <h1 className="education-title">
//                     {language === 'en' ? 'Education & Experience' : 'Éducation & Expérience'}
//                 </h1>
//                 <div className="timeline">
//                     {timelineEvents.map((event, index) => (
//                         <motion.div
//                             key={index}
//                             className="timeline-event"
//                             initial={{ opacity: 0, y: 50 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.2 }}
//                         >
//                             <div className="timeline-icon">
//                                 {React.cloneElement(event.icon)}
//                             </div>
//                             <div className="timeline-content">
//                                 <h3 className="event-title">{event.title}</h3>
//                                 <p className="event-text">{event.text}</p>
//                                 <span className="event-date">{event.date}</span>
//                             </div>
//                             {index < timelineEvents.length - 1 && (
//                                 <div className="timeline-line"></div>
//                             )}
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Education;

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaGraduationCap, FaLaptopCode, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./Education.css";

// Define the timeline event interface
interface TimelineEvent {
  id: string;
  date: {
    en: string;
    fr: string;
  };
  icon: "graduation" | "code";
  title: {
    en: string;
    fr: string;
  };
  text: {
    en: string;
    fr: string;
  };
}

const Education: React.FC<{ language: string; isAdmin?: boolean }> = ({ 
  language, 
  isAdmin = false // Set to true when you want to enable editing
}) => {
  // State for timeline events
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  
  // Default form state
  const defaultFormState: TimelineEvent = {
    id: "",
    date: { en: "", fr: "" },
    icon: "code",
    title: { en: "", fr: "" },
    text: { en: "", fr: "" }
  };
  
  // Form state
  const [formData, setFormData] = useState<TimelineEvent>(defaultFormState);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("educationEvents");
    if (savedEvents) {
      setTimelineEvents(JSON.parse(savedEvents));
    } else {
      // Default events if nothing is in localStorage
      const defaultEvents: TimelineEvent[] = [
        {
          id: "1",
          date: {
            en: "Feb 2025 - May 2025",
            fr: "Février 2025 - Mai 2025"
          },
          icon: "code",
          title: {
            en: "Full Stack Developer - ACL Health Care Systems Inc.",
            fr: "Développeur Full Stack - ACL Health Care Systems Inc."
          },
          text: {
            en: "Developed a complete web application for ACL Health Care Systems Inc. to manage appointments, invoices, customers and notifications.",
            fr: "Développé une application web complète pour ACL Health Care Systems Inc. pour gérer les rendez-vous, les factures, les clients et les notifications."
          }
        },
        {
          id: "2",
          date: {
            en: "Sept 2024 - Feb 2025",
            fr: "Septembre 2024 - Février 2025"
          },
          icon: "code",
          title: {
            en: "Full Stack Developer - C CLEAN INC",
            fr: "Développeur Full Stack - C CLEAN INC"
          },
          text: {
            en: "Developed a complete web application for C Clean Inc to manage appointments, employees, and invoicing.",
            fr: "Développé une application web complète pour C Clean Inc afin de gérer les rendez-vous, les employés et la facturation."
          }
        },
        {
          id: "3",
          date: {
            en: "June 2025",
            fr: "Juin 2025"
          },
          icon: "graduation",
          title: {
            en: "Champlain College - Computer Science Graduate",
            fr: "Collège Champlain - Diplômé en technique informatique"
          },
          text: {
            en: "Expected to complete a 3-year DEC in Computer Science, gaining hands-on experience in software development.",
            fr: "Prévu pour terminer un programme de D.E.C. en informatique de 3 ans, acquérant une expérience pratique en développement logiciel."
          }
        }
      ];
      setTimelineEvents(defaultEvents);
      localStorage.setItem("educationEvents", JSON.stringify(defaultEvents));
    }
  }, []);

  // Save to localStorage whenever timelineEvents changes
  useEffect(() => {
    localStorage.setItem("educationEvents", JSON.stringify(timelineEvents));
  }, [timelineEvents]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: string,
    language?: 'en' | 'fr'
  ) => {
    if (language) {
      // For fields with language variations
      const currentValue = formData[field as keyof TimelineEvent];
      
      // Type guard to ensure we're working with an object that has language keys
      if (currentValue && typeof currentValue === 'object' && 'en' in currentValue && 'fr' in currentValue) {
        setFormData({
          ...formData,
          [field]: {
            ...currentValue,
            [language]: e.target.value
          }
        });
      }
    } else {
      // For simple fields
      setFormData({
        ...formData,
        [field]: e.target.value
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      // Update existing event
      setTimelineEvents(timelineEvents.map(event => 
        event.id === editingEvent.id ? formData : event
      ));
    } else {
      // Add new event with unique ID
      const newEvent = {
        ...formData,
        id: Date.now().toString()
      };
      setTimelineEvents([...timelineEvents, newEvent]);
    }
    
    // Reset form and state
    setFormData(defaultFormState);
    setEditingEvent(null);
    setShowForm(false);
  };

  // Handle delete event
  const handleDelete = (id: string) => {
    if (window.confirm(language === 'en' ? 'Are you sure you want to delete this item?' : 'Êtes-vous sûr de vouloir supprimer cet élément?')) {
      setTimelineEvents(timelineEvents.filter(event => event.id !== id));
    }
  };

  // Handle edit event
  const handleEdit = (event: TimelineEvent) => {
    setEditingEvent(event);
    setFormData(event);
    setShowForm(true);
  };

  // Get icon component based on icon type
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'graduation':
        return <FaGraduationCap />;
      case 'code':
      default:
        return <FaLaptopCode />;
    }
  };

  return (
    <div className="page">
      <div className="education-container">
        <h1 className="education-title">
          {language === 'en' ? 'Education & Experience' : 'Éducation & Expérience'}
        </h1>
        
        {/* Admin Controls */}
        {isAdmin && (
          <div className="admin-controls">
            <button 
              className="add-button"
              onClick={() => {
                setFormData(defaultFormState);
                setEditingEvent(null);
                setShowForm(true);
              }}
            >
              <FaPlus /> {language === 'en' ? 'Add New' : 'Ajouter'}
            </button>
          </div>
        )}
        
        {/* Add/Edit Form */}
        {showForm && isAdmin && (
          <div className="education-form-container">
            <h3>{editingEvent ? (language === 'en' ? 'Edit Item' : 'Modifier') : (language === 'en' ? 'Add New Item' : 'Ajouter un Élément')}</h3>
            <form onSubmit={handleSubmit} className="education-form">
              {/* English Fields */}
              <div className="form-section">
                <h4>{language === 'en' ? 'English Content' : 'Contenu en Anglais'}</h4>
                
                <label>
                  {language === 'en' ? 'Date (English):' : 'Date (Anglais):'}
                  <input 
                    type="text" 
                    value={formData.date.en} 
                    onChange={(e) => handleChange(e, 'date', 'en')}
                    placeholder="e.g. Feb 2025 - May 2025"
                    required
                  />
                </label>
                
                <label>
                  {language === 'en' ? 'Title (English):' : 'Titre (Anglais):'}
                  <input 
                    type="text" 
                    value={formData.title.en} 
                    onChange={(e) => handleChange(e, 'title', 'en')}
                    placeholder="e.g. Full Stack Developer - Company Name"
                    required
                  />
                </label>
                
                <label>
                  {language === 'en' ? 'Description (English):' : 'Description (Anglais):'}
                  <textarea 
                    value={formData.text.en} 
                    onChange={(e) => handleChange(e, 'text', 'en')}
                    placeholder="Enter description in English"
                    required
                  />
                </label>
              </div>
              
              {/* French Fields */}
              <div className="form-section">
                <h4>{language === 'en' ? 'French Content' : 'Contenu en Français'}</h4>
                
                <label>
                  {language === 'en' ? 'Date (French):' : 'Date (Français):'}
                  <input 
                    type="text" 
                    value={formData.date.fr} 
                    onChange={(e) => handleChange(e, 'date', 'fr')}
                    placeholder="e.g. Février 2025 - Mai 2025"
                    required
                  />
                </label>
                
                <label>
                  {language === 'en' ? 'Title (French):' : 'Titre (Français):'}
                  <input 
                    type="text" 
                    value={formData.title.fr} 
                    onChange={(e) => handleChange(e, 'title', 'fr')}
                    placeholder="e.g. Développeur Full Stack - Nom de l'entreprise"
                    required
                  />
                </label>
                
                <label>
                  {language === 'en' ? 'Description (French):' : 'Description (Français):'}
                  <textarea 
                    value={formData.text.fr} 
                    onChange={(e) => handleChange(e, 'text', 'fr')}
                    placeholder="Entrez la description en français"
                    required
                  />
                </label>
              </div>
              
              {/* Common Fields */}
              <div className="form-section">
                <h4>{language === 'en' ? 'General Settings' : 'Paramètres Généraux'}</h4>
                
                <label>
                  {language === 'en' ? 'Icon:' : 'Icône:'}
                  <select 
                    value={formData.icon} 
                    onChange={(e) => handleChange(e, 'icon')}
                    required
                  >
                    <option value="code">{language === 'en' ? 'Code/Work' : 'Code/Travail'}</option>
                    <option value="graduation">{language === 'en' ? 'Education/Graduation' : 'Éducation/Diplôme'}</option>
                  </select>
                </label>
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="save-button">
                  {language === 'en' ? 'Save' : 'Enregistrer'}
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
                  }}
                >
                  {language === 'en' ? 'Cancel' : 'Annuler'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Timeline Display */}
        <div className="timeline">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="timeline-event"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="timeline-icon">
                {getIconComponent(event.icon)}
              </div>
              <div className="timeline-content">
                <h3 className="event-title">{event.title[language === 'en' ? 'en' : 'fr']}</h3>
                <p className="event-text">{event.text[language === 'en' ? 'en' : 'fr']}</p>
                <span className="event-date">{event.date[language === 'en' ? 'en' : 'fr']}</span>
              </div>
              
              {/* Admin Actions */}
              {isAdmin && (
                <div className="admin-actions">
                  <button 
                    className="edit-button" 
                    onClick={() => handleEdit(event)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(event.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
              
              {index < timelineEvents.length - 1 && (
                <div className="timeline-line"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;