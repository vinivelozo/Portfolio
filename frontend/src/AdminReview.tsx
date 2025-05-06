import React, { useEffect, useState } from "react";
import "./AdminReviews.css";

interface Review {
  id: number;
  username: string;
  comment: string;
  stars: number;
  visible: boolean;
}

const AdminReviews: React.FC<{ language: string }> = ({ language }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await fetch("https://portfoliobe-production-cf2e.up.railway.app/api/reviews/all");
        if (!response.ok) throw new Error(language === 'en' ? "Failed to fetch reviews" : "Échec de la récupération des avis");
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : language === 'en' ? "An unknown error occurred." : "Une erreur inconnue s'est produite.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, [language]);

  const toggleVisibility = async (id: number, currentVisibility: boolean) => {
    try {
      const response = await fetch(`https://portfoliobe-production-cf2e.up.railway.app/api/reviews/${id}/visibility`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !currentVisibility }),
      });
  
      if (!response.ok) throw new Error(language === 'en' ? "Failed to update visibility" : "Échec de la mise à jour de la visibilité");
  
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === id ? { ...review, visible: !currentVisibility } : review
        )
      );
  
    } catch (error) {
      console.error("Error updating review visibility:", error);
    }
  };

  const deleteReview = async (id: number) => {
    try {
      const response = await fetch(`https://portfoliobe-production-cf2e.up.railway.app/api/reviews/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) throw new Error(language === 'en' ? "Failed to delete review" : "Échec de la suppression de l'avis");
  
      // Remove the deleted review from the state
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  

  return (
    <div className="admin-reviews-container">
      <h2>{language === 'en' ? "Admin Review Management" : "Gestion des avis "}</h2>
      {loading && <p>{language === 'en' ? "Loading reviews..." : "Chargement des avis..."}</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && reviews.length === 0 && <p>{language === 'en' ? "No reviews found." : "Aucun avis trouvé."}</p>}

      <table className="admin-reviews-table">
        <thead>
          <tr>
            <th>{language === 'en' ? "Username" : "Nom d'utilisateur"}</th>
            <th>{language === 'en' ? "Comment" : "Commentaire"}</th>
            <th>{language === 'en' ? "Stars" : "Étoiles"}</th>
            <th>{language === 'en' ? "Visibility" : "Visibilité"}</th>
            <th>{language === 'en' ? "Actions" : "Actions"}</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.username}</td>
              <td>{review.comment}</td>
              <td>⭐ {review.stars}/5</td>
              <td>
                <div 
                  className={`toggle-switch ${review.visible ? "on" : "off"}`}
                  onClick={() => toggleVisibility(review.id, review.visible)}
                >
                  <div className="toggle-slider"></div>
                </div>
                </td>
              <td>
                <button 
                  className="delete-button" 
                  onClick={() => {
                    if (window.confirm(language === 'en' 
                      ? "Are you sure you want to delete this review?" 
                      : "Êtes-vous sûr de vouloir supprimer cet avis?")) {
                      deleteReview(review.id);
                    }
                  }}
                >
                  {language === 'en' ? "Delete" : "Supprimer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviews;
