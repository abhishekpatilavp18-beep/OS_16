import "./ProjectDetails.css";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
};

type ProjectDetailsProps = {
  project: Project;
  onBack: () => void;
};

function ProjectDetails({
  project,
  onBack,
}: ProjectDetailsProps) {
  return (
    <div className="project-details">
      <button
        type="button"
        className="project-details-back"
        onClick={onBack}
      >
        ← Back to Projects
      </button>

      <div className="project-details-header">
        <span className="project-details-folder">
          📁
        </span>

        <h2>{project.title}</h2>

        <p>{project.description}</p>
      </div>

      <section className="project-details-section">
        <h3>Technologies</h3>

        <div className="project-details-technologies">
          {project.technologies.map(
            (technology) => (
              <span key={technology}>
                {technology}
              </span>
            )
          )}
        </div>
      </section>

      <section className="project-details-section">
        <h3>Links</h3>

        <div className="project-details-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub →
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo →
            </a>
          )}

          {!project.github &&
            !project.live && (
              <span className="no-project-links">
                Links will be added soon.
              </span>
            )}
        </div>
      </section>
    </div>
  );
}

export default ProjectDetails;