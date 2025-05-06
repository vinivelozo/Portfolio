import { motion } from "framer-motion";
import React from "react";
import { FaGraduationCap, FaLaptopCode } from "react-icons/fa";
import "./Education.css"; 

const Education: React.FC<{ language: string }> = ({ language }) => {
    const timelineEvents = [
        {
            date: language === 'en' ? "Feb 2025 - May 2025" : "Février 2025 - Mai 2025",
            icon: <FaLaptopCode />,
            title: language === 'en' 
                ? "Full Stack Developer - ACL Health Care Systems Inc." 
                : "Développeur Full Stack - ACL Health Care Systems Inc.",
            text: language === 'en' 
                ? "Developed a complete web application for ACL Health Care Systems Inc. to manage appointments, invoices, customers and notifications."
                : "Développé une application web complète pour ACL Health Care Systems Inc. pour gérer les rendez-vous, les factures, les clients et les notifications."
        },
        {
            date: language === 'en' ? "Sept 2024 - Feb 2025" : "Septembre 2024 - Février 2025",
            icon: <FaLaptopCode />,
            title: language === 'en' 
                ? "Full Stack Developer - C CLEAN INC" 
                : "Développeur Full Stack - C CLEAN INC",
            text: language === 'en' 
                ? "Developed a complete web application for C Clean Inc to manage appointments, employees, and invoicing."
                : "Développé une application web complète pour C Clean Inc afin de gérer les rendez-vous, les employés et la facturation."
        },
        {
            date: language === 'en' ? "June 2025" : "Juin 2025",
            icon: <FaGraduationCap />,
            title: language === 'en' 
                ? "Champlain College - Computer Science Graduate" 
                : "Collège Champlain - Diplômé en technique informatique",
            text: language === 'en' 
                ? "Expected to complete a 3-year DEC in Computer Science, gaining hands-on experience in software development."
                : "Prévu pour terminer un programme de D.E.C. en informatique de 3 ans, acquérant une expérience pratique en développement logiciel."
        }
        
    ];

    return (
        <div className="page">
            <div className="education-container">
                <h1 className="education-title">
                    {language === 'en' ? 'Education & Experience' : 'Éducation & Expérience'}
                </h1>
                <div className="timeline">
                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            className="timeline-event"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="timeline-icon">
                                {React.cloneElement(event.icon)}
                            </div>
                            <div className="timeline-content">
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-text">{event.text}</p>
                                <span className="event-date">{event.date}</span>
                            </div>
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
