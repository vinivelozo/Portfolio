import React, { useState } from "react";
import "./ContactMe.css"; // Import CSS file for styling

const ContactMe: React.FC<{ language: string }> = ({ language }) => {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<{ type: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Simple Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: language === "en" ? "All fields are required!" : "Tous les champs sont obligatoires !",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://portfoliobe-production-cf2e.up.railway.app/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus({
          type: "success",
          message: language === "en" ? "Email sent successfully!" : "Email envoyé avec succès !",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: result.error || (language === "en" ? "Failed to send email." : "Échec de l'envoi de l'email."),
        });
      }
    } catch (error) {
      console.error("Error sending email:", error); // ✅ Fix for ESLint unused variable warning
      setStatus({
        type: "error",
        message: language === "en" ? "An error occurred. Please try again!" : "Une erreur s'est produite. Veuillez réessayer !",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="contact-container">
        {/* Left Section - Contact Info */}
        <div className="contact-info">
          <h1 className="contact-title">
            <span className="text-yellow">{language === "en" ? "Contact" : "Contactez-"}</span>
            <span className="text-yellow">{language === "en" ? " Me" : "Moi"}</span>
          </h1>

          <p className="contact-description">
            {language === "en"
              ? "If you have any questions or would like to collaborate, feel free to reach out to me:"
              : "Si vous avez des questions ou souhaitez collaborer, n'hésitez pas à me contacter :"}
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={language === "en" ? "Your Name" : "Votre Nom"}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={language === "en" ? "Your Email" : "Votre Email"}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder={language === "en" ? "Your Message" : "Votre Message"}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" disabled={loading}>
              {loading
                ? language === "en"
                  ? "Sending..."
                  : "Envoi..."
                : language === "en"
                ? "Send Message"
                : "Envoyer le Message"}
            </button>
          </form>

          {/* Status Message */}
          {status && (
            <p className={status.type === "success" ? "success-message" : "error-message"}>{status.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
