import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./projects.css";

// Define the Project type
interface Project {
  id: number;
  projectId: string;
  projectName: string;
  projectDescription: string;
  inventoryImage: string | null;
  imageUploaded: string | null; // Store the Base64 image as a string
}

const Projects: React.FC<{ language: string }> = ({ language }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch projects from the backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");

      const data: Project[] = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Project
  const handleDelete = async (id: number) => {
    if (!window.confirm(language === 'en' ? "Are you sure you want to delete this project?" : "Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      // Remove deleted project from state
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
      setError(language === 'en' ? "Failed to delete project. Please try again." : "Échec de la suppression du projet. Veuillez réessayer.");
    }
  };

  // Edit Project (Navigates to Edit Page)
  const handleEdit = (id: number) => {
    navigate(`/edit-project/${id}`);
  };

  // Add Project (Navigates to Add Project Page)
  const handleAddProject = () => {
    navigate("/add-project");
  };

  return (
    <div className="page">
      <h1 className="projects-title">{language === 'en' ? "Projects" : "Projets"}</h1>
  
      {/* ✅ Add Project Button */}
      <button className="add-project-btn" onClick={handleAddProject}>
        {language === 'en' ? "Add Project" : "Ajouter un projet"}
      </button>

      <br />
      <p className="projects-description">
        {language === 'en' ? "Here are some of the projects I've worked on:" : "Voici quelques projets sur lesquels j'ai travaillé :"}
      </p>
  
      {/* ✅ Loading State */}
      {loading && <p>{language === 'en' ? "Loading projects..." : "Chargement des projets..."}</p>}
      
      {/* ✅ Error Message */}
      {error && <p className="error">{error}</p>}

      {/* ✅ No Projects Available */}
      {!loading && !error && projects.length === 0 && <p>{language === 'en' ? "No projects available yet." : "Aucun projet disponible pour le moment."}</p>}

      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {/* ✅ Display Image Properly */}
            {project.imageUploaded ? (
              <img
                src={project.imageUploaded} // Using the Base64 string directly
                alt={project.projectName}
                className="project-image"
              />
            ) : (
              <img src="/placeholder.png" alt="Placeholder" className="project-image" />
            )}

            <h2>{project.projectName}</h2>
            <p>{project.projectDescription}</p>

            {/* ✅ Buttons for Edit and Delete */}
            <div className="project-buttons">
              <button className="edit-project-btn" onClick={() => handleEdit(project.id)}>
                {language === 'en' ? "Edit" : "Modifier"}
              </button>
              <button className="delete-project-btn" onClick={() => handleDelete(project.id)}>
                {language === 'en' ? "Delete" : "Supprimer"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
