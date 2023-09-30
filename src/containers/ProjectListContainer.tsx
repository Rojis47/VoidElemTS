import { useProjects } from "../contexts/ProjectsProvider";
import VoidElement from "../components/VoidElement/VoidElement";

export default function ProjectListContainer() {
  const { projects } = useProjects();
  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <VoidElement
            initialHtml={project.html}
            initialCss={project.css}
            initialJs={project.js}
          />
        </div>
      ))}
    </div>
  );
}
