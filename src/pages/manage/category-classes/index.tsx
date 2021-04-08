import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchLevel2Async,
  FetchParentsAsync,
  ObjToFormData,
  InsertLevel2Async,
  UpdateLevel2Async,
  DeleteLevel2Async,
} from '@core';
import { UploadFile } from 'antd/lib/upload/interface';

const mapper = (req: any) => {
  const formData = new FormData();

  let result: string | File | Blob = '';

  if (req.image.lastModified) result = req.image;
  else result = req.image.name!;

  req.image = result;

  for (const key in req) {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      const el = req[key];
      if (key === 'image') {
        if (typeof el === 'string') {
          const arr = el.split('/');
          console.log(`${arr[arr.length - 2]}/${arr[arr.length - 1]}`);

          formData.append(key, `${arr[arr.length - 2]}/${arr[arr.length - 1]}`);
        } else formData.append(key, el);
      } else formData.append(key, el);
    }
  }

  return formData;
};

export const columnsCategories: ItemType[] = [
  {
    columnType: {
      title: 'المعرف',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    type: 'primary-key',
  },
  {
    columnType: {
      title: 'الاسم',
      dataIndex: 'name',
      width: 200,
    },
    type: 'text',
    trans: true,
  },
  {
    columnType: {
      title: 'الوصف',
      dataIndex: 'description',
      width: 'auto',
    },
    type: 'text-area',
    trans: true,
  },
  {
    columnType: {
      title: 'معدل الولادة (بالشهر)',
      dataIndex: 'pregnancy',
      width: 300,
    },
    getInitialValue: (val: string) => Number(val),
    type: 'number',
  },
];

const ManageCategories: FC = () => {
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, parents, level2 } = useSelector((state: RootState) => state.Category);

  useEffect(() => {
    dispatch(FetchLevel2Async());
    dispatch(FetchParentsAsync());
  }, [dispatch]);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'السلالة',
        dataIndex: 'parent_id',
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
    {
      columnType: {
        title: 'الصورة',
        dataIndex: 'image',
        width: 300,
      },
      getInitialValue: (val: string) => ({ name: val, preview: val, uid: val } as UploadFile),
      type: 'image',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={level2}
      loading={status === 'loading'}
      AddAsync={(el) => InsertLevel2Async({ category: el.item })}
      UpdateAsync={(el) => UpdateLevel2Async({ id: el.id, category: el.item })}
      DeleteAsync={(el) => DeleteLevel2Async({ id: el.id })}
      itemsHeader={[...columnsCategories, ...tmp]}
      Mapper={mapper}
    />
  );
};
export default ManageCategories;

export const getServerSideProps: GetServerSideProps = Authenticated;
