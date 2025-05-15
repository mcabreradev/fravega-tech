import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "Content-Type": "application/json",
    Accept: 'application/vnd.github.v3+json',
  },
});
