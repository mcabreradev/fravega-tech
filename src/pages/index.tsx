/**
 * Home Page Component
 *
 * This is the main landing page of the GitHub User Explorer application.
 * It uses the Container/Presenter pattern where this component acts as the container,
 * delegating the UI rendering to HomeView and the business logic to useGithubUsers hook.
 */

import Head from 'next/head'

// Features
import { PageLayout } from '@/components/features/layout/page-layout'
import { HomeView } from '@/components/features/users/home-view'

// Hooks
import { useGithubUsers } from '@/hooks/use-github-users'

interface HomeProps {}

export default function Home({}: HomeProps) {
  const {
    users,
    isLoading,
    isError,
    error,
    page,
    searchQuery,
    setSearchQuery,
    hasMore,
    handleSearch,
    handlePageChange,
  } = useGithubUsers()

  return (
    <>
      <Head>
        <title>GitHub User Explorer</title>
        <meta name="description" content="Search and explore GitHub users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <PageLayout>
        <HomeView
          users={users}
          isLoading={isLoading}
          isError={isError}
          error={error}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          page={page}
          hasMore={hasMore}
          onPageChange={handlePageChange}
        />
      </PageLayout>
    </>
  )
}
