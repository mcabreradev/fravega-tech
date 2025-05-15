import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/lib/api';
import { GithubRepo } from '@/types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username } = req.query;
  const { page = '1', per_page = '10', sort = 'updated' } = req.query;

  if (!username || Array.isArray(username)) {
    return res.status(400).json({ message: 'Invalid username' });
  }

  try {
    const response = await api.get<GithubRepo[]>(
      `/users/${username}/repos?page=${page}&per_page=${per_page}&sort=${sort}`
    );

    // Set cache headers
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching user repos:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Error fetching user repositories'
    });
  }
}
