import { GetServerSideProps } from 'next';

import { isAuth } from './is-auth';

export const Authenticated: GetServerSideProps<any> = async ({ req, res }) => {
  if (!isAuth(req, res))
    return { redirect: { destination: '/login', statusCode: 307 } };
  return { props: { message: 'Authonticated' } };
};
