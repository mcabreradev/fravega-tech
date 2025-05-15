import { GetServerSideProps } from "next"
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { UserDetailProps } from "@/types"
import { fetchUserDetails } from "@/lib/github"
import { Providers } from "@/components/providers"
import { UserDetailContent } from "@/components/user-detail-content"

export default function UserDetail({ username, userData }: UserDetailProps) {
  console.log("UserDetail component rendered with username:", username);
  console.log("User data:", userData);
  return (
    <Providers>
      <UserDetailContent username={username} userData={userData} />
    </Providers>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username as string
  const queryClient = new QueryClient();

try {
  // First fetch the data
  const userDetails = await fetchUserDetails(username)

  console.log("Fetched user data:", userDetails)

  // Manually set the data in the cache
  queryClient.setQueryData(['userDetails', username], userDetails)

  // Then prefetch to ensure the query is properly cached
  await queryClient.prefetchQuery({
    queryKey: ['userDetails', username],
    queryFn: () => fetchUserDetails(username),
    staleTime: 1 * 60 * 1000, // 1 minutes
  })

  // Get the dehydrated state after everything is cached
  const userData = dehydrate(queryClient)

  return {
    props: {
      userData,
      username,
    },
  };
} catch (error) {
    console.error('Error fetching user data:', error)
    return { notFound: true }
  } finally {
    // Clean up
    queryClient.clear()
  }
}
