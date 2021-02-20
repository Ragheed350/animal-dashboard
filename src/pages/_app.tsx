import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ConfigProvider, notification } from 'antd';
import arEG from 'antd/lib/locale/ar_EG';
import enUS from 'antd/lib/locale/en_US';
import { Provider } from 'react-redux'
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { appServices, eventManager, EVENT_UNAUTHORIZED } from '@core';
import store from '../core/data-management/redux/store'
import { CamelLayout } from '@view';

import '../view/style/antd.less';
import '../view/style/global.less';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const { lang } = useTranslation();
    const { replace } = useRouter();


    useEffect(() => {
        appServices.changeLang({ lang: lang === 'en' ? 'en' : 'ar' }).then(() => {
            // replace(route, route, { locale: lang })
        });

        eventManager.on(EVENT_UNAUTHORIZED, () => {
            appServices.logout();
            replace('/login');
        });
    }, []);

    notification.config({
        rtl: lang === 'ar',
        placement: lang === 'en' ? 'topRight' : 'topLeft'
    })

    return (
        <ConfigProvider
            direction={lang === 'en' ? 'ltr' : 'rtl'}
            locale={lang === 'en' ? enUS : arEG}
        >
            <Provider store={store}>
                <CamelLayout>
                    <Component {...pageProps} />
                </CamelLayout>
            </Provider>
        </ConfigProvider>
    );
}

export default MyApp;