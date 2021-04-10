import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchCountriesAsync,
  DeleteCountryAsync,
  InsertCountryAsync,
  UpdateCountryAsync,
} from '@core';

const ManageCountries: FC = () => {
  const { lang, t } = useTranslation('common');
  const dispatch = useDispatch();

  const { status, countries } = useSelector((state: RootState) => state.Country);

  useEffect(() => {
    dispatch(FetchCountriesAsync());
  }, [dispatch]);

  const columnsCountries: ItemType[] = [
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
        width: 'auto',
      },
      type: 'text',
      trans: true,
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={countries}
      loading={status === 'loading'}
      AddAsync={(el) => InsertCountryAsync({ country: el.item })}
      UpdateAsync={(el) => UpdateCountryAsync({ id: el.id, country: el.item })}
      DeleteAsync={(el) => DeleteCountryAsync({ id: el.id })}
      itemsHeader={[...columnsCountries]}
      // Mapper={mapper}
    />
  );
};
export default ManageCountries;

export const getServerSideProps: GetServerSideProps = Authenticated;
