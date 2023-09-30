import { useProjects } from "../contexts/ProjectsProvider";
import VoidElement from "../components/VoidElement/VoidElement";

export default function ProjectListContainer() {
  const { projects } = useProjects();
  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <VoidElement
            name={project.name}
            initialHtml={project.html}
            initialCss={project.css}
            initialJs={project.js}
          />
        </div>
      ))}
    </div>
  );
}
