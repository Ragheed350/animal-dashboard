import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchVaccinatesAsync,
  DeleteVaccinateAsync,
  InsertVaccinateAsync,
  UpdateVaccinateAsync,
  Category,
  FetchLevel3Async,
} from '@core';
import { Select } from 'antd';

// const mapper = (req: Vaccinate): Vaccinate_Req => ({
// })

const ManageVaccinates: FC = () => {
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, vaccinates } = useSelector((state: RootState) => state.Vaccinate);
  const { level3 } = useSelector((state: RootState) => state.Category);

  useEffect(() => {
    dispatch(FetchVaccinatesAsync());
    dispatch(FetchLevel3Async());
  }, [dispatch]);

  const columnsVaccinates: ItemType[] = [
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
        title: t`name`,
        dataIndex: 'name',
        width: 200,
      },
      type: 'text',
      trans: true,
    },
    {
      columnType: {
        title: t`description`,
        dataIndex: 'description',
        width: 300,
      },
      type: 'text-area',
      trans: true,
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`category`,
        dataIndex: 'category',
        width: 200,
        render: (arr: Category[]) => (
          <Select value={arr.map((el) => el.id)} style={{ width: '100%' }} mode='multiple'>
            {arr.map((el) => (
              <Select.Option key={el.id} value={el.id}>
                {en ? el['name:en'] : el['name:ar']}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      type: 'foreign-key',
      ignore: true,
    },
    {
      columnType: {
        title: 'الصنف',
        dataIndex: 'category_id',
        width: 200,
      },
      type: 'multi-foreign-key-obj',
      initialValueDataIndex: 'category',
      getInitialValue: (arr: Category[]) => arr.map((el) => el.id),
      hidden: true,
      foreignKeyArr: level3.map((el) => ({ title: en ? el['name:en'] : el['name:ar'], value: el.id })),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={vaccinates}
      loading={status === 'loading'}
      AddAsync={(el) => InsertVaccinateAsync({ vaccinate: el.item })}
      UpdateAsync={(el) => UpdateVaccinateAsync({ id: el.id, vaccinate: el.item })}
      DeleteAsync={(el) => DeleteVaccinateAsync({ id: el.id })}
      itemsHeader={[...columnsVaccinates, ...tmp]}
      // Mapper={mapper}
    />
  );
};
export default ManageVaccinates;

export const getServerSideProps: GetServerSideProps = Authenticated;
