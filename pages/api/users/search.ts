import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@/lib/api'
import { GithubSearchResults } from '@/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { q, page = '1', per_page = '20' } = req.query

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' })
    }

    const response = await api.get<GithubSearchResults>(
      `/search/users?q=${encodeURIComponent(q as string)}&page=${page}&per_page=${per_page}`
    )

    // Set cache headers
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    res.status(200).json(response.data)
  } catch (error: any) {
    console.error('Error searching users:', error.response?.data || error.message)
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Error searching users',
    })
  }
}
