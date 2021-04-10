import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchDisplayCategoriesAsync,
  DeleteDisplayCategoryAsync,
  InsertDisplayCategoryAsync,
  UpdateDisplayCategoryAsync,
} from '@core';

const ManageDisplayCategories: FC = () => {
  const { lang, t } = useTranslation('common');
  // const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, displayCategories } = useSelector((state: RootState) => state.DisplayCategory);

  useEffect(() => {
    dispatch(FetchDisplayCategoriesAsync());
  }, [dispatch]);

  const columnsDisplayCategories: ItemType[] = [
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
        title: t`featured`,
        dataIndex: 'is_featured',
        width: 100,
      },
      type: 'check-box',
      getInitialValue: (val: any) => Number(val),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={displayCategories}
      loading={status === 'loading'}
      AddAsync={(el) => InsertDisplayCategoryAsync({ displayCategory: el.item })}
      UpdateAsync={(el) => UpdateDisplayCategoryAsync({ id: el.id, displayCategory: el.item })}
      DeleteAsync={(el) => DeleteDisplayCategoryAsync({ id: el.id })}
      itemsHeader={[...columnsDisplayCategories]}
      // Mapper={mapper}
    />
  );
};
export default ManageDisplayCategories;

export const getServerSideProps: GetServerSideProps = Authenticated;
