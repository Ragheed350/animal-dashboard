import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  DeleteAnimalAttributeAsync,
  InsertAnimalAttributeAsync,
  UpdateAnimalAttributeAsync,
  RootState,
  Authenticated,
  FetchAttributesAsync,
  FetchAnimalsAsync,
} from '@core';
import { FetchAnimalAttributesAsync } from 'src/core/data-management/redux/animal-attribute';

// const mapper = (req: Attribute): Promise<Attribute_Req> => ({

// })

export const columnsAnimalAttributes: ItemType[] = [
  {
    columnType: {
      title: 'المعرف',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    type: 'primary-key',
  },
];

const ManageAttributes: FC = () => {
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, AnimalAttributes } = useSelector((state: RootState) => state.AnimalAttribute);
  const { animals } = useSelector((state: RootState) => state.Animal);
  const { attributes } = useSelector((state: RootState) => state.Attribute);

  useEffect(() => {
    dispatch(FetchAnimalsAsync());
    dispatch(FetchAttributesAsync());
    dispatch(FetchAnimalAttributesAsync());
  }, []);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'الحيوان',
        dataIndex: 'animal_id',
        width: 'auto',
        render: (val: string) =>
          en
            ? animals.find((el) => el.id === Number(val))?.['name:en']
            : animals.find((el) => el.id === Number(val))?.['name:ar'],
      },
      type: 'foreign-key',
      foreignKeyArr: animals.map((el) => ({
        title: en ? el['name:en'] : el['name:ar'],
        value: el.id,
      })),
    },
    {
      columnType: {
        title: 'الصفة',
        dataIndex: 'attribute_id',
        width: 'auto',
        render: (val: string) =>
          en
            ? attributes.find((el) => el.id === Number(val))?.['name:en']
            : attributes.find((el) => el.id === Number(val))?.['name:ar'],
      },
      type: 'foreign-key',
      foreignKeyArr: attributes.map((el) => ({
        title: en ? el['name:en'] : el['name:ar'],
        value: el.id,
      })),
    },
    {
      columnType: {
        title: 'القيمة',
        dataIndex: 'value',
        width: 'auto',
      },
      type: 'text',
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={AnimalAttributes}
      loading={status === 'loading'}
      AddAsync={(el) => InsertAnimalAttributeAsync({ animalAttribute: el.item })}
      UpdateAsync={(el) => UpdateAnimalAttributeAsync({ id: el.id, animalAttribute: el.item })}
      DeleteAsync={(el) => DeleteAnimalAttributeAsync({ id: el.id })}
      itemsHeader={[...columnsAnimalAttributes, ...tmp]}
      // Mapper={mapper}
    />
  );
};
export default ManageAttributes;

export const getServerSideProps: GetServerSideProps = Authenticated;
