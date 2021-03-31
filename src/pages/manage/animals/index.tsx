import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  DeleteAnimalAsync,
  FetchAnimalsAsync,
  InsertAnimalAsync,
  UpdateAnimalAsync,
  RootState,
  Authenticated,
  FetchCategoriesAsync,
  FetchColorsAsync,
  FetchCountriesAsync,
  FetchDisplayCategoriesAsync,
  Attachment,
  DATE_FORMAT,
  FetchParentsAsync,
  FetchFarmsAsync,
} from '@core';
import { Carousel, Col, Form, Image, Typography } from 'antd';
import CascederForm from 'src/components/CascederFrom';
import { UploadFile } from 'antd/lib/upload/interface';

const mapper = (req: any): any => {
  const formData = new FormData();


  let result: (string | File | Blob)[] = [];
  req.image.forEach((el: UploadFile) => {
    if (el.originFileObj)
      result.push(el.originFileObj)
    else result.push(el.url!)
  })

  req.image = result;

  for (const key in req) {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      const el = req[key];
      if (key === 'birth_date')
        formData.append(key, (el as moment.Moment).format(DATE_FORMAT));
      else if (key === 'image') {
        (el as (File | string)[]).forEach((element) => {
          if (typeof element === 'string') {
            const arr = element.split('/');
            formData.append(key + '[]', `${arr[arr.length - 2]}/${arr[arr.length - 1]}`);
          }
          else
            formData.append(key + '[]', element);
        });
      } else if (['for_buy', 'is_shown', 'approved', 'is_dead'].includes(key))
        formData.append(key, (el as boolean | undefined) ? '1' : '0');
      else formData.append(key, el);
    }
  }


  return formData;
};

export const columnsAnimals: ItemType[] = [
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
      title: 'رقم الحيوان',
      dataIndex: 'animal_no',
      width: 200,
    },
    type: 'text',
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
      title: 'تاريخ الولادة',
      dataIndex: 'birth_date',
      width: 200,
    },
    type: 'date',
  },
  {
    columnType: {
      title: 'الجنس',
      dataIndex: 'gender',
      width: 200,
      render: (val: '0' | '1') => (
        <Typography.Text>{val === '1' ? 'ذكر' : 'أنثى'}</Typography.Text>
      ),
    },
    type: 'select',
    foreignKeyArr: [
      { title: 'ذكر', value: '0' },
      { title: 'أنثى', value: '1' },
    ],
  },
  {
    columnType: {
      title: 'رقم الأذن',
      dataIndex: 'tag_number',
      width: 200,
    },
    type: 'number',
  },
  {
    columnType: {
      title: 'للشراء؟',
      dataIndex: 'for_buy',
      width: 200,
    },
    type: 'check-box',
    required: false,
  },
  {
    columnType: {
      title: 'السعر',
      dataIndex: 'price',
      width: 200,
    },
    type: 'text',
    ignore: true
  },
  {
    columnType: {
      title: 'بيانات المشتري',
      dataIndex: 'puyer_data',
      width: 200,
    },
    type: 'text',
    ignore: true
  },
  {
    columnType: {
      title: 'للعرض؟',
      dataIndex: 'is_shown',
      width: 200,
    },
    type: 'check-box',
    required: false,
  },
  {
    columnType: {
      title: 'كود',
      dataIndex: 'qr',
      width: 200,
    },
    type: 'text',
    ignore: true,
  },
  {
    columnType: {
      title: 'صورة الكود',
      dataIndex: 'qr_image',
      width: 200,
    },
    type: 'image',
    ignore: true,
  },
  {
    columnType: {
      title: 'ميّت؟',
      dataIndex: 'is_dead',
      width: 200,
    },
    type: 'check-box',
    required: false,
  },
  {
    columnType: {
      title: 'مقبول؟',
      dataIndex: 'approved',
      width: 200,
    },
    type: 'check-box',
    ignore: true
  },
  {
    columnType: {
      title: 'NFC',
      dataIndex: 'nfc',
      width: 200,
    },
    type: 'number'
  },
  // {
  //   columnType: {
  //     title: 'Association',
  //     dataIndex: 'association_no',
  //     width: 200,
  //   },
  //   type: 'number',
  //   required: false,
  // },
  {
    columnType: {
      title: 'المرفقات',
      dataIndex: 'attachments',
      width: 200,
      render: (arr: Attachment[]) => (
        <Carousel draggable>
          {arr.map((el) => (
            <div>
              <Image key={el.id} src={el.url} style={{ width: 150, height: 150, objectFit: 'cover' }} />
            </div>
          ))}
        </Carousel>
      ),
    },
    type: 'multi-foreign-key',
    ignore: true,
  },
  {
    columnType: {
      title: 'التقييم',
      dataIndex: 'rate',
      width: 200,
    },
    type: 'number',
    ignore: true,
  },
  {
    columnType: {
      title: 'العمر',
      dataIndex: 'age',
      width: 200,
    },
    type: 'number',
    ignore: true
  },
  {
    columnType: {
      title: 'الوزن',
      dataIndex: 'weight',
      width: 200,
    },
    type: 'number',
    hidden: true,
    initialValueDataIndex: 'Weight',
    getInitialValue: (val: { id: number, value: string, animal_id: string, weight_date: string }[]) => val[val.length - 1]?.value,
  },
  {
    columnType: {
      title: 'الوزن',
      dataIndex: 'Weight',
      width: 200,
      render: (val: { id: number, value: string, animal_id: string, weight_date: string }[]) => <>{val[val.length - 1]?.value}</>
    },
    type: 'number',
    ignore: true
  },
  {
    columnType: {
      title: 'الصور',
      dataIndex: 'image',
      width: 200,
    },
    type: 'multi-images',
    hidden: true,
    initialValueDataIndex: 'attachments',
    getInitialValue: (val: Attachment[]) =>
      val.map((el) => ({ uid: el.id, name: el.url, url: el.url }))
    ,
  },
];

