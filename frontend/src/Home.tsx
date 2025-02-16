import React, { useEffect, useState } from 'react';
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

// ✅ Custom Left Arrow
const PrevArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
  <div className={`${className} custom-arrow prev`} style={{ ...style, display: "block" }} onClick={onClick}>
    ❮
  </div>
);

// ✅ Custom Right Arrow
const NextArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => (
  <div className={`${className} custom-arrow next`} style={{ ...style, display: "block" }} onClick={onClick}>
    ❯
  </div>
);

interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
}

interface ApiReview {
  id: number;
  username: string;
  stars: number;
  comment: string;
  visible: boolean;
}

const Home: React.FC<{ language: string }> = ({ language }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://portfoliobe-production-cf2e.up.railway.app/api/reviews");
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data: ApiReview[] = await response.json();
  
        // ✅ Only store visible reviews in state
        const formattedReviews: Review[] = data
          .filter((review) => review.visible) // ✅ Ensure only visible reviews are shown
          .map((review: ApiReview) => ({
            id: review.id,
            author: review.username,
            content: review.comment,
            rating: review.stars,
          }));
  
        setReviews(formattedReviews);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviews();
  }, []);
  

  // ✅ Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="page">
      <div className="home-container">
        <div className="home-text">
          <h2 className="title">
            {language === 'en' ? "I'm" : "Je suis"} <span className="highlight">Vinicius</span>, <br />
            {language === 'en' ? "a Full Stack Developer" : "un Développeur Full Stack"}
          </h2>
          <p className="description">
            {language === 'en'
              ? "I specialize in building high-quality, responsive applications with modern technologies."
              : "Je suis spécialisé dans la création d'applications modernes, réactives et de haute qualité."}
          </p>
          <div className="buttons">
            <a href="/Vinicius Velozo de Sousa.pdf" download className="btn download-cv">
              Download CV (EN)
            </a>
            <a href="/Vinicius Velozo de SousaFS(1).pdf" download className="btn download-cv">
              Télécharger CV (FR)
            </a>
          </div>
        </div>

        <div className="home-image">
          <img src="/vini.jpg" alt="Vinicius" />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="home-reviews-section">
        <h2 className="home-reviews-title">{language === 'en' ? "Reviews" : "Avis"}</h2>
        <div className="home-reviews-stars">⭐⭐⭐⭐⭐</div>

        {loading && <p>{language === 'en' ? "Loading reviews..." : "Chargement des avis..."}</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && reviews.length === 0 && (
          <p>{language === 'en' ? "No reviews available yet." : "Aucun avis disponible pour l'instant."}</p>
        )}

        {reviews.length > 0 && (
          <Slider {...settings} className="home-reviews-slider">
            {reviews.map((review) => (
              <div key={review.id} className="home-review-card">
                <h3 className="home-review-author">{review.author}</h3>
                <p className="home-review-content">"{review.content}"</p>
                <p className="home-review-rating">⭐ {review.rating}/5</p>
              </div>
            ))}
          </Slider>
        )}
      </div>

      {/* Technologies Section */}
      <h2 className="tech-title">{language === 'en' ? "Languages - Frameworks - Tools" : "Langages - Frameworks - Outils"}</h2>
      <br />
      <div className="tech-icons-container">
        <img src="https://skillicons.dev/icons?i=react,bootstrap,html,css,vscode,github,figma,git" alt="Tech Icons" />
        <img src="https://skillicons.dev/icons?i=nodejs,python,javascript,typescript,mongodb,java" alt="Tech Icons" /><br />
      </div>
    </div>
  );
};

export default Home;
