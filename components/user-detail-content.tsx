"use client"

import { useState } from "react"
import Head from "next/head"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { ChevronLeft, MapPin, Link as LinkIcon, Twitter, Users, Building, Calendar, Star } from "lucide-react"

import { GithubUser } from "@/types"
import { formatDate, cn } from "@/lib/utils"


import { PageLayout } from "@/components/layout/page-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { RepoCard } from "@/components/repo-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Pagination } from "@/components/pagination"

import { useFavoritesStore } from "@/lib/favorites-store"
import { fetchUserDetails, fetchUserRepos } from "@/lib/github"
import { UserDetailContentProps, GithubRepo } from "@/types"

export function UserDetailContent({ username }: UserDetailContentProps) {
  const [page, setPage] = useState(1)
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const isUserFavorite = isFavorite(username)

  const userQuery = useQuery({
    queryKey: ['userDetails', username],
    queryFn: () => fetchUserDetails(username),
    staleTime: 5000,
  })

  const userRepos = useQuery({
  queryKey: ["userRepos", username, page],
  queryFn: () => fetchUserRepos(username, page),
  placeholderData: [], // Use placeholder data while fetching new data
  staleTime: 5000,
})

  const userData = userQuery.data as GithubUser
  const userLoading = userQuery.isLoading || userQuery.isFetching
  const userError = userQuery.isError && userQuery.error instanceof Error

  const repos = userRepos.data as GithubRepo[]
  const reposLoading = userRepos.isLoading || userRepos.isFetching
  const reposError = userRepos.isError && userRepos.error instanceof Error

  const handlePageChange = (newPage: number) => {
    console.log('Page changing to:', newPage)
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (userLoading || reposLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      </PageLayout>
    )
  }

  if (userError || reposError) {
    return (
      <PageLayout>
        Failed to load user data. Please try again later
      </PageLayout>
    )
  }

  const hasMore = repos?.length === 10

  return (
    <>
      <Head>
        <title>{userData.name || userData.login} | GitHub User Explorer</title>
        <meta name="description" content={`View ${userData.login}'s GitHub profile`} />
      </Head>
      <PageLayout>
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/" passHref>
              <Button variant="outline" size="sm">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Users
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar with user info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Avatar className="h-32 w-32 mt-4 border-4 border-background">
                      <AvatarImage src={userData.avatar_url} alt={userData.login} />
                      <AvatarFallback>{userData.login.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold">{userData.name || userData.login}</h2>
                      <p className="text-muted-foreground">@{userData.login}</p>
                    </div>

                    <Button
                       variant={isUserFavorite ? "default" : "outline"}
                      size="sm"
                      className={cn(isUserFavorite ? "dark:bg-amber-500 dark:hover:bg-amber-600 bg-stone-900 hover:bg-stone-950" : "")}
                      onClick={() => toggleFavorite(username)}
                    >
                      <Star className={`mr-1 h-4 w-4 ${isUserFavorite ? "fill-white" : ""}`} />
                      {isUserFavorite ? "Favorited" : "Favorite"}
                    </Button>

                    {userData.bio && (
                      <p className="text-sm text-muted-foreground">
                        {userData.bio.length > 100 ? `${userData.bio.substring(0, 100)}...` : userData.bio}
                      </p>
                    )}

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {userData.public_repos} public repositories
                      </span>
                      {userData.public_gists > 0 && (
                        <span className="text-sm text-muted-foreground">
                          · {userData.public_gists} gists
                        </span>
                      )}

                      {userData.hireable && (
                        <span className="text-sm text-green-500">
                          · Available for hire
                        </span>
                      )}
                    </div>

                    <Separator className="w-full" />

                    {/* Followers and following */}

                    <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {userData.followers} followers
                      </span>
                      <span>·</span>
                      <span>{userData.following} following</span>
                    </div>

                    <Separator />

                    <div className="space-y-2 w-full text-left">
                      {userData.company && (
                        <div className="flex items-center text-sm">
                          <Building className="mr-2 h-4 w-4" />
                          <span>{userData.company}</span>
                        </div>
                      )}

                      {userData.location && (
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{userData.location}</span>
                        </div>
                      )}

                      {userData.blog && (
                        <div className="flex items-center text-sm">
                          <LinkIcon className="mr-2 h-4 w-4" />
                          <a
                            href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline truncate"
                          >
                            {userData.blog}
                          </a>
                        </div>
                      )}

                      {userData.twitter_username && (
                        <div className="flex items-center text-sm">
                          <Twitter className="mr-2 h-4 w-4" />
                          <a
                            href={`https://twitter.com/${userData.twitter_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            @{userData.twitter_username}
                          </a>
                        </div>
                      )}

                      {userData.created_at && (
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Joined {formatDate(userData.created_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content with repositories */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold">Repositories</h2>

              {reposLoading ? (
                <LoadingSpinner className="py-8" />
              ) : repos.length > 0 ? (
                <div className="space-y-4">
                  {repos.map((repo: GithubRepo) => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    This user doesn&#39;t have any public repositories yet.
                  </CardContent>
                </Card>
              )}

              <Pagination
                currentPage={page}
                hasMore={hasMore}
                isLoading={reposLoading}
                onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  )
}
