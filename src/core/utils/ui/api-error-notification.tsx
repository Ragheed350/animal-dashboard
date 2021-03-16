import { KEY_LANG_COOKIE, DEFAULT_LANG } from '@core';
import { notification, Typography } from 'antd'
import getT from 'next-translate/getT'
import { ApiError, getDocumentCookie, isResponseError } from 'src/core/utils'

export const ApiErrorNotification = async (error: ApiError, language?: 'ar' | 'en') => {

  const lang = language ?? getDocumentCookie(KEY_LANG_COOKIE) ?? DEFAULT_LANG;

  const t = await getT(lang, 'errors')

  console.error(error)

  let message: React.ReactNode = <Typography.Text style={{ fontSize: '2rem' }}>{t(`api-errors.${error.errorType.toString()}`)}</Typography.Text>;

  let description: React.ReactNode;

  if (isResponseError(error))
    description = JSON.stringify(error.message)

  notification.open({
    type: 'error',
    message: message,
    description: description,
  })
}