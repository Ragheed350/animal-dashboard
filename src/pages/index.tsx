import { GetServerSideProps } from 'next';
import React from 'react';

const index: React.FC<{ name: string }> = () => {
  // const { t } = useTranslation('home')

  return <></>;
};
export default index;

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { name: 'hell' } };
};
