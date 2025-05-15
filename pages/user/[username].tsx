import { GetServerSideProps } from "next"
import { GithubUser } from "@/types"
import { fetchUserDetails } from "@/lib/github"
import { Providers as ClientProviders } from "@/components/providers"
import { UserDetailContent } from "@/components/user-detail-content"

interface UserDetailProps {
  username: string
  userData: GithubUser
}

export default function UserDetail({ username, userData }: UserDetailProps) {
  return (
    <ClientProviders>
      <UserDetailContent username={username} userData={userData} />
    </ClientProviders>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username as string

  if (!username) {
    return {
      notFound: true,
    }
  }

  try {
    const userData = await fetchUserDetails(username)

    return {
      props: {
        username,
        userData,
      },
    }
  } catch (error) {
    console.error("Error fetching user data:", error)
    return {
      notFound: true,
    }
  }
}
