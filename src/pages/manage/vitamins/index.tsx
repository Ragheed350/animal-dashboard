import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchVitaminsAsync,
  DeleteVitaminAsync,
  InsertVitaminAsync,
  UpdateVitaminAsync,
  Vitamin_Req,
  Category,
  FetchLevel2Async,
} from '@core';
import { Select } from 'antd';

const mapper = (req: any): Vitamin_Req => ({
  ...req,
  category_id: req.category,
});

const ManageVitamins: FC = () => {
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, vitamins } = useSelector((state: RootState) => state.Vitamin);
  const { level2, status: cstatus } = useSelector((state: RootState) => state.Category);

  useEffect(() => {
    dispatch(FetchVitaminsAsync());
    dispatch(FetchLevel2Async());
  }, [dispatch]);

  const columnsVitamins: ItemType[] = [
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
        width: 'auto',
      },
      type: 'text-area',
      trans: true,
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`strain`,
        dataIndex: 'category',
        width: 300,
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
      type: 'multi-foreign-key-obj',
      foreignKeyArr: level2.map((el) => ({ value: el.id, title: en ? el['name:en'] : el['name:ar'] })),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={vitamins}
      loading={status === 'loading' || cstatus === 'loading'}
      AddAsync={(el) => InsertVitaminAsync({ vitamin: el.item })}
      UpdateAsync={(el) => UpdateVitaminAsync({ id: el.id, vitamin: el.item })}
      DeleteAsync={(el) => DeleteVitaminAsync({ id: el.id })}
      itemsHeader={[...columnsVitamins, ...tmp]}
      Mapper={mapper}
    />
  );
};
export default ManageVitamins;

export const getServerSideProps: GetServerSideProps = Authenticated;
