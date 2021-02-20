import { Empty, Skeleton } from 'antd';
import React, { ReactElement } from 'react';

import NetworkError from './network-error';
import Spin from './spin';

interface LoadingDataProps {
  loading: boolean;
  dataValid: () => boolean;
  customError?: ReactElement;
  type?: 'default' | 'skeleton';
  isEmpty?: boolean;
  customEmpty?: ReactElement;
}

export const LoadingData: React.FC<LoadingDataProps> = ({
  loading,
  children,
  dataValid,
  customError = <NetworkError />,
  type = 'default',
  isEmpty = false,
  customEmpty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
}) => {
  const loadingStyle = type === 'default' ? <Spin /> : <Skeleton active />
  return (
    loading ? loadingStyle : (dataValid() ? (isEmpty ? customEmpty : <React.Fragment>{children}</React.Fragment>) : customError)
  )
};
