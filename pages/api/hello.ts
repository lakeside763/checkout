import { NextApiRequest, NextApiResponse } from 'next';

/**
 *
 * @param {*} req
 * @param {*}res
 */
async function helloHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    res.status(200).json({ name: 'checkout', environment: `${process.env.NEXT_PUBLIC_API_URL}` });
  }
}

export default helloHandler;
