import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProject.css";

const AddProject: React.FC<{ language: string }> = ({ language }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [imageUploaded, setImageUploaded] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageUploaded(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    if (imageUploaded) {
      formData.append("imageUploaded", imageUploaded);
    }

    try {
      const response = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(language === 'en' ? "Failed to add project" : "Échec de l'ajout du projet");

      navigate("/projects"); // Redirect to projects page after successful submission
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(language === 'en' ? "An unknown error occurred." : "Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <div className="add-project-container">
      <h1 className="add-project-title">{language === 'en' ? "Add New Project" : "Ajouter un nouveau projet"}</h1>
      {error && <p className="add-project-error">{error}</p>}
      <form onSubmit={handleSubmit} className="add-project-form">
        <label className="add-project-label">{language === 'en' ? "Project Name:" : "Nom du projet :"}</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="add-project-input"
          required
        />

        <label className="add-project-label">{language === 'en' ? "Project Description:" : "Description du projet :"}</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="add-project-textarea"
          required
        />

        <label className="add-project-label">{language === 'en' ? "Upload Image:" : "Télécharger une image :"}</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="add-project-file-input"
        />

        <button type="submit" className="add-project-button">{language === 'en' ? "Submit" : "Soumettre"}</button>
      </form>
    </div>
  );
};

export default AddProject;
