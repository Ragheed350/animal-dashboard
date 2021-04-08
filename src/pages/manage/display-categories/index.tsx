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

// const mapper = (req: DisplayCategory): Promise<DisplayCategory_Req> => ({

// })

export const columnsDisplayCategories: ItemType[] = [
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
      title: 'الاسم',
      dataIndex: 'name',
      width: 'auto',
    },
    type: 'text',
    trans: true,
  },
  {
    columnType: {
      title: 'مميز؟',
      dataIndex: 'is_featured',
      width: 100,
    },
    type: 'check-box',
    getInitialValue: (val: any) => Number(val),
  },
];

const ManageDisplayCategories: FC = () => {
  const { lang } = useTranslation();
  // const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, displayCategories } = useSelector((state: RootState) => state.DisplayCategory);

  useEffect(() => {
    dispatch(FetchDisplayCategoriesAsync());
  }, [dispatch]);

  // const tmp: ItemType[] = [
  //     {
  //         columnType: {
  //             title: 'Parent ID',
  //             dataIndex: 'parent_id',
  //             width: 200,
  //             render: (val: string) => en ? displayCategories.find(el => el.id === Number(val))?.['name:en'] : displayCategories.find(el => el.id === Number(val))?.['name:ar']
  //         },
  //         type: 'foreign-key',
  //         foreignKeyArr: displayCategories.map(el => ({ title: en ? el['name:en'] : el['name:en'], value: el.id }))
  //     },
  // ]

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
