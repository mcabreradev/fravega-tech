import { Github } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t py-6">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Next.js
            </a>{' '}
            and{' '}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </a>
            .
          </p>
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <span className="text-sm text-muted-foreground">GitHub Explorer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
