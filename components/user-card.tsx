"use client"

import Link from "next/link"
import { Star, Users, GitBranch } from "lucide-react"
import { GithubUser } from "@/lib/github-api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useFavoritesStore } from "@/lib/favorites-store"

interface UserCardProps {
  user: GithubUser
}

export function UserCard({ user }: UserCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const isUserFavorite = isFavorite(user.login)

  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="p-4 flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16 border">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{user.login.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Link href={`/user/${user.login}`} className="text-xl font-semibold hover:underline">
            {user.name || user.login}
          </Link>
          <span className="text-sm text-muted-foreground">@{user.login}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {user.bio && <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          {user.public_repos !== undefined && (
            <div className="flex items-center">
              <GitBranch className="mr-1 h-4 w-4" />
              <span>{user.public_repos} repos</span>
            </div>
          )}
          {user.followers !== undefined && (
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span>{user.followers} followers</span>
            </div>
          )}
        </div>
        <Button
          variant={isUserFavorite ? "default" : "outline"}
          size="sm"
          className={isUserFavorite ? "bg-amber-500 hover:bg-amber-600" : ""}
          onClick={() => toggleFavorite(user.login)}
        >
          <Star className={`mr-1 h-4 w-4 ${isUserFavorite ? "fill-white" : ""}`} />
          {isUserFavorite ? "Favorited" : "Favorite"}
        </Button>
      </CardFooter>
    </Card>
  )
}