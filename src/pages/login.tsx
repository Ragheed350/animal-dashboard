import { Button, Card, Form, Input, Row, Typography, Col, notification } from 'antd';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { isAuth, Login_Req, loginAsync, RootState } from '@core';

const Login: FC = () => {
  const dispatch = useDispatch();

  const { replace } = useRouter();
  const { valid, token } = useSelector((state: RootState) => state.App.firebase);

  const {
    login: { status, error },
    authenticated,
  } = useSelector((state: RootState) => state.App);

  useEffect(() => {
    if (status === 'data' && authenticated) replace('/');
    else if (status === 'error' && error && error === 'username&password')
      notification.error({
        message: 'Username Or Password is Wrong',
      });
  }, [status, authenticated, error]);

  const onFinish = (values: Login_Req) => {
    token && dispatch(loginAsync({ ...values, devicetoken: token }));
  };

  return (
    <Row justify='center' style={{ marginTop: 100 }}>
      <Col lg={10} md={12} sm={18} xs={22}>
        <Card
          style={{ boxShadow: '12px 12px 14px 0px #d0d0d0' }}
          title={<Typography.Title>{`Login`}</Typography.Title>}
        >
          <Form onFinish={onFinish} labelAlign='left' layout='vertical'>
            <Form.Item name='email' label='Email' colon rules={[{ required: true }]}>
              <Input size='large' />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input.Password size='large' />
            </Form.Item>
            <Form.Item>
              <Button size='large' type='primary' htmlType='submit' loading={status === 'loading'} disabled={!valid}>
                {'Login'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (isAuth(req, res)) return { redirect: { destination: '/', statusCode: 307 } };
  return { props: { message: 'Ok' } };
};
