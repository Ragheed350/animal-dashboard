import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponseDone, setUserCookie } from '@core';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.body;
  if (user) {
    setUserCookie(req, res, user);
    return res.status(200).json({});
  } else
    return res.status(400).json({
      data: '',
      message: 'where is the user',
      status: false,
      code: 400,
    } as ApiResponseDone);
};
