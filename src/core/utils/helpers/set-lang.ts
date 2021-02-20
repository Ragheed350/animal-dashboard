import { NextApiRequest, NextApiResponse } from 'next';
import Cookie from 'cookies';

import { KEY_LANG_COOKIE } from '../../constants';

export const setLang = (
  req: NextApiRequest,
  res: NextApiResponse,
  locale: string
) => new Cookie(req, res).set(KEY_LANG_COOKIE, locale, { httpOnly: false });
