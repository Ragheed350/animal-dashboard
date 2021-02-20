import { NextApiRequest, NextApiResponse } from 'next';
import Cookie from 'cookies';

import { KEY_TOKEN_COOKIE } from '../../constants';

export const deleteAuth = (req: NextApiRequest, res: NextApiResponse): void => {
  new Cookie(req, res).set(KEY_TOKEN_COOKIE);
};
