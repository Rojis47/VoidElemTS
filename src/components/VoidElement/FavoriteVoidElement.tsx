import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavorites } from "../../contexts/FavoritesProvider";

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
  const { addFavorite, userId } = useFavorites();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      return;
    } else {
      addFavorite(userId, projectId);
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
