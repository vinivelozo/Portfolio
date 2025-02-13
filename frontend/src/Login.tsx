import React, { useState } from 'react'; 
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC<{ language: string }> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation logic (replace with actual authentication logic)
    if (email === 'test@example.com' && password === 'password') {
      navigate('/');
    } else {
      setError(language === 'en' ? 'Invalid email or password' : 'Email ou mot de passe invalide');
    }
  };

  return (
    <div className="page login-page">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">{language === 'en' ? 'Welcome Back' : 'Bienvenue'}</h2>
          <p className="login-subtitle">{language === 'en' ? 'Please enter your credentials to log in' : 'Veuillez entrer vos informations pour vous connecter'}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{language === 'en' ? 'Email' : 'Email'}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">{language === 'en' ? 'Password' : 'Mot de passe'}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">{language === 'en' ? 'Log In' : 'Se connecter'}</button>
            <p className="forgot-password">{language === 'en' ? 'Forgot your password?' : 'Mot de passe oublié?'}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
