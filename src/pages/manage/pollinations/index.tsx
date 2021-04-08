import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchPollinationsAsync,
  DeletePollinationAsync,
  InsertPollinationAsync,
  UpdatePollinationAsync,
  FetchAnimalsAsync,
  Pollination_Req,
} from '@core';

const mapper = (req: Pollination_Req) => ({
  duration: req.duration,
  female_no: req.female_no,
  male_no: req.male_no,
});

export const columnsPollinations: ItemType[] = [
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
      title: 'المدة المتبقية للولادة(باليوم)',
      dataIndex: 'duration',
      width: 200,
    },
    type: 'text',
  },
  {
    columnType: {
      title: 'تاريخ التلقيح',
      dataIndex: 'date',
      width: 200,
    },
    type: 'date',
  },
];

const ManagePollinations: FC = () => {
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, pollinations } = useSelector((state: RootState) => state.Pollination);
  const { animals } = useSelector((state: RootState) => state.Animal);

  useEffect(() => {
    dispatch(FetchPollinationsAsync());
    dispatch(FetchAnimalsAsync());
  }, [dispatch]);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'الذكر',
        dataIndex: 'male_no',
        width: 200,
        render: (no: string) =>
          en
            ? animals.find((el) => el.animal_no === no)?.['name:en']
            : animals.find((el) => el.animal_no === no)?.['name:ar'],
      },
      type: 'foreign-key',

      foreignKeyArr: animals
        .filter((el) => el.gender === '0')
        .map((el) => ({
          title: en ? el['name:en'] : el['name:ar'],
          value: el.animal_no,
        })),
    },
    {
      columnType: {
        title: 'الأنثى',
        dataIndex: 'female_no',
        width: 200,
        render: (no: string) =>
          en
            ? animals.find((el) => el.animal_no === no)?.['name:en']
            : animals.find((el) => el.animal_no === no)?.['name:ar'],
      },
      type: 'foreign-key',

      foreignKeyArr: animals
        .filter((el) => el.gender === '1')
        .map((el) => ({
          title: en ? el['name:en'] : el['name:ar'],
          value: el.animal_no,
        })),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={pollinations}
      loading={status === 'loading'}
      AddAsync={(el) => InsertPollinationAsync({ pollination: el.item })}
      UpdateAsync={(el) => UpdatePollinationAsync({ id: el.id, pollination: el.item })}
      DeleteAsync={(el) => DeletePollinationAsync({ id: el.id })}
      itemsHeader={[...columnsPollinations, ...tmp]}
      Mapper={mapper}
    />
  );
};
export default ManagePollinations;

export const getServerSideProps: GetServerSideProps = Authenticated;
