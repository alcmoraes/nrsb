import fetch from 'isomorphic-unfetch';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const user = req.query?.u;
  let data = null;
  try {
    const r = await fetch(`https://api.github.com/users/${user}`);
    data = await r.json();
    res.status(200).json(data);
  } catch (ERR) {
    res.status(404).json(data || { error: 'Feed not found.' });
  }
};
