import { GetServerSideProps } from "next"
import { GithubUser, fetchUserDetails } from "@/lib/github-api"
import { UserDetailContent } from "@/features/user/user-detail-content"

interface UserDetailProps {
  username: string
  userData: GithubUser
}

export default function UserDetail({ username, userData }: UserDetailProps) {
  return (
    <UserDetailContent username={username} userData={userData} />
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
