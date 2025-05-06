import React, { useState } from 'react';
import './Review.css';

const Review: React.FC<{ language: string }> = ({ language }) => {
  const [username, setUsername] = useState('');
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleStarClick = (rating: number) => {
    setStars(rating);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !comment || stars === 0) {
      setError(language === 'en' ? "Please enter your name, a comment, and select a star rating." : "Veuillez entrer votre nom, un commentaire et sélectionner une note.");
      return;
    }
    setError(null);
    setSuccessMessage(null);
  
    const newReview = {
      username,
      stars,
      comment
    };
  
    fetch("https://portfoliobe-production-cf2e.up.railway.app/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to submit review");
        }
        return response.status !== 204 ? await response.json() : null;
      })
      .then(() => {
        setUsername("");
        setStars(0);
        setComment("");
        setSuccessMessage(language === 'en' ? "Your review has been successfully submitted!" : "Votre avis a été soumis avec succès!");
      })
      .catch(() => setError(language === 'en' ? "Error submitting review. Please try again." : "Erreur lors de la soumission de l'avis. Veuillez réessayer."));
  };

  return (
    <div className="page">
      <div className="review-container">
        <h1 className="review-title">{language === 'en' ? "User Reviews" : "Avis des utilisateurs"}</h1>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <form className="review-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={language === 'en' ? "Your Name" : "Votre Nom"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= stars ? 'filled' : ''}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder={language === 'en' ? "Write your review..." : "Écrivez votre avis..."}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button type="submit">{language === 'en' ? "Submit Review" : "Soumettre l'avis"}</button>
        </form>
      </div>
    </div>
  );
};

export default Review;