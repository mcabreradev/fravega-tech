import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { githubService } from '@/services'
import { useDebounce } from './use-debounce'
import { GithubUser } from '@/types/github'

interface UseGithubUsersParams {
  initialPage?: number
}

interface UseGithubUsersResult {
  users: GithubUser[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  page: number
  setPage: (page: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  hasMore: boolean
  handleSearch: (e: React.FormEvent) => void
  handlePageChange: (newPage: number) => void
}

export const useGithubUsers = ({
  initialPage = 1,
}: UseGithubUsersParams = {}): UseGithubUsersResult => {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(initialPage)
  const debouncedSearch = useDebounce(searchQuery, 500)

  const usersQuery = useQuery({
    queryKey: ['users', page],
    queryFn: () => githubService.getUsers(page),
    enabled: !debouncedSearch,
    staleTime: 1000,
  })

  const searchResults = useQuery({
    queryKey: ['search', debouncedSearch, page],
    queryFn: () => githubService.searchUsers(debouncedSearch, page),
    enabled: !!debouncedSearch,
  })

  const isLoading = usersQuery.isLoading || searchResults.isLoading
  const isError = usersQuery.isError || searchResults.isError
  const error = (usersQuery.error || searchResults.error) as Error | null

  const users = debouncedSearch ? searchResults.data?.items || [] : usersQuery.data || []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handlePageChange = (newPage: number) => {
    if (page !== newPage) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const hasMore = debouncedSearch
    ? (searchResults.data?.total_count ?? 0) > page * 30
    : users.length === 30

  return {
    users,
    isLoading,
    isError,
    error,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    hasMore,
    handleSearch,
    handlePageChange,
  }
}
