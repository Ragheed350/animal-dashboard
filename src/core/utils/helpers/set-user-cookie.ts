import { NextApiRequest, NextApiResponse } from 'next';
import { KEY_USER_COOKIE } from '../../constants/keys';
import Cookie from 'cookies';
import { User } from '../../data-management/models';

export const setUserCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => new Cookie(req, res).set(KEY_USER_COOKIE, JSON.stringify(user));
