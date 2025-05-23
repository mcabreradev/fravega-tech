'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'

import { fetchUsers, searchUsers } from '@/lib/github'
import { GithubUser } from '@/types/github'
import { UserCard } from './user-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/shared/ui/alert'

import { Input } from '@/components/shared/ui/input'
import { Button } from '@/components/shared/ui/button'

export function UserSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  // Query for initial users list
  const usersQuery = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
    enabled: !searchQuery, // Only fetch if no search query
  })

  // Query for search results
  const searchResults = useQuery({
    queryKey: ['search', searchQuery, page],
    queryFn: () => searchUsers(searchQuery, page),
    enabled: !!searchQuery, // Only search if there's a query
  })

  // Combine query states
  const isLoading = usersQuery.isLoading || searchResults.isLoading
  const isError = usersQuery.isError || searchResults.isError
  const error = usersQuery.error || searchResults.error

  // Get users from either query
  const users: GithubUser[] = searchQuery ? searchResults.data?.items || [] : usersQuery.data || []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search GitHub users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          Search
        </Button>
      </form>

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to fetch users. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <Alert>
            <AlertTitle>No users found</AlertTitle>
            <AlertDescription>
              Try adjusting your search query to find GitHub users.
            </AlertDescription>
          </Alert>
        )
      )}
    </div>
  )
}
