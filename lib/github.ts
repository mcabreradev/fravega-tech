import axios from 'axios'

import { GithubUser, GithubRepo, GithubSearchResults } from '@/types'

const BASE_URL = process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_BASE_URL}` : ''

export const fetchUsers = async (page = 1, perPage = 20): Promise<GithubUser[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users?page=${page}&per_page=${perPage}`)
    return response.data
  } catch (error) {
    console.error('GitHub API Error:', {
      status: (error as any).response?.status,
      message: (error as any).message,
    })
    throw error
  }
}

export const searchUsers = async (
  query: string,
  page = 1,
  perPage = 20
): Promise<GithubSearchResults> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/users/search?q=${query}&page=${page}&per_page=${perPage}`
    )
    return response.data
  } catch (error) {
    console.error('GitHub API Error:', {
      status: (error as any).response?.status,
      message: (error as any).message,
    })
    throw error
  }
}

export const fetchUserDetails = async (username: string): Promise<GithubUser> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/${username}`)
    return response.data
  } catch (error) {
    console.error('GitHub API Error:', {
      status: (error as any).response?.status,
      message: (error as any).message,
      username,
    })
    throw error
  }
}

export const fetchUserRepos = async (
  username: string,
  page = 1,
  perPage = 10
): Promise<GithubRepo[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/users/${username}/repos?page=${page}&per_page=${perPage}`
    )
    console.log(`${BASE_URL}/api/users/${username}/repos?page=${page}&per_page=${perPage}`)
    return response.data
  } catch (error) {
    console.error('GitHub API Error:', {
      status: (error as any).response?.status,
      message: (error as any).message,
      username,
    })
    throw error
  }
}
