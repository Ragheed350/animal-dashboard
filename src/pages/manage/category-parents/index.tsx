import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  DeleteCategoryAsync,
  InsertCategoryAsync,
  UpdateCategoryAsync,
  RootState,
  Authenticated,
  FetchParentsAsync,
} from '@core';

const mapper = (req: any) => {
  const formData = new FormData();
  for (const key in req)
    if (Object.prototype.hasOwnProperty.call(req, key))
      formData.append(key, req[key]);
  return formData;
};

export const columnsCategories: ItemType[] = [
  {
    columnType: {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    type: 'primary-key',
  },
  {
    columnType: {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
    },
    type: 'text',
    trans: true,
  },
  {
    columnType: {
      title: 'Description',
      dataIndex: 'description',
      width: 'auto',
    },
    type: 'text-area',
    trans: true,
  },
  {
    columnType: {
      title: 'Image',
      dataIndex: 'image',
      width: 300,
    },
    type: 'image',
  },
];

const ManageCategories: FC = () => {
  const { lang } = useTranslation();
  // const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, parents } = useSelector((state: RootState) => state.Category);

  useEffect(() => {
    dispatch(FetchParentsAsync());
  }, [dispatch]);

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={parents}
      loading={status === 'loading'}
      AddAsync={(el) => InsertCategoryAsync({ category: el.item })}
      UpdateAsync={(el) =>
        UpdateCategoryAsync({ id: el.id, category: el.item })
      }
      DeleteAsync={(el) => DeleteCategoryAsync({ id: el.id })}
      itemsHeader={[...columnsCategories]}
      Mapper={mapper}
    />
  );
};
export default ManageCategories;

export const getServerSideProps: GetServerSideProps = Authenticated;
