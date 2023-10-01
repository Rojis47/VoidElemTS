import VoidElement from "../components/VoidElement/VoidElement";
import { useFavorites } from "../contexts/FavoritesProvider";

export default function AllProjectListContainer() {
  const { favoritedProjects } = useFavorites();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {favoritedProjects.map((project, index) => (
        <div className="w-full" key={index}>
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
