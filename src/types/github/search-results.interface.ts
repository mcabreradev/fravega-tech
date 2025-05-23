import { GithubUser } from './user.interface'

export interface GithubSearchResults {
  total_count: number
  incomplete_results: boolean
  items: GithubUser[]
}
