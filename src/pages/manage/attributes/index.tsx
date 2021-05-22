import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  DeleteAttributeAsync,
  InsertAttributeAsync,
  UpdateAttributeAsync,
  RootState,
  Authenticated,
  FetchCategoriesAsync,
  FetchParentsAsync,
  FetchAttributesAsync,
  Gender,
} from '@core';

const ManageAttributes: FC = () => {
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, attributes } = useSelector((state: RootState) => state.Attribute);
  const { parents } = useSelector((state: RootState) => state.Category);

  useEffect(() => {
    dispatch(FetchCategoriesAsync());
    dispatch(FetchParentsAsync());
    dispatch(FetchAttributesAsync());
  }, [dispatch]);

  const columnsAttributes: ItemType[] = [
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
        width: 'auto',
      },
      type: 'text',
      trans: true,
    },
    {
      columnType: {
        title: t`gender`,
        dataIndex: 'gender',
        width: 200,
        render: (val: Gender) => (!en ? (val === Gender.male ? 'ذكر' : 'انثى') : val === Gender.male ? 'male' : 'female'),
      },
      type: 'select',
      foreignKeyArr: [
        { title: en ? 'male' : 'ذكر', value: '0' },
        { title: en ? 'female' : 'أنثى', value: '1' },
      ],
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`category`,
        dataIndex: 'category_id',
        width: 200,
        render: (val: string) =>
          en
            ? parents.find((el) => el.id === Number(val))?.['name:en']
            : parents.find((el) => el.id === Number(val))?.['name:ar'],
      },
      type: 'foreign-key',
      foreignKeyArr: parents.map((el) => ({
        title: en ? el['name:en'] : el['name:ar'],
        value: el.id,
      })),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={attributes}
      loading={status === 'loading'}
      AddAsync={(el) => InsertAttributeAsync({ attribute: el.item })}
      UpdateAsync={(el) => UpdateAttributeAsync({ id: el.id, attribute: el.item })}
      DeleteAsync={(el) => DeleteAttributeAsync({ id: el.id })}
      itemsHeader={[...columnsAttributes, ...tmp]}
      // Mapper={mapper}
    />
  );
};
export default ManageAttributes;

export const getServerSideProps: GetServerSideProps = Authenticated;
