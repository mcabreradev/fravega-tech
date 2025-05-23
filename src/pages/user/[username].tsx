import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
interface UserDetailProps {
  username: string
  userData: any // This will be handled by React Query's dehydrated state
}
import { githubService } from '@/services'
import { Providers } from '@/components/shared/providers'
import { UserDetailContent } from '@/components/features/users/user-detail-content'

export default function UserDetail({ username, userData }: UserDetailProps) {
  return (
    <Providers>
      <UserDetailContent username={username} userData={userData} />
    </Providers>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username as string
  const queryClient = new QueryClient()

  try {
    // First fetch the data
    const userDetails = await githubService.getUserDetails(username)

    // Manually set the data in the cache
    queryClient.setQueryData(['userDetails', username], userDetails)

    // Then prefetch to ensure the query is properly cached
    await queryClient.prefetchQuery({
      queryKey: ['userDetails', username],
      queryFn: () => githubService.getUserDetails(username),
      staleTime: 1 * 60 * 1000, // 1 minutes
    })

    // Get the dehydrated state after everything is cached
    const userData = dehydrate(queryClient)

    return {
      props: {
        userData,
        username,
      },
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return { notFound: true }
  } finally {
    // Clean up
    queryClient.clear()
  }
}
