import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Requests } from "../utils/api";
import { Project } from "../Types";
import { useProjects } from "./ProjectsProvider";

interface Favorite {
  userId: number;
  projectId: number;
}

interface FavoritesContextType {
  favorites: Favorite[];
  loading: boolean;
  error: string | null;
  favoritedProjects: Project[];
  userId: number;
  addFavorite: (userId: number, projectId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoritedProjects, setFavoritedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { projects } = useProjects();
  const userId = 2;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await Requests.fetchFavorites();
        setFavorites(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    if (projects.length && favorites.length) {
      const fetchedFavoritedProjects = projects.filter((project) =>
        favorites.some(
          (favorite) =>
            favorite.projectId === project.id && favorite.userId === userId
        )
      );
      setFavoritedProjects(fetchedFavoritedProjects);
    } else {
      setFavoritedProjects([]);
    }
  }, [projects, favorites, userId]);

  const addFavorite = async (userId: number, projectId: number) => {
    try {
      const data = await Requests.postFavoriteProject(userId, projectId);
      setFavorites((prevFavorites) => [...prevFavorites, data]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        error,
        favoritedProjects,
        userId,
        addFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
