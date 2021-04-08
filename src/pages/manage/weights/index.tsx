import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchWeightsAsync,
  DeleteWeightAsync,
  InsertWeightAsync,
  UpdateWeightAsync,
  FetchAnimalsAsync,
} from '@core';
import { Typography } from 'antd';

// const mapper = (req: Weight): Weight_Req => ({
// })

export const columnsWeights: ItemType[] = [
  {
    columnType: {
      title: 'المعرف',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    type: 'primary-key',
    // ignore: { insert: true }
  },
  {
    columnType: {
      title: 'القيمة',
      dataIndex: 'value',
      width: 200,
    },
    type: 'number',
    getInitialValue: (val: any) => Number(val),
  },
  {
    columnType: {
      title: 'تاريخ الوزن',
      dataIndex: 'weight_date',
      width: 300,
    },
    type: 'date',
    ignore: true,
  },
];

const ManageWeights: FC = () => {
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, weights } = useSelector((state: RootState) => state.Weight);
  const { animals } = useSelector((state: RootState) => state.Animal);

  useEffect(() => {
    dispatch(FetchWeightsAsync());
    dispatch(FetchAnimalsAsync());
  }, [dispatch]);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'الحيوان',
        dataIndex: 'animal_id',
        width: 200,
        render: (id: string) => (
          <Typography.Text>
            {en
              ? animals.find((el) => el.id === Number(id))?.['name:en']
              : animals.find((el) => el.id === Number(id))?.['name:ar']}
          </Typography.Text>
        ),
      },
      type: 'foreign-key',
      foreignKeyArr: animals.map((el) => ({ title: en ? el['name:en'] : el['name:ar'], value: el.id })),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={weights}
      loading={status === 'loading'}
      AddAsync={(el) => InsertWeightAsync({ weight: el.item })}
      UpdateAsync={(el) => UpdateWeightAsync({ id: el.id, weight: el.item })}
      DeleteAsync={(el) => DeleteWeightAsync({ id: el.id })}
      itemsHeader={[...columnsWeights, ...tmp]}
      // Mapper={mapper}
    />
  );
};
export default ManageWeights;

export const getServerSideProps: GetServerSideProps = Authenticated;
