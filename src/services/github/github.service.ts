import axios from 'axios'
import { GithubUser, GithubRepo, GithubSearchResults } from '@/types/github'

export class GitHubService {
  async getUsers(page = 1, perPage = 20): Promise<GithubUser[]> {
    try {
      const response = await axios.get(`/api/users?page=${page}&per_page=${perPage}`)
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async searchUsers(query: string, page = 1, perPage = 20): Promise<GithubSearchResults> {
    try {
      const response = await axios.get(
        `/api/users/search?q=${query}&page=${page}&per_page=${perPage}`
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async getUserDetails(username: string): Promise<GithubUser> {
    try {
      const response = await axios.get(`/api/users/${username}`)
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async getUserRepos(username: string, page = 1, perPage = 10): Promise<GithubRepo[]> {
    try {
      const response = await axios.get(
        `/api/users/${username}/repos?page=${page}&per_page=${perPage}`
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  private handleError(error: any) {
    console.error('GitHub API Error:', {
      status: error.response?.status,
      message: error.message,
    })
  }
}

export const githubService = new GitHubService()
