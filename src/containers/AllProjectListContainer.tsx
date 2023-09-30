import { useProjects } from "../contexts/ProjectsProvider";
import VoidElement from "../components/VoidElement/VoidElement";

export default function AllProjectListContainer() {
  const { projects } = useProjects();

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <VoidElement
            projectId={project.id}
            name={project.name}
            initialHtml={project.html}
            initialCss={project.css}
            initialJs={project.javascript}
          />
        </div>
      ))}
    </div>
  );
}
