import { NextApiRequest, NextApiResponse } from 'next';

import { deleteAuth, deleteUser } from '@core';

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, _) => {
    deleteAuth(req, res);
    deleteUser(req, res);
    res.status(200).json({});
    resolve();
  });
};
