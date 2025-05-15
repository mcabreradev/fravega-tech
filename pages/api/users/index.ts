import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/lib/api';
import { GithubUser } from '@/types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { page = '1', per_page = '20' } = req.query;
    const response = await api.get<GithubUser[]>(
      `/users?per_page=${per_page}&since=${(Number(page) - 1) * Number(per_page)}`
    );

    // Set cache headers
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching users:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Error fetching users'
    });
  }
}
