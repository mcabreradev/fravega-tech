import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "Content-Type": "application/json",
    Accept: 'application/vnd.github.v3+json',
  },
});

// Types
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

// API functions
export const fetchUsers = async (page = 1, perPage = 20): Promise<GithubUser[]> => {
  const response = await api.get<GithubUser[]>(`/users?per_page=${perPage}&since=${(page - 1) * perPage}`);
  return response.data;
};

export const searchUsers = async (query: string, page = 1, perPage = 20): Promise<GithubSearchResults> => {
  const response = await api.get<GithubSearchResults>(`/search/users?q=${query}&page=${page}&per_page=${perPage}`);
  return response.data;
};

export const fetchUserDetails = async (username: string): Promise<GithubUser> => {
  const response = await api.get<GithubUser>(`/users/${username}`);
  return response.data;
};

export const fetchUserRepos = async (username: string, page = 1, perPage = 10): Promise<GithubRepo[]> => {
  const response = await api.get<GithubRepo[]>(`/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`);
  return response.data;
};
