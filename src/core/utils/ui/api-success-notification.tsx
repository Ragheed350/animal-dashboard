import { KEY_LANG_COOKIE, DEFAULT_LANG, SITE_LANGUAGE } from '@core';
import { notification } from 'antd'
import { getDocumentCookie } from 'src/core/utils'

export const ApiSuccessNotification = async ({ des, mes }: { mes: [string] | [string, string], des?: [string] | [string, string] }, language?: 'ar' | 'en') => {

    const lang: SITE_LANGUAGE = language ?? getDocumentCookie(KEY_LANG_COOKIE) as SITE_LANGUAGE ?? DEFAULT_LANG;
    let message;
    let description;
    if (mes.length === 2 || des?.length === 2) {
        const ind = lang === 'en' ? 0 : 1;
        message = mes[ind];
        description = des?.[ind]
    }
    else {
        message = mes[0];
        description = des?.[0];
    }
    notification.open({
        type: 'success',
        message,
        description,
    })
}