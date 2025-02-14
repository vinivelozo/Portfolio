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
  imageUploaded: string | null;
  projectGithub: string | null;
}

// ✅ Image Mapping based on project names
const projectImages: { [key: string]: string } = {
  "Pet Clinic": "/vet.jpg",
  "Watch Store": "/rolex.jpg",
  "Restaurant Management": "/resto.jpg",
};

const Projects: React.FC<{ language: string; isAdmin: boolean }> = ({ language, isAdmin }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleDelete = async (id: number) => {
    if (!window.confirm(language === "en" ? "Are you sure you want to delete this project?" : "Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
      setError(language === "en" ? "Failed to delete project. Please try again." : "Échec de la suppression du projet. Veuillez réessayer.");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-project/${id}`);
  };

  const handleAddProject = () => {
    navigate("/add-project");
  };

  return (
    <div className="page">
      <h1 className="projects-title">{language === "en" ? "Projects" : "Projets"}</h1>

      {/* 🔹 Hide "Add Project" for non-admin users */}
      {isAdmin && (
        <button className="add-project-btn" onClick={handleAddProject}>
          {language === "en" ? "Add Project" : "Ajouter un projet"}
        </button>
      )}

      <p className="projects-description">
        {language === "en" ? "Here are some of the projects I've worked on:" : "Voici quelques projets sur lesquels j'ai travaillé :"}
      </p>

      {loading && <p>{language === "en" ? "Loading projects..." : "Chargement des projets..."}</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && projects.length === 0 && <p>{language === "en" ? "No projects available yet." : "Aucun projet disponible pour le moment."}</p>}

      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {/* ✅ Check for uploaded image first, then use mapped images */}
            <img
              src={project.imageUploaded || projectImages[project.projectName] || "/resto.jpg"}
              alt={project.projectName}
              className="project-image"
            />

            <h2>{project.projectName}</h2>
            <p>{project.projectDescription}</p>

            <div className="project-buttons">
              {/* 🔹 Hide "Edit" and "Delete" for non-admin users */}
              {isAdmin && (
                <>
                  <button className="edit-project-btn" onClick={() => handleEdit(project.id)}>
                    {language === "en" ? "Edit" : "Modifier"}
                  </button>
                  <button className="delete-project-btn" onClick={() => handleDelete(project.id)}>
                    {language === "en" ? "Delete" : "Supprimer"}
                  </button>
                </>
              )}

              {/* ✅ View Project Button (only if GitHub URL exists) */}
              {project.projectGithub && (
                <a href={project.projectGithub} target="_blank" rel="noopener noreferrer" className="view-project-btn">
                  {language === "en" ? "View Project" : "Voir le projet"}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
