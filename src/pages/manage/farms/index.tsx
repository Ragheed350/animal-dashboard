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

const ManageFarms: FC = () => {
  const { lang, t } = useTranslation('common');
  const dispatch = useDispatch();

  const { status, farms } = useSelector((state: RootState) => state.Farm);

  useEffect(() => {
    dispatch(FetchFarmsAsync());
  }, [dispatch]);

  const columnsFarms: ItemType[] = [
    {
      columnType: {
        title: t`id`,
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
      },
      type: 'number',
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
    {
      columnType: {
        title: t`code`,
        dataIndex: 'code',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`rate`,
        dataIndex: 'rate',
        width: 200,
      },
      type: 'text',
      ignore: true,
    },
    {
      columnType: {
        title: t`logo`,
        dataIndex: 'logo',
        width: 300,
      },
      type: 'image',
      getInitialValue: (val: string) => ({ name: val, preview: val, uid: val } as UploadFile),
    },
    {
      columnType: {
        title: t`location`,
        dataIndex: 'latLng',
        render: (val: string) => {
          const res = JSON.parse(val) as { longitude: string; latitude: string };
          return (
            <a target='__blank' href={`https://www.google.com/maps/place/${res.longitude}, ${res.latitude}`}>
              {t`go_to_location`}
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
        title: t`latitude`,
        dataIndex: 'latitude',
        width: 200,
      },
      type: 'text',
      hidden: true,
    },
    {
      columnType: {
        title: t`longitude`,
        dataIndex: 'longitude',
        width: 200,
      },
      type: 'text',
      hidden: true,
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`owner`,
        dataIndex: 'owner_id',
        width: 200,
      },
      type: 'text',
      ignore: true,
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={farms}
      loading={status === 'loading'}
      AddAsync={(el) => InsertFarmAsync({ farm: el.item })}
      UpdateAsync={(el) => UpdateFarmAsync({ id: el.id, farm: el.item })}
      itemsHeader={[...columnsFarms, ...tmp]}
      Mapper={mapper}
    />
  );
};
export default ManageFarms;

export const getServerSideProps: GetServerSideProps = Authenticated;
