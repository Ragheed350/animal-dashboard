import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Animal, ApproveAnimalAsync, Authenticated, FetchAnimalsAsync, RootState, UnApproveAnimalAsync } from '@core';
import { Button, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FilterValue } from 'antd/lib/table/interface';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const index: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const { animals, status } = useSelector((state: RootState) => state.Animal);

  const [filterInfo, setFilterInfo] = useState<Record<string, FilterValue | null>>();

  const colums: ColumnsType<Animal> = [
    {
      title: t`id`,
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: t`name`,
      dataIndex: 'name:ar',
      width: 'auto',
    },
    {
      title: t`approved`,
      dataIndex: 'approved',
      width: 200,
      render: (val: '1' | '0') =>
        Number(val) === 1 ? (
          <CheckCircleFilled style={{ fontSize: '3rem', color: 'green' }} />
        ) : (
          <CloseCircleFilled style={{ fontSize: '3rem', color: 'red' }} />
        ),

      filters: [
        { text: 'الموافق عليه', value: '1' },
        { text: 'غير الموافق عليه', value: '0' },
      ],
      filteredValue: filterInfo && filterInfo.approved,
      onFilter: (value, record) => record.approved === Number(value),
      ellipsis: true,
    },
  ];

  useEffect(() => {
    dispatch(FetchAnimalsAsync());
  }, []);

  const tmp: ColumnsType<any> = [
    {
      title: t`operations`,
      dataIndex: 'approved',
      key: '123123',
      width: 200,
      render: (val: '1' | '0', { id, farm }: Animal) =>
        Number(val) === 1 ? (
          <Popconfirm onConfirm={() => dispatch(UnApproveAnimalAsync({ id }))} title={t`unapproved_ru_sure`}>
            <Button type='primary' size='large' ghost danger>
              {t`unapproved`}
            </Button>
          </Popconfirm>
        ) : (
          <Popconfirm
            onConfirm={() => dispatch(ApproveAnimalAsync({ id, user_id: Number(farm[0].farm_id) }))}
            title={t`approved_ru_sure`}
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
      dataSource={[...animals.map((el) => ({ ...el, approved: Number(el.approved) }))]}
      columns={[...colums, ...tmp]}
      onChange={(pagination, filters) => {
        console.log('Various parameters', { pagination, filters });
        setFilterInfo(filters);
      }}
    ></Table>
  );
};

export default index;

export const getServerSideProps = Authenticated;
