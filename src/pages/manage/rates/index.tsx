import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchRatesAsync,
  DeleteRateAsync,
  InsertRateAsync,
  UpdateRateAsync,
  FetchAnimalsAsync,
  FetchUsersAsync,
} from '@core';
import { Typography } from 'antd';

// const mapper = (req: Rate): Rate_Req => ({

// })

const ManageRates: FC = () => {
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, rates } = useSelector((state: RootState) => state.Rate);
  const { animals } = useSelector((state: RootState) => state.Animal);
  const { users } = useSelector((state: RootState) => state.Users);

  useEffect(() => {
    dispatch(FetchRatesAsync());
    dispatch(FetchAnimalsAsync());
    dispatch(FetchUsersAsync());
  }, [dispatch]);

  const columnsRates: ItemType[] = [
    {
      columnType: {
        title: t`id`,
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
      },
      type: 'primary-key',
      // ignore: { insert: true }
    },
    {
      columnType: {
        title: t`value`,
        dataIndex: 'value',
        width: 200,
      },
      type: 'text',
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`user`,
        dataIndex: 'user_id',
        width: 200,
        render: (id: string) => (
          <Typography.Text>
            {en
              ? users.find((el) => el.id === Number(id))?.['name:en']
              : users.find((el) => el.id === Number(id))?.['name:ar']}
          </Typography.Text>
        ),
      },
      type: 'foreign-key',
      foreignKeyArr: users.map((el) => ({
        title: en ? el['name:en'] : el['name:ar'],
        value: el.id,
      })),
    },
    {
      columnType: {
        title: t`animal`,
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
      foreignKeyArr: animals.map((el) => ({
        title: en ? el['name:en'] : el['name:ar'],
        value: el.id,
      })),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={rates}
      loading={status === 'loading'}
      AddAsync={(el) => InsertRateAsync({ rate: el.item })}
      UpdateAsync={(el) => UpdateRateAsync({ id: el.id, rate: el.item })}
      DeleteAsync={(el) => DeleteRateAsync({ id: el.id })}
      itemsHeader={[...columnsRates, ...tmp]}
      // Mapper={mapper}
    />
  );
};
export default ManageRates;

export const getServerSideProps: GetServerSideProps = Authenticated;
