import { Authenticated } from '@utils';
import React from 'react';

const index: React.FC<{ name: string }> = () => {
  return <>HOME</>;
};
export default index;

export const getServerSideProps = Authenticated
