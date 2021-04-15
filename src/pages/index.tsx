import React from 'react';
import { Authenticated } from '@utils';
import { HomeChart } from 'src/components/Charts';
import dynamic from 'next/dynamic';

const NoSsr = () => <React.Fragment>{window && <HomeChart />}</React.Fragment>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});

export const getServerSideProps = Authenticated;
