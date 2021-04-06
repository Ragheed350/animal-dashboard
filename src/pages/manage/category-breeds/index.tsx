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
  FetchLevel3Async,
  UpdateLevel3Async,
  InsertLevel3Async,
  DeleteLevel3Async,
} from '@core';
import { UploadFile } from 'antd/lib/upload/interface';

const mapper = (req: any) => {
  const formData = new FormData();

  let result: string | File | Blob = '';
  if (req.image.originFileObj) result = req.image.originFileObj;
  else result = req.image.url!;

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
      title: 'الصورة',
      dataIndex: 'image',
      width: 300,
    },
    getInitialValue: (val: string) => ({ name: val, preview: val, uid: val } as UploadFile),
    type: 'image',
  },
];

const ManageCategories: FC = () => {
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, level2, level3 } = useSelector((state: RootState) => state.Category);

  useEffect(() => {
    dispatch(FetchLevel2Async());
    dispatch(FetchLevel3Async());
  }, [dispatch]);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'معرف الأب',
        dataIndex: 'parent_id',
        width: 200,
        render: (val: string) =>
          en
            ? level2.find((el) => el.id === Number(val))?.['name:en']
            : level2.find((el) => el.id === Number(val))?.['name:ar'],
      },
      type: 'foreign-key',
      foreignKeyArr: level2.map((el) => ({ title: en ? el['name:en'] : el['name:ar'], value: el.id })),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={level3}
      loading={status === 'loading'}
      AddAsync={(el) => InsertLevel3Async({ category: el.item })}
      UpdateAsync={(el) => UpdateLevel3Async({ id: el.id, category: el.item })}
      DeleteAsync={(el) => DeleteLevel3Async({ id: el.id })}
      itemsHeader={[...columnsCategories, ...tmp]}
      Mapper={mapper}
    />
  );
};
export default ManageCategories;

export const getServerSideProps: GetServerSideProps = Authenticated;
