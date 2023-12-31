import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchUsersAsync,
  DeleteUserAsync,
  FetchCountriesAsync,
  Gender,
} from '@core';

const ManageUsers: FC = () => {
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, users } = useSelector((state: RootState) => state.Users);
  const { countries } = useSelector((state: RootState) => state.Country);

  useEffect(() => {
    dispatch(FetchUsersAsync());
    dispatch(FetchCountriesAsync());
  }, [dispatch]);

  const columnsUsers: ItemType[] = [
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
        width: 200,
      },
      type: 'text',
      trans: true,
    },
    {
      columnType: {
        title: t`email`,
        dataIndex: 'email',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`phone`,
        dataIndex: 'phone',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`gender`,
        dataIndex: 'gender',
        width: 200,
        render: (val: Gender) => (!en ? (val === Gender.male ? 'ذكر' : 'انثى') : val === Gender.male ? 'male' : 'female'),
      },
      type: 'select',
      foreignKeyArr: [
        { title: 'ذكر', value: '0' },
        { title: 'أنثى', value: '1' },
      ],
    },
    {
      columnType: {
        title: t`marital_status`,
        dataIndex: 'marital',
        width: 200,
      },
      type: 'check-box',
    },
    {
      columnType: {
        title: t`suspended`,
        dataIndex: 'is_suspended',
        width: 200,
      },
      type: 'check-box',
    },
    {
      columnType: {
        title: t`nationallity`,
        dataIndex: 'nationallity',
        width: 200,
      },
      type: 'text',
      trans: true,
    },
    {
      columnType: {
        title: t`address`,
        dataIndex: 'address',
        width: 200,
      },
      type: 'text-area',
      trans: true,
    },
    {
      columnType: {
        title: t`image`,
        dataIndex: 'image',
        width: 300,
      },
      type: 'image',
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`country`,
        dataIndex: 'country_id',
        width: 200,
        render: (val: string) =>
          en
            ? countries.find((el) => el.id === Number(val))?.['name:en']
            : countries.find((el) => el.id === Number(val))?.['name:ar'],
      },
      type: 'foreign-key',
      foreignKeyArr: countries.map((el) => ({ title: en ? el['name:en'] : el['name:en'], value: el.id })),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={[...users.map((el) => ({ ...el, is_suspended: Number(el.is_suspended) }))]}
      loading={status === 'loading'}
      // AddAsync={(el) => InsertUserAsync({ user: el.item })}
      // UpdateAsync={(el) => UpdateUserAsync({ id: el.id, user: el.item })}
      DeleteAsync={(el) => DeleteUserAsync({ id: el.id })}
      itemsHeader={[...columnsUsers, ...tmp]}
      // Mapper={mapper}
    />
  );
};
export default ManageUsers;

export const getServerSideProps: GetServerSideProps = Authenticated;
