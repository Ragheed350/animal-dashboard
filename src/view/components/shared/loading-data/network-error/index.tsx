import React from 'react';
import { Result } from 'antd';
import useTranslation from 'next-translate/useTranslation';

const NetworkError: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <Result
      status='500'
      title={t('error.network-error')}
      subTitle={t('error.network-error-des')}
    />
  );
};
export default NetworkError;
