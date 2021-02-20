import { Button, Card, Form, Input, Row, Typography, Col, notification } from 'antd';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { isAuth, Login_Req, loginAsync, RootState } from '@core';


const Login: FC = () => {
    const dispatch = useDispatch()

    const { replace } = useRouter()

    const { login: { status, error }, authenticated } = useSelector((state: RootState) => state.App)

    useEffect(() => {
        if (status === 'data' && authenticated) replace('/');
        else
            if (status === 'error' && error && error === 'username&password') notification.error({
                message: 'Username Or Password is Wrong',
            })
    }, [status, authenticated, error])

    const onFinish = (values: Login_Req) => {
        dispatch(loginAsync(values));
    }

    return (
        <Row justify='center' style={{ marginTop: 200 }}>
            <Col span={10}>
                <Card title={<Typography.Title >{`Login`}</Typography.Title>}>
                    <Form onFinish={onFinish} labelAlign='left' layout='vertical'>
                        <Form.Item name='email' label='Email' colon rules={[{ required: true }]}>
                            <Input size='large' />
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                            <Input.Password size='large' />
                        </Form.Item>
                        <Form.Item >
                            <Button size="large" type="primary" htmlType="submit" loading={status === 'loading'}>{'Login'}</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}
export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    if (isAuth(req, res))
        return { redirect: { destination: '/', statusCode: 307 } };
    return { props: { message: 'Ok' } };
};
