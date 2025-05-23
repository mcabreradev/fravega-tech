'use client'

import { formatDistanceToNow } from 'date-fns'
import { Star, GitBranch, Code, Eye } from 'lucide-react'
import { GithubRepo } from '@/types/github'

interface RepoCardProps {
  repo: GithubRepo
}
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shared/ui/card'
import { Badge } from '@/components/shared/ui/badge'

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="flex items-start justify-between">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold hover:underline"
          >
            {repo.name}
          </a>
          {repo.language && (
            <Badge variant="outline" className="ml-2 text-xs">
              <Code className="mr-1 h-3 w-3" />
              {repo.language}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {repo.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{repo.description}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0 text-sm text-muted-foreground">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-4 w-4" />
            <span>{repo.watchers_count}</span>
          </div>
          <div className="flex items-center">
            <GitBranch className="mr-1 h-4 w-4" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <div className="text-xs">
          Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
        </div>
      </CardFooter>
    </Card>
  )
}
