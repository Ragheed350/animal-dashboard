import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import {
  Authenticated,
  RootState,
  listFeaturesAsync,
  approveFeatureAsync,
  unapproveFeatureAsync,
  FeatureForApprove,
  FetchUsersAsync,
  FetchFeaturesAsync,
} from '@core';
import { Button, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

const index: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const { featuresApprove, features, status } = useSelector((state: RootState) => state.Feature);
  const { users } = useSelector((state: RootState) => state.Users);

  useEffect(() => {
    dispatch(listFeaturesAsync());
    dispatch(FetchUsersAsync());
    dispatch(FetchFeaturesAsync());
  }, []);

  const colums: ColumnsType<FeatureForApprove> = [
    {
      title: t`id`,
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: t`user`,
      dataIndex: 'user_id',
      width: 'auto',
      render: (val: number | string) => <>{users.find((el) => el.id === Number(val))?.['name:ar']}</>,
    },
    {
      title: t`package`,
      dataIndex: 'feature_id',
      width: 'auto',
      render: (val: number | string) => <>{features.find((el) => el.id === Number(val))?.['text:ar']}</>,
    },
    {
      title: t`approved`,
      dataIndex: 'is_approved',
      width: 200,
      render: (val: '1' | '0') =>
        Number(val) === 1 ? (
          <CheckCircleFilled style={{ fontSize: '3rem', color: 'green' }} />
        ) : (
          <CloseCircleFilled style={{ fontSize: '3rem', color: 'red' }} />
        ),
    },
    {
      title: t`operations`,
      dataIndex: 'is_approved',
      key: '123123',
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
  ];

  return (
    <Table
      bordered
      loading={status === 'loading'}
      dataSource={[...featuresApprove.map((el) => ({ ...el, approved: Number(el.is_approved) }))]}
      columns={colums}
    ></Table>
  );
};

export default index;

export const getServerSideProps = Authenticated;
