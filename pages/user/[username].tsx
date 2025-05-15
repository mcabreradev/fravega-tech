import { GetServerSideProps } from "next"
import { UserDetailProps } from "@/types"
import { fetchUserDetails } from "@/lib/github"
import { Providers } from "@/components/providers"
import { UserDetailContent } from "@/components/user-detail-content"

export default function UserDetail({ username, userData }: UserDetailProps) {
  return (
    <Providers>
      <UserDetailContent username={username} userData={userData} />
    </Providers>
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
