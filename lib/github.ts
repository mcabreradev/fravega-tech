import axios from 'axios';

import { GithubUser, GithubRepo, GithubSearchResults } from '@/types';

export const fetchUsers = async (page = 1, perPage = 20): Promise<GithubUser[]> => {
  const response = await axios.get(`/api/users?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const searchUsers = async (query: string, page = 1, perPage = 20): Promise<GithubSearchResults> => {
  const response = await axios.get(`/api/users/search?q=${query}&page=${page}&per_page=${perPage}`);
  return response.data;
};

export const fetchUserDetails = async (username: string): Promise<GithubUser> => {
  const response = await axios.get(`/api/users/${username}`);
  return response.data;
};

export const fetchUserRepos = async (username: string, page = 1, perPage = 10): Promise<GithubRepo[]> => {
  const response = await axios.get(`/api/users/${username}/repos?page=${page}&per_page=${perPage}`);
  return response.data;
};
