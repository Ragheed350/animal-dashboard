import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  listFeaturesAsync,
  FetchUsersAsync,
  FetchFeaturesAsync,
  addFeatureUserAsync,
  removeFeatureUserAsync,
  unapproveFeatureAsync,
  approveFeatureAsync,
} from '@core';
import { Button, Popconfirm } from 'antd';

const ManageAttributes: FC = () => {
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { featuresApprove, features, status } = useSelector((state: RootState) => state.Feature);
  const { users } = useSelector((state: RootState) => state.Users);

  useEffect(() => {
    dispatch(listFeaturesAsync());
    dispatch(FetchFeaturesAsync());
    dispatch(FetchUsersAsync());
  }, []);

  const tmp: ItemType[] = [
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
        title: t`duration(per day)`,
        dataIndex: 'duration',
      },
      type: 'number',
    },
    {
      columnType: {
        title: t`user`,
        dataIndex: 'user_id',
        width: 'auto',
        render: (val: number | string) =>
          en ? users.find((el) => el.id === Number(val))?.['name:en'] : users.find((el) => el.id === Number(val))?.['name:ar'],
      },
      type: 'foreign-key',
    },
    {
      columnType: {
        title: t`address`,
        dataIndex: 'user_id',
        width: 'auto',
        render: (id: string) =>
          en
            ? users.find((el) => el.id === Number(id))?.['address:en']
            : users.find((el) => el.id === Number(id))?.['address:ar'],
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`email`,
        dataIndex: 'user_id',
        width: 'auto',
        render: (id: string) => users.find((el) => el.id === Number(id))?.email,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`phone`,
        dataIndex: 'user_id',
        width: 'auto',
        render: (id: string) => users.find((el) => el.id === Number(id))?.phone,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`package`,
        dataIndex: 'feature_id',
        width: 'auto',
        render: (val: number | string) => (
          <>
            {en
              ? features.find((el) => el.id === Number(val))?.['text:en']
              : features.find((el) => el.id === Number(val))?.['text:ar']}
          </>
        ),
      },
      type: 'foreign-key',
    },
    {
      columnType: {
        title: t`approved`,
        dataIndex: 'is_approved',
        filters: [
          { text: t`approved`, value: '1' },
          { text: t`not_approved`, value: '0' },
        ],
        onFilter: (value, record) => record.is_approved === value,
        ellipsis: true,
      },
      type: 'check-box',
    },
    {
      columnType: {
        title: t`operations`,
        dataIndex: 'is_approved',
        key: '01',
        width: 200,
        render: (val: '1' | '0', { id, feature_id, user_id }) =>
          Number(val) === 1 ? (
            <Popconfirm onConfirm={() => dispatch(unapproveFeatureAsync({ id }))} title={t`unapprove_ru_package`}>
              <Button type='primary' danger ghost size='large'>
                {t`unapproved`}
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              onConfirm={() => dispatch(approveFeatureAsync({ id, feature_id, user_id }))}
              title={t`approve_ru_package`}
            >
              <Button type='primary' size='large'>
                {t`approve`}
              </Button>
            </Popconfirm>
          ),
      },
      type: 'check-box',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={featuresApprove}
      loading={status === 'loading'}
      AddAsync={(el) => addFeatureUserAsync(el.item)}
      DeleteAsync={(el) => {
        const rec = featuresApprove.find((l) => Number(l.id) === Number(el.id));
        return rec ? removeFeatureUserAsync({ id: el.id, user_id: rec.user_id, feature_id: rec.feature_id }) : () => {};
      }}
      itemsHeader={tmp}
      // Mapper={mapper}
    />
  );
};
export default ManageAttributes;

export const getServerSideProps: GetServerSideProps = Authenticated;
