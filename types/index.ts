export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  company: string | null;
  location: string | null;
  blog: string | null;
  email: string | null;
  twitter_username: string | null;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface GithubSearchResults {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

export interface FavoritesState {
  favorites: string[];
  addFavorite: (username: string) => void;
  removeFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
  toggleFavorite: (username: string) => void;
}
