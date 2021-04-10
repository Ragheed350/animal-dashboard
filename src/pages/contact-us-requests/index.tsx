import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchContactUsRequestsAsync,
  DeleteContactUsRequestAsync,
} from '@core';

const ManageContactUs: FC = () => {
  const { lang, t } = useTranslation('common');
  const dispatch = useDispatch();

  const { status, contactUsRequests } = useSelector((state: RootState) => state.ContactUsRequests);

  useEffect(() => {
    dispatch(FetchContactUsRequestsAsync());
  }, [dispatch]);

  const columnsContactUs: ItemType[] = [
    {
      columnType: {
        title: t`id`,
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
      },
      type: 'primary-key',
    },
    {
      columnType: {
        title: t`name`,
        dataIndex: 'name',
        width: 130,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`email`,
        dataIndex: 'email',
        width: 150,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`massage`,
        dataIndex: 'message',
        width: 'auto',
      },
      type: 'text-area',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={contactUsRequests}
      loading={status === 'loading'}
      DeleteAsync={(el) => DeleteContactUsRequestAsync(el.id)}
      itemsHeader={[...columnsContactUs]}
    />
  );
};
export default ManageContactUs;

export const getServerSideProps = Authenticated;
