import React, { useEffect, useState } from 'react';
import { Layout, notification } from 'antd';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import DTICSider from './sider';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { getToken, onMessageListener } from '../../../../firebase';
import { appServices, setUser, isError, setFirebaseToken, setFirebaseValid } from '@core';

const { Content, Sider } = Layout;

const CamelLayout: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { lang } = useTranslation();
  const en = lang === 'en';

  const { pathname } = useRouter();
  const [marginContent, setMarginContent] = useState(80);

  const AR_layout: React.CSSProperties = { marginRight: marginContent, transition: 'all .2s' };
  const EN_layout: React.CSSProperties = { marginLeft: marginContent, transition: 'all .2s' };

  const collapsed = marginContent === 80;

  useEffect(() => {
    if (pathname === '/login') {
      setMarginContent(0);
    }
  }, [pathname]);

  useEffect(() => {
    appServices.getUser().then((result) => {
      if (!isError(result)) {
        dispatch(setUser(result.data));
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setFirebaseValid(false));
    getToken((token) => {
      dispatch(setFirebaseToken(token));
      dispatch(setFirebaseValid(true));
    });
    onMessageListener()
      .then((payload) => {
        notification.success({
          message: payload.notification.title,
          description: payload.notification.body,
        });
      })
      .catch((err) => console.log('failed: ', err));
  }, []);

  return (
    <Layout className='site-layout' style={{ minHeight: '100vh' }} hasSider>
      <Head>
        <title>ANIMALS - Dashboard</title>
      </Head>
      {!pathname.includes('login') && (
        <Sider
          reverseArrow={lang === 'ar'}
          style={{
            height: '100%',
            overflow: 'auto',
            position: 'fixed',
            left: lang === 'en' ? 0 : undefined,
            right: lang === 'en' ? undefined : 0,
          }}
          onCollapse={(isCol: boolean) => setMarginContent(() => (isCol ? 80 : 200))}
          theme='dark'
          defaultCollapsed
          collapsible
        >
          <DTICSider />
          <div style={{ padding: collapsed ? 10 : 5, position: 'fixed', bottom: collapsed ? 25 : 50 }}>
            <Link href='https://its.ae'>
              <a target='__black'>
                {collapsed ? (
                  <Image src='/assets/big-bang/BB-ICON.png' alt='LOGO' layout='intrinsic' height={60} width={60} />
                ) : (
                  <Image src='/assets/big-bang/A-PBB-LOGO.svg' alt='LOGO' layout='intrinsic' height={50} width={190} />
                )}
              </a>
            </Link>
          </div>
        </Sider>
      )}

      <Content style={en ? EN_layout : AR_layout}>
        <div>{children}</div>
      </Content>
    </Layout>
  );
};
export default CamelLayout;
