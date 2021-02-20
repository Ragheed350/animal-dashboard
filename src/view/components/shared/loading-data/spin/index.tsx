import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Col, Row, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { primaryColor } from '@core';

const Spin = () => {
  const { t } = useTranslation('common');

  return (
    <Row justify='center' align='middle'>
      <Col>
        <Space size='large' direction='vertical' align='center'>
          <Typography.Title level={1}>{t('loading-date')}</Typography.Title>
          <LoadingOutlined
            style={{ fontSize: '150px', color: primaryColor }}
            spin
          />
        </Space>
      </Col>
    </Row>
  );
};

export default Spin;
