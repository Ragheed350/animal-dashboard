import Cookie from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '../../constants';

export const isAuth = (
  req: IncomingMessage | NextApiRequest,
  res: ServerResponse | NextApiResponse
): boolean => {
  const cookies = new Cookie(req, res);
  return cookies.get(KEY_TOKEN_COOKIE)
    ? true
    : false && cookies.get(KEY_USER_COOKIE)
    ? true
    : false;
};
