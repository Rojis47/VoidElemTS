import { TActiveSelector } from "../Types";
import SideNav from "../components/SideNav";
import AllProjectListContainer from "../containers/AllProjectListContainer";
import { FavoritesProvider } from "../contexts/FavoritesProvider";
import { useProjects } from "../contexts/ProjectsProvider";
import FavoritesListContainer from "../containers/FavoriteListContainer";

export default function App() {
  const { activeSelector } = useProjects();

  const renderComponentBySelector = (selector: TActiveSelector) => {
    switch (selector) {
      case "exploreVoidElements":
        return <AllProjectListContainer />;
      case "favorites":
        return <FavoritesListContainer />;
      default:
        return null;
    }
  };

  return (
    <FavoritesProvider>
      <div className="flex bg-slate-900 text-slate-100">
        <SideNav />
        {renderComponentBySelector(activeSelector)}
      </div>
    </FavoritesProvider>
  );
}
