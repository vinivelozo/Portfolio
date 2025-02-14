import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Projects from "./Projects";
import Education from "./Education";
import ContactMe from "./ContactMe";
import Login from "./Login";
import Review from "./Review";
import AdminReviews from "./AdminReview";
import EditProject from "./EditProject";
import AddProject from "./AddProject";

const App = () => {
  const [language, setLanguage] = useState("en");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <Router>
      <Navbar activeSection="home" changeLanguage={changeLanguage} language={language} isAdmin={!!token} />
      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/projects" element={<Projects language={language} isAdmin={!!token} />} />
        <Route path="/education" element={<Education language={language} />} />
        <Route path="/contact" element={<ContactMe language={language} />} />
        <Route path="/login" element={<Login setToken={setToken} language={language} />} />
        <Route path="/reviews" element={<Review language={language} />} />

        {/* 🔒 Protect admin routes */}
        {token && (
          <>
            <Route path="/admin/reviews" element={<AdminReviews language={language} />} />
            <Route path="/add-project" element={<AddProject language={language} />} />
            <Route path="/edit-project/:id" element={<EditProject language={language} />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
