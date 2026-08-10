import { useEffect, useState } from "react";

import "./Projects.css";

import ProjectDetails from "./ProjectDetails/ProjectDetails";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
};

type ProjectsResponse = {
  success: boolean;
  projects: Project[];
};

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "http://localhost:5000/api/projects"
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects (${response.status})`
          );
        }

        const data: ProjectsResponse =
          await response.json();

        if (!data.success) {
          throw new Error("Failed to load projects");
        }

        setProjects(data.projects);
      } catch (err) {
        console.error("Failed to load projects:", err);

        setError(
          "Unable to load projects right now."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  if (selectedProject) {
    return (
      <ProjectDetails
        project={selectedProject}
        onBack={() =>
          setSelectedProjectId(null)
        }
      />
    );
  }

  return (
    <div className="projects-app">
      <div className="projects-header">
        <div>
          <h2>My Projects</h2>

          <p>
            A collection of things I've built.
          </p>
        </div>

        <span className="project-count">
          {projects.length}{" "}
          {projects.length === 1
            ? "project"
            : "projects"}
        </span>
      </div>

      {loading ? (
        <div className="no-projects">
          <p>Loading projects...</p>
        </div>
      ) : error ? (
        <div className="no-projects">
          <p>{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="no-projects">
          <p>No projects added yet.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-card"
            >
              <div className="project-card-top">
                <span className="project-folder">
                  📁
                </span>
              </div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-technologies">
                {project.technologies.map(
                  (technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  )
                )}
              </div>

              <div className="project-links">
                <button
                  type="button"
                  className="project-view-button"
                  onClick={() =>
                    setSelectedProjectId(
                      project.id
                    )
                  }
                >
                  View Project →
                </button>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;