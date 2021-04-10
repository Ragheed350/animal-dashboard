import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchColorsAsync,
  DeleteColorAsync,
  InsertColorAsync,
  UpdateColorAsync,
} from '@core';

// const mapper = (req: Color): Promise<Color_Req> => ({

// })

const ManageColors: FC = () => {
  const { lang, t } = useTranslation('common');
  // const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, colors } = useSelector((state: RootState) => state.Color);

  useEffect(() => {
    dispatch(FetchColorsAsync());
  }, [dispatch]);

  const columnsColors: ItemType[] = [
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
      items={colors}
      loading={status === 'loading'}
      AddAsync={(el) => InsertColorAsync({ color: el.item })}
      UpdateAsync={(el) => UpdateColorAsync({ id: el.id, color: el.item })}
      DeleteAsync={(el) => DeleteColorAsync({ id: el.id })}
      itemsHeader={[...columnsColors]}
      // Mapper={mapper}
    />
  );
};
export default ManageColors;

export const getServerSideProps: GetServerSideProps = Authenticated;
