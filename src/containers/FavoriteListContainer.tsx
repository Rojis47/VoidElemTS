import { useProjects } from "../contexts/ProjectsProvider";
import VoidElement from "../components/VoidElement/VoidElement";
import { useFavorites } from "../contexts/FavoritesProvider";

export default function AllProjectListContainer() {
  const { favoritedProjects } = useFavorites();
  return (
    <div>
      {favoritedProjects.map((project) => (
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