const ManageAnimals: FC = () => {
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, animals } = useSelector((state: RootState) => state.Animal);
  const { farms } = useSelector((state: RootState) => state.Farm);
  const { colors } = useSelector((state: RootState) => state.Color);
  const { countries } = useSelector((state: RootState) => state.Country);
  const { displayCategories } = useSelector(
    (state: RootState) => state.DisplayCategory
  );

  useEffect(() => {
    dispatch(FetchAnimalsAsync());
    dispatch(FetchCategoriesAsync());
    dispatch(FetchColorsAsync());
    dispatch(FetchCountriesAsync());
    dispatch(FetchDisplayCategoriesAsync());
    dispatch(FetchParentsAsync());
    dispatch(FetchFarmsAsync());
  }, [dispatch]);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'المزرعة',
        dataIndex: 'farm',
        width: 200,
        render: (arr: any[]) => arr[0]['name:ar']
      },
      type: 'foreign-key',
      foreignKeyArr: farms.map(el => ({ title: el['name:ar'], value: el.id }))
    },
    {
      columnType: {
        title: 'الأب',
        dataIndex: 'father_id',
        width: 200,
        render: (id: string) => (
          <Typography.Text>
            { animals.find((el) => el.id === Number(id))?.animal_no}
          </Typography.Text>
        ),
      },
      type: 'foreign-key',
      required: false,
      getInitialValue: (val: string) =>
        animals.find((el) => el.id === Number(val))?.animal_no,
      foreignKeyArr: animals
        .filter((el) => el.gender === '0')
        .map((el) => ({
          value: el.animal_no,
          title: el.animal_no,
        })),
    },
    {
      columnType: {
        title: 'الأم',
        dataIndex: 'mother_id',
        width: 200,
        render: (id: string) => (
          <Typography.Text>
            { animals.find((el) => el.id === Number(id))?.animal_no}
          </Typography.Text>
        ),
      },
      type: 'foreign-key',
      required: false,
      getInitialValue: (val: string) =>
        animals.find((el) => el.id === Number(val))?.animal_no,
      foreignKeyArr: animals
        .filter((el) => el.gender === '1')
        .map((el) => ({
          value: el.animal_no,
          title: el.animal_no,
        })),
    },
    {
      columnType: {
        title: 'البلد',
        dataIndex: 'country_id',
        width: 200,
      },
      type: 'foreign-key',
      hidden: true,

      foreignKeyArr: countries.map((el) => ({
        value: el.id,
        title: en ? el['name:en'] : el['name:ar'],
      })),
    },
    {
      columnType: {
        title: 'البلد',
        dataIndex: 'country',
        width: 200,
      },
      type: 'text',
      trans: true,
      ignore: true,
    },
    {
      columnType: {
        title: 'اللون',
        dataIndex: 'color_id',
        width: 200,
      },
      type: 'foreign-key',
      hidden: true,
      foreignKeyArr: colors.map((el) => ({
        value: el.id,
        title: en ? el['name:en'] : el['name:ar'],
      })),
    },
    {
      columnType: {
        title: 'اللون',
        dataIndex: 'color',
        width: 200,
      },
      type: 'text',
      trans: true,
      ignore: true,
    },
    {
      columnType: {
        title: 'الصنف',
        dataIndex: 'category_id',
        width: 200,
      },
      type: 'foreign-key',
      customFormItem: (
        <Col span={12}>
          <Form.Item
            label='السلالة'
            name='category_id'
            rules={[{ required: true }]}
          >
            <CascederForm />
          </Form.Item>
        </Col>
      ),
      getInitialValue: () => undefined,
    },
    {
      columnType: {
        title: 'صنف العرض',
        dataIndex: 'display_category_id',
        width: 200,
      },
      type: 'foreign-key',
      foreignKeyArr: displayCategories.map((el) => ({
        value: el.id,
        title: en ? el['name:en'] : el['name:ar'],
      })),
      required: false
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={[...animals.map(el => ({ ...el, for_buy: Number(el.for_buy), is_dead: Number(el.is_dead), is_shown: Number(el.is_shown), approved: Number(el.approved), nfc: Number(el.nfc) }))]}
      loading={status === 'loading'}
      AddAsync={(el) => InsertAnimalAsync({ animal: el.item })}
      UpdateAsync={(el) => UpdateAnimalAsync({ id: el.id, animal: el.item })}
      DeleteAsync={(el) => DeleteAnimalAsync({ id: el.id })}
      itemsHeader={[...columnsAnimals, ...tmp]}
      Mapper={mapper}
    />
  );
};
export default ManageAnimals;

export const getServerSideProps: GetServerSideProps = Authenticated;
