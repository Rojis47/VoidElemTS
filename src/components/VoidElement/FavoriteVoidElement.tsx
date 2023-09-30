import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavorites } from "../../contexts/FavoritesProvider";
import { set } from "zod";

const userId = 1;

export type FavoriteProps = {
  disabled?: boolean;
  onClick: () => void;
  isFavorite: boolean;
  projectId: number;
};

const FavoriteVoidElement = ({
  disabled = false,
  onClick,
  isFavorite,
  projectId,
}: FavoriteProps) => {
  const { favoriteProject } = useFavorites();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      return;
    } else {
      favoriteProject(userId, projectId);
    }
    onClick();
  };

  return (
    <button type="button" title="Favorite" onClick={handleFavoriteToggle}>
      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
    </button>
  );
};

export default FavoriteVoidElement;
