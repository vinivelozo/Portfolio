import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProject.css";

interface Project {
  id: number;
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectGithub: string | null; // ✅ New field
  inventoryImage: string | null;
  imageUploaded: string | null;
}

const EditProject: React.FC<{ language: string }> = ({ language }) => {
  const { id } = useParams<{ id: string }>(); // Get project ID from URL
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGithub, setProjectGithub] = useState(""); // ✅ New field
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/projects/${id}`);
        if (!response.ok) throw new Error(language === 'en' ? "Failed to fetch project" : "Échec de la récupération du projet");
        const data: Project = await response.json();

        setProject(data);
        setProjectName(data.projectName);
        setProjectDescription(data.projectDescription);
        setProjectGithub(data.projectGithub || ""); // ✅ Fetch GitHub URL
      } catch (err) {
        console.error(language === 'en' ? "Error fetching project:" : "Erreur lors de la récupération du projet:", err);
      }
    };

    fetchProject();
  }, [id, language]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectGithub", projectGithub); // ✅ Send GitHub URL
    if (image) {
      formData.append("imageUploaded", image);
    }

    try {
      const response = await fetch(`https://portfoliobe-production-cf2e.up.railway.app/api/projects/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error(language === 'en' ? "Failed to update project" : "Échec de la mise à jour du projet");

      alert(language === 'en' ? "Project updated successfully!" : "Projet mis à jour avec succès!");
      navigate("/projects"); // ✅ Redirect back to projects page
    } catch (err) {
      console.error(language === 'en' ? "Error updating project:" : "Erreur lors de la mise à jour du projet:", err);
      alert(language === 'en' ? "Error updating project." : "Erreur lors de la mise à jour du projet.");
    }
  };

  if (!project) return <p>{language === 'en' ? "Loading project details..." : "Chargement des détails du projet..."}</p>;

  return (
    <div className="edit-project-container">
      <h2 className="edit-project-title">{language === 'en' ? "Edit Project" : "Modifier le projet"}</h2>
      <form onSubmit={handleSubmit} className="edit-project-form">
        <label className="edit-project-label">{language === 'en' ? "Project Name:" : "Nom du projet:"}</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="edit-project-input"
          required
        />

        <label className="edit-project-label">{language === 'en' ? "Project Description:" : "Description du projet:"}</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="edit-project-textarea"
          required
        />

        <label className="edit-project-label">{language === 'en' ? "GitHub Repository URL:" : "Lien du dépôt GitHub :"}</label>
        <input
          type="url"
          value={projectGithub}
          onChange={(e) => setProjectGithub(e.target.value)}
          className="edit-project-input"
          placeholder="https://github.com/your-repo"
        />

        <label className="edit-project-label">{language === 'en' ? "Upload New Image:" : "Télécharger une nouvelle image:"}</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="edit-project-file-input"
        />

        {project.imageUploaded && (
          <img
            src={`data:image/png;base64,${project.imageUploaded}`}
            alt={language === 'en' ? "Current Project" : "Projet actuel"}
            className="edit-project-preview"
          />
        )}

        <div className="edit-project-buttons">
          <button type="submit" className="edit-project-save">{language === 'en' ? "Save Changes" : "Enregistrer les modifications"}</button>
          <button type="button" className="edit-project-cancel" onClick={() => navigate("/projects")}>
            {language === 'en' ? "Cancel" : "Annuler"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
