'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { Button } from '@/components/shared/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <Github className="h-6 w-6" />
              <span className="inline-block font-bold">GitHub Explorer</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            <Link href="/" passHref>
              <Button variant="ghost">Home</Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
