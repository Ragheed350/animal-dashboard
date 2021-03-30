import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchFeaturesAsync,
  DeleteFeatureAsync,
  InsertFeatureAsync,
  UpdateFeatureAsync,
  FetchParentsAsync,
} from '@core';

export const columnsFeatures: ItemType[] = [
  {
    columnType: {
      title: 'المعرف',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    type: 'primary-key',
  },
  {
    columnType: {
      title: 'القيمة',
      dataIndex: 'value',
      width: 'auto',
    },
    type: 'number',
  },
  {
    columnType: {
      title: 'السعر',
      dataIndex: 'price',
      width: 'auto',
    },
    type: 'number',
  },
  {
    columnType: {
      title: 'الحد (بالشهر)',
      dataIndex: 'limit',
      width: 'auto',
    },
    type: 'number',
  },
];

const ManageFeatures: FC = () => {
  const { lang } = useTranslation();
  const dispatch = useDispatch();

  const { parents } = useSelector((state: RootState) => state.Category);
  const { status, features } = useSelector((state: RootState) => state.Feature);

  useEffect(() => {
    dispatch(FetchParentsAsync());
    dispatch(FetchFeaturesAsync());
  }, [dispatch]);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'النص',
        dataIndex: 'text',
        width: 'auto',
      },
      type: 'text',
      trans: true,
    },
    {
      columnType: {
        title: 'الصنف',
        dataIndex: 'category_id',
        width: 200,
        render: (id: number | string) => parents.find(el => el.id === Number(id))?.['name:ar']
      },
      type: 'foreign-key',
      foreignKeyArr: parents.map(el => ({ title: el['name:ar'], value: el.id }))
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={features}
      loading={status === 'loading'}
      AddAsync={(el) => InsertFeatureAsync({ feature: el.item })}
      UpdateAsync={(el) => UpdateFeatureAsync({ id: el.id, feature: el.item })}
      DeleteAsync={(el) => DeleteFeatureAsync({ id: el.id })}
      itemsHeader={[...columnsFeatures, ...tmp]}
    // Mapper={mapper}
    />
  );
};
export default ManageFeatures;

export const getServerSideProps: GetServerSideProps = Authenticated;
