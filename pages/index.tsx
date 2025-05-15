import { useState } from "react"
import Head from "next/head"
import { AlertCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { fetchUsers, searchUsers } from "@/lib/github"
import { GithubUser} from "@/types"
import { useDebounce } from "@/hooks/use-debounce"

import { UserCard } from "@/components/user-card"
import { UserSkeletonGrid } from "@/components/user-skeleton"

import { PageLayout } from "@/components/layout/page-layout"
import { Pagination } from "@/components/pagination"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(searchQuery, 500) // 500ms delay

  const usersQuery = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    enabled: !debouncedSearch, // Only fetch if no search query
    staleTime: 5000, // Keeps previous data for 5 seconds
  })

  const searchResults = useQuery({
    queryKey: ["search", debouncedSearch, page],
    queryFn: () => searchUsers(debouncedSearch, page),
    enabled: !!debouncedSearch, // Only search if there's a query
    staleTime: 5000, // Keeps previous data for 5 seconds
  })

  const isLoading = usersQuery.isLoading || searchResults.isLoading
  const isError = usersQuery.isError || searchResults.isError
  const error = usersQuery.error || searchResults.error

  const users: GithubUser[] = debouncedSearch
    ? (searchResults.data?.items || [])
    : (usersQuery.data || [])

  // Prevent form submission as we're using debounced search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handlePageChange = (newPage: number) => {
    console.log("Page changed to:", newPage)
    if (page !== newPage) {
      setPage(newPage)
      // Scroll to top after state update
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const hasMore = debouncedSearch
    ? (searchResults.data?.total_count ?? 0) > page * 30
    : users.length === 30

  if (isLoading) {
    return (
      <PageLayout>
        <UserSkeletonGrid />
      </PageLayout>
    )
  }

  if (isError) {
    return (
      <PageLayout>
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : "Failed to fetch users. Please try again."}
            </AlertDescription>
          </Alert>
      </PageLayout>
    )
  }

  return (
    <>
      <Head>
        <title>GitHub User Explorer</title>
        <meta name="description" content="Search and explore GitHub users" />
      </Head>
      <PageLayout>
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-center">GitHub User Explorer</h1>
            <p className="text-muted-foreground text-center max-w-lg mx-auto">
              Search for GitHub users, view their profiles, and mark your favorites.
            </p>
          </div>

          <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
            <div className="relative flex items-center gap-2">
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
            </div>
          </form>

          { users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <Alert>
              <AlertTitle>No users found</AlertTitle>
              <AlertDescription>
                Try adjusting your search query to find GitHub users.
              </AlertDescription>
            </Alert>
          )}
          <Pagination
            currentPage={page}
            hasMore={hasMore}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
        </div>
      </PageLayout>
    </>
  )
}
