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
} from '@core';

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

  const columnsAnimalAttributes: ItemType[] = [
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
        title: t`approved`,
        dataIndex: 'is_approved',
      },
      type: 'check-box',
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`user`,
        dataIndex: 'user_id',
        width: 'auto',
        render: (val: number | string) => (
          <>
            {en
              ? users.find((el) => el.id === Number(val))?.['name:en']
              : users.find((el) => el.id === Number(val))?.['name:ar']}
          </>
        ),
      },
      type: 'foreign-key',
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
      itemsHeader={[...columnsAnimalAttributes, ...tmp]}
      // Mapper={mapper}
    />
  );
};
export default ManageAttributes;

export const getServerSideProps: GetServerSideProps = Authenticated;
