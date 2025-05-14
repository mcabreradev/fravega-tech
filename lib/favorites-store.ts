import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from "sonner";

interface FavoritesState {
  favorites: string[];
  addFavorite: (username: string) => void;
  removeFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
  toggleFavorite: (username: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (username) => {
        set((state) => ({ favorites: [...state.favorites, username] }));
        toast.success(`Added ${username} to favorites`);
      },
      removeFavorite: (username) => {
        set((state) => ({ favorites: state.favorites.filter((name) => name !== username) }));
        toast.success(`Removed ${username} from favorites`);
      },
      isFavorite: (username) => get().favorites.includes(username),
      toggleFavorite: (username) => {
        const isFav = get().isFavorite(username);
        if (isFav) {
          get().removeFavorite(username);
        } else {
          get().addFavorite(username);
        }
      },
    }),
    {
      name: 'github-favorites',
    }
  )
);