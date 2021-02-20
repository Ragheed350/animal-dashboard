import { KEY_USER_COOKIE } from '../../constants/keys/index';
import { NextApiRequest, NextApiResponse } from 'next';
import Cookie from 'cookies';

export const deleteUser = (req: NextApiRequest, res: NextApiResponse) =>
  new Cookie(req, res).set(KEY_USER_COOKIE);
