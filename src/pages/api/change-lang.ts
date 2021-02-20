import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponseDone, setLang } from '@core';

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    const { lang } = req.body;

    if (lang) {
      setLang(req, res, lang);
      res.status(200).json({});
      res.end();
      resolve();
    } else {
      res.status(400).json({
        data: '',
        message: 'This Language Is Not Avilible',
        status: false,
        code: 400,
      } as ApiResponseDone);
      reject();
    }
  });
};
