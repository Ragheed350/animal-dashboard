import React from 'react';
import { Authenticated } from '@utils';
import { HomeChart } from 'src/components/Charts';
// import dynamic from 'next/dynamic';

// const NoSsr = () => <React.Fragment>{window && <HomeChart />}</React.Fragment>;

// export default dynamic(() => Promise.resolve(NoSsr), {
//   ssr: false,
// });

const index: React.FC = () => {
  return <HomeChart />;
};
export default index;

export const getServerSideProps = Authenticated;
