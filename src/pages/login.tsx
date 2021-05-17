import { Button, Card, Form, Input, Row, Typography, Col, notification } from 'antd';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { isAuth, Login_Req, loginAsync, RootState } from '@core';

import Particles from 'react-particles-js';

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

  const styles: React.CSSProperties = {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    backgroundColor: '#000',
    height: '100vh',
    width: '100%',
  };

  return (
    <>
      <div style={styles}>
        <Particles
          style={{ zIndex: 0, position: 'absolute' }}
          params={{
            interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } },
            particles: {
              move: { speed: 2 },
              color: { value: '#00a4ff' },
              size: { value: 4 },
              number: {
                value: 100,
                density: {
                  enable: false,
                  value_area: 100,
                },
              },
            },
          }}
        />
      </div>
      <Row justify='center' gutter={[0, 24]} style={{ paddingTop: '5%' }}>
        <Col style={{ display: 'flex' }} span={24}>
          <img style={{ margin: 'auto' }} width={300} src='/assets/big-bang/BIGBANG_Logo-2020-01-1.png' />
        </Col>
        <Col lg={8} md={12} sm={18} xs={22}>
          <Card title={<Typography.Title>{`Login`}</Typography.Title>} style={{ position: 'relative', zIndex: 1 }}>
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
    </>
  );
};
export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (isAuth(req, res)) return { redirect: { destination: '/', statusCode: 307 } };
  return { props: { message: 'Ok' } };
};
