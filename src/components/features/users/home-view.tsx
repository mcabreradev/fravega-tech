import { AlertCircle } from 'lucide-react'
import { GithubUser } from '@/types/github'
import { Alert, AlertDescription, AlertTitle } from '@/components/shared/ui/alert'
import { Button } from '@/components/shared/ui/button'
import { Input } from '@/components/shared/ui/input'
import { UserCard } from '@/components/features/users/user-card'
import { UserSkeletonGrid } from '@/components/features/users/user-skeleton'
import { Pagination } from '@/components/shared/pagination'

interface HomeViewProps {
  users: GithubUser[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  searchQuery: string
  onSearchChange: (value: string) => void
  onSearch: (e: React.FormEvent) => void
  page: number
  hasMore: boolean
  onPageChange: (page: number) => void
}

export function HomeView({
  users,
  isLoading,
  isError,
  error,
  searchQuery,
  onSearchChange,
  onSearch,
  page,
  hasMore,
  onPageChange,
}: HomeViewProps) {
  if (isLoading) {
    return <UserSkeletonGrid />
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error?.message || 'Failed to fetch users. Please try again.'}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-center">GitHub User Explorer</h1>
        <p className="text-muted-foreground text-center max-w-lg mx-auto">
          Search for GitHub users, view their profiles, and mark your favorites.
        </p>
      </div>

      <form onSubmit={onSearch} className="w-full max-w-xl mx-auto">
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search GitHub users..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            Search
          </Button>
        </div>
      </form>

      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <Alert>
          <AlertTitle>No users found</AlertTitle>
          <AlertDescription>Try adjusting your search query to find GitHub users.</AlertDescription>
        </Alert>
      )}

      <Pagination
        currentPage={page}
        hasMore={hasMore}
        isLoading={isLoading}
        onPageChange={onPageChange}
      />
    </div>
  )
}
