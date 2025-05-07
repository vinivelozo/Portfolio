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
import { FaGraduationCap, FaLaptopCode, FaPlus, FaTrash, FaPencilAlt, FaSave, FaTimes } from "react-icons/fa";
import "./Education.css";

// Define types for our timeline event
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

// Initial event data
const initialEvents: TimelineEvent[] = [
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

interface EducationProps {
  language: string;
  isAdmin?: boolean;
}

const Education: React.FC<EducationProps> = ({ language, isAdmin = false }) => {
  // State for timeline events
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<TimelineEvent | null>(null);

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("timelineEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      // Initialize with default events if nothing in localStorage
      setEvents(initialEvents);
      localStorage.setItem("timelineEvents", JSON.stringify(initialEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("timelineEvents", JSON.stringify(events));
    }
  }, [events]);

  // Handler for adding a new event
  const handleAddEvent = () => {
    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      date: {
        en: "",
        fr: ""
      },
      icon: "code",
      title: {
        en: "",
        fr: ""
      },
      text: {
        en: "",
        fr: ""
      }
    };
    
    setCurrentEvent(newEvent);
    setIsEditing(true);
  };

  // Handler for editing an existing event
  const handleEditEvent = (event: TimelineEvent) => {
    setCurrentEvent({...event});
    setIsEditing(true);
  };

  // Handler for deleting an event
  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
  };

  // Handler for saving an event (new or edited)
  const handleSaveEvent = () => {
    if (!currentEvent) return;
    
    // Validate required fields
    if (!currentEvent.date.en || !currentEvent.title.en || !currentEvent.text.en) {
      alert(language === 'en' ? "Please fill all required fields" : "Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    if (events.some(e => e.id === currentEvent.id)) {
      // Update existing event
      setEvents(events.map(e => e.id === currentEvent.id ? currentEvent : e));
    } else {
      // Add new event
      setEvents([...events, currentEvent]);
    }
    
    setIsEditing(false);
    setCurrentEvent(null);
  };

  // Map icon string to React component
  const getIconComponent = (iconType: string) => {
    switch(iconType) {
      case "graduation":
        return <FaGraduationCap />;
      case "code":
      default:
        return <FaLaptopCode />;
    }
  };

  // Render event form for adding/editing
  const renderEventForm = () => {
    if (!currentEvent) return null;
    
    return (
      <div className="event-form">
        <h3>{language === 'en' ? 'Edit Event' : 'Modifier l\'événement'}</h3>
        
        <div className="form-group">
          <label>{language === 'en' ? 'Icon' : 'Icône'}</label>
          <select 
            value={currentEvent.icon}
            onChange={(e) => setCurrentEvent({
              ...currentEvent, 
              icon: e.target.value as "graduation" | "code"
            })}
          >
            <option value="code">{language === 'en' ? 'Code' : 'Code'}</option>
            <option value="graduation">{language === 'en' ? 'Graduation' : 'Diplôme'}</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>{language === 'en' ? 'English Title' : 'Titre en anglais'}</label>
          <input 
            type="text" 
            value={currentEvent.title.en}
            onChange={(e) => setCurrentEvent({
              ...currentEvent, 
              title: {...currentEvent.title, en: e.target.value}
            })}
          />
        </div>
        
        <div className="form-group">
          <label>{language === 'en' ? 'French Title' : 'Titre en français'}</label>
          <input 
            type="text" 
            value={currentEvent.title.fr}
            onChange={(e) => setCurrentEvent({
              ...currentEvent, 
              title: {...currentEvent.title, fr: e.target.value}
            })}
          />
        </div>
        
        <div className="form-group">
          <label>{language === 'en' ? 'English Date' : 'Date en anglais'}</label>
          <input 
            type="text" 
            value={currentEvent.date.en}
            onChange={(e) => setCurrentEvent({
              ...currentEvent, 
              date: {...currentEvent.date, en: e.target.value}
            })}
          />
        </div>
        
        <div className="form-group">
          <label>{language === 'en' ? 'French Date' : 'Date en français'}</label>
          <input 
            type="text" 
            value={currentEvent.date.fr}
            onChange={(e) => setCurrentEvent({
              ...currentEvent, 
              date: {...currentEvent.date, fr: e.target.value}
            })}
          />
        </div>
        
        <div className="form-group">
          <label>{language === 'en' ? 'English Description' : 'Description en anglais'}</label>
          <textarea 
            value={currentEvent.text.en}
            onChange={(e) => setCurrentEvent({
              ...currentEvent, 
              text: {...currentEvent.text, en: e.target.value}
            })}
          />
        </div>
        
        <div className="form-group">
          <label>{language === 'en' ? 'French Description' : 'Description en français'}</label>
          <textarea 
            value={currentEvent.text.fr}
            onChange={(e) => setCurrentEvent({
              ...currentEvent, 
              text: {...currentEvent.text, fr: e.target.value}
            })}
          />
        </div>
        
        <div className="form-actions">
          <button className="save-btn" onClick={handleSaveEvent}>
            <FaSave /> {language === 'en' ? 'Save' : 'Enregistrer'}
          </button>
          <button className="cancel-btn" onClick={() => {
            setIsEditing(false);
            setCurrentEvent(null);
          }}>
            <FaTimes /> {language === 'en' ? 'Cancel' : 'Annuler'}
          </button>
        </div>
      </div>
    );
  };

  // Admin controls
  const renderAdminControls = () => {
    return (
      <div className="admin-controls">
        <button className="add-btn" onClick={handleAddEvent}>
          <FaPlus /> {language === 'en' ? 'Add New Event' : 'Ajouter un événement'}
        </button>
      </div>
    );
  };

  return (
    <div className="page">
      <div className="education-container">
        <h1 className="education-title">
          {language === 'en' ? 'Education & Experience' : 'Éducation & Expérience'}
        </h1>
        
        {isAdmin && !isEditing && renderAdminControls()}
        
        {isEditing ? (
          renderEventForm()
        ) : (
          <div className="timeline">
            {events.map((event, index) => (
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
                
                {isAdmin && (
                  <div className="event-actions">
                    <button className="edit-btn" onClick={() => handleEditEvent(event)}>
                      <FaPencilAlt />
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteEvent(event.id)}>
                      <FaTrash />
                    </button>
                  </div>
                )}
                
                {index < events.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
