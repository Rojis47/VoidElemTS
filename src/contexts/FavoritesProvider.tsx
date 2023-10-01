import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Requests } from "../utils/api";
import { Project } from "../Types";

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
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoritedProjects, setFavoritedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = 2;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await Requests.fetchFavorites();
        setFavorites(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await Requests.fetchFavoriteProjectsByUserId(userId);
        setFavoritedProjects(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [userId]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        error,
        favoritedProjects,
        userId,
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
