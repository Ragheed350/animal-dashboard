import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchFarmsAsync,
  InsertFarmAsync,
  UpdateFarmAsync,
} from '@core';
import { UploadFile } from 'antd/lib/upload/interface';

const mapper = (req: any) => {
  const formData = new FormData();

  let result: string | File | Blob = '';
  console.log(req.logo);

  if (req.logo.lastModified) result = req.logo;
  else result = req.logo.name!;

  req.image = result;
  delete req.logo;

  for (const key in req) {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      const el = req[key];
      formData.append(key, el);
    }
  }

  return formData;
};

export const columnsFarms: ItemType[] = [
  {
    columnType: {
      title: 'المعرف',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    type: 'number',
    // ignore: { insert: true }
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
      width: 300,
    },
    type: 'text-area',
    trans: true,
  },
  {
    columnType: {
      title: 'الكود',
      dataIndex: 'code',
      width: 200,
    },
    type: 'text',
  },
  {
    columnType: {
      title: 'التقييم',
      dataIndex: 'rate',
      width: 200,
    },
    type: 'text',
    ignore: true,
  },
  {
    columnType: {
      title: 'الشعار',
      dataIndex: 'logo',
      width: 300,
    },
    type: 'image',
    getInitialValue: (val: string) => ({ name: val, preview: val, uid: val } as UploadFile),
  },
  {
    columnType: {
      title: 'الموقع',
      dataIndex: 'latLng',
      render: (val: string) => {
        const res = JSON.parse(val) as { longitude: string; latitude: string };
        return (
          <a target='__blank' href={`https://www.google.com/maps/place/${res.longitude}, ${res.latitude}`}>
            {'إذهب إلى الموقع'}
          </a>
        );
      },
      width: 200,
    },
    type: 'text',
    ignore: true,
  },
  {
    columnType: {
      title: 'خطوط الطول',
      dataIndex: 'latitude',
      width: 200,
    },
    type: 'text',
    hidden: true,
  },
  {
    columnType: {
      title: 'خطوط العرض',
      dataIndex: 'longitude',
      width: 200,
    },
    type: 'text',
    hidden: true,
  },
];

const ManageFarms: FC = () => {
  const { lang } = useTranslation();
  // const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, farms } = useSelector((state: RootState) => state.Farm);

  useEffect(() => {
    dispatch(FetchFarmsAsync());
    // dispatch()
  }, [dispatch]);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'المالك',
        dataIndex: 'owner_id',
        width: 200,
      },
      type: 'text',
      ignore: true,
      // type: 'foreign-key',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={farms}
      loading={status === 'loading'}
      AddAsync={(el) => InsertFarmAsync({ farm: el.item })}
      UpdateAsync={(el) => UpdateFarmAsync({ id: el.id, farm: el.item })}
      // by request from the customer
      // DeleteAsync={(el) => DeleteFarmAsync({ id: el.id })}
      itemsHeader={[...columnsFarms, ...tmp]}
      Mapper={mapper}
    />
  );
};
export default ManageFarms;

export const getServerSideProps: GetServerSideProps = Authenticated;
