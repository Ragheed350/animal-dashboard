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
  FetchCategoriesAsync,
} from '@core';
import { Col, Form } from 'antd';
import CascederForm from '../../../components/CascederFrom';

export const columnsFeatures: ItemType[] = [
  {
    columnType: {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    type: 'primary-key',
  },
  {
    columnType: {
      title: 'Value',
      dataIndex: 'value',
      width: 'auto',
    },
    type: 'number',
  },
  {
    columnType: {
      title: 'Price',
      dataIndex: 'price',
      width: 'auto',
    },
    type: 'number',
  },
  {
    columnType: {
      title: 'Limit',
      dataIndex: 'limit',
      width: 'auto',
    },
    type: 'number',
  },
];

const ManageFeatures: FC = () => {
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, features } = useSelector((state: RootState) => state.Feature);

  useEffect(() => {
    dispatch(FetchCategoriesAsync());
    dispatch(FetchFeaturesAsync());
  }, [dispatch]);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'Text',
        dataIndex: 'text',
        width: 'auto',
      },
      type: 'text',
      trans: true,
    },
    {
      columnType: {
        title: 'Category',
        dataIndex: 'category_id',
        width: 200,
      },
      type: 'foreign-key',
      customFormItem: (
        <Col span={12}>
          <Form.Item
            label='Category'
            name='category_id'
            rules={[{ required: true }]}
          >
            <CascederForm />
          </Form.Item>
        </Col>
      ),
      getInitialValue: () => undefined,
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
