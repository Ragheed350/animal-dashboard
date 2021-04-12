import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { ColumnsType } from 'antd/lib/table';

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
  Weight,
  AnimalFarm,
  Farm,
  FetchLevel3Async,
  Animal,
  DeathAnimalAsync,
  Animal_Death_Req,
} from '@core';
import { Button, Carousel, Col, DatePicker, Form, Image, Input, InputNumber, Modal, Typography } from 'antd';
import CascederForm from 'src/components/CascederFrom';
import { UploadFile } from 'antd/lib/upload/interface';

const mapper = (req: any): any => {
  const formData = new FormData();

  let result: (string | File | Blob)[] = [];
  req.image.forEach((el: UploadFile) => {
    if (el.originFileObj) result.push(el.originFileObj);
    else result.push(el.url!);
  });

  req.image = result;

  for (const key in req) {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      const el = req[key];
      if (key === 'birth_date' || key === 'dead_date') formData.append(key, (el as moment.Moment).format(DATE_FORMAT));
      else if (key === 'image') {
        (el as (File | string)[]).forEach((element) => {
          if (typeof element === 'string') {
            const arr = element.split('/');
            formData.append(key + '[]', `${arr[arr.length - 2]}/${arr[arr.length - 1]}`);
          } else formData.append(key + '[]', element);
        });
      } else if (['for_buy', 'is_shown', 'approved', 'is_dead'].includes(key))
        formData.append(key, (el as boolean | undefined) ? '1' : '0');
      else if (req[key] === undefined) delete req.key;
      else formData.append(key, el);
    }
  }

  return formData;
};

const ManageAnimals: FC = () => {
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, animals } = useSelector((state: RootState) => state.Animal);
  const { farms } = useSelector((state: RootState) => state.Farm);
  const { colors } = useSelector((state: RootState) => state.Color);
  const { countries } = useSelector((state: RootState) => state.Country);
  const { displayCategories } = useSelector((state: RootState) => state.DisplayCategory);
  const { level3 } = useSelector((state: RootState) => state.Category);

  const [modal, setmodal] = useState<number | undefined>();

  useEffect(() => {
    dispatch(FetchAnimalsAsync());
    dispatch(FetchCategoriesAsync());
    dispatch(FetchColorsAsync());
    dispatch(FetchCountriesAsync());
    dispatch(FetchDisplayCategoriesAsync());
    dispatch(FetchParentsAsync());
    dispatch(FetchFarmsAsync());
    dispatch(FetchLevel3Async());
  }, [dispatch]);

  const columnsAnimals: ItemType[] = [
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
        title: t`animal_no`,
        dataIndex: 'animal_no',
        width: 200,
      },
      type: 'text',
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
        title: t`birth_day`,
        dataIndex: 'birth_date',
        width: 200,
      },
      type: 'date',
    },
    {
      columnType: {
        title: t`gender`,
        dataIndex: 'gender',
        width: 200,
        render: (val: '0' | '1') => <Typography.Text>{val === '1' ? 'ذكر' : 'أنثى'}</Typography.Text>,
      },
      type: 'select',
      foreignKeyArr: [
        { title: 'ذكر', value: '0' },
        { title: 'أنثى', value: '1' },
      ],
    },
    {
      columnType: {
        title: t`for_buy`,
        dataIndex: 'for_buy',
        width: 200,
      },
      type: 'check-box',
      required: false,
    },
    {
      columnType: {
        title: t`price`,
        dataIndex: 'price',
        width: 200,
      },
      type: 'text',
      ignore: true,
    },
    {
      columnType: {
        title: t`buyer_data`,
        dataIndex: 'puyer_data',
        width: 200,
      },
      type: 'text',
      ignore: true,
    },
    {
      columnType: {
        title: t`for_show`,
        dataIndex: 'is_shown',
        width: 200,
      },
      type: 'check-box',
      required: false,
    },
    {
      columnType: {
        title: t`code`,
        dataIndex: 'qr',
        width: 200,
      },
      type: 'text',
      ignore: true,
    },
    {
      columnType: {
        title: t`code_image`,
        dataIndex: 'qr_image',
        width: 200,
      },
      type: 'image',
      ignore: true,
    },

    {
      columnType: {
        title: t`approverd`,
        dataIndex: 'approved',
        width: 200,
      },
      type: 'check-box',
      ignore: true,
    },
    {
      columnType: {
        title: t`microship`,
        dataIndex: 'nfc',
        width: 200,
      },
      type: 'number',
      required: true,
      customFormItem: (
        <Col span={12}>
          <Form.Item
            label='nfc'
            name='nfc'
            rules={[
              { type: 'number' },
              () => ({
                validator(_, value) {
                  console.log(value, value.toString().length);
                  if (value && value.toString().length === 15) {
                    return Promise.resolve();
                  }
                  return Promise.reject('nfc number should be 15 character');
                },
              }),
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      ),
    },
    {
      columnType: {
        title: t`microship_location`,
        dataIndex: 'nfc_location',
        width: 200,
      },
      type: 'text',
      required: false,
    },
    {
      columnType: {
        title: t`attachments`,
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
        title: t`evaluation`,
        dataIndex: 'rate',
        width: 200,
      },
      type: 'number',
      ignore: true,
    },
    {
      columnType: {
        title: t`age`,
        dataIndex: 'age',
        width: 200,
      },
      type: 'number',
      ignore: true,
    },
    {
      columnType: {
        title: t`weight`,
        dataIndex: 'weight',
        width: 200,
      },
      type: 'number',
      hidden: true,
      initialValueDataIndex: 'Weight',
      getInitialValue: (val: Weight[]) => Number(val[val.length - 1]?.value),
    },
    {
      columnType: {
        title: t`weight`,
        dataIndex: 'Weight',
        width: 200,
        render: (val: Weight[]) => Number(val[val.length - 1]?.value),
      },
      type: 'number',
      ignore: true,
    },
    {
      columnType: {
        title: t`image`,
        dataIndex: 'image',
        width: 200,
      },
      type: 'multi-images',
      hidden: true,
      initialValueDataIndex: 'attachments',
      getInitialValue: (val: Attachment[]) => val.map((el) => ({ uid: el.id, name: el.url, url: el.url })),
    },
    {
      columnType: {
        title: t`purchasing_price`,
        dataIndex: 'purchasing_price',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`seller_name`,
        dataIndex: 'seller_name',
        width: 200,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`dead_date`,
        dataIndex: 'dead_date',
        width: 200,
      },
      type: 'date',
    },
    {
      columnType: {
        title: t`dead_reason`,
        dataIndex: 'dead_reason',
        width: 200,
      },
      type: 'text',
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`farm`,
        dataIndex: 'farm',
        width: 200,
        render: (farm: AnimalFarm[]) => farm[0]['name:ar']!,
      },
      type: 'foreign-key',
      initialValueDataIndex: 'farm',
      getInitialValue: (val: Farm[]) => val[val.length - 1]?.['name:ar'],
      foreignKeyArr: farms.map((farm: Farm) => ({ value: farm.id, title: farm['name:ar'] })),
    },
    {
      columnType: {
        title: t`father`,
        dataIndex: 'father_id',
        width: 200,
        render: (id: string) => (
          <Typography.Text>{animals.find((el) => el.id === Number(id))?.animal_no}</Typography.Text>
        ),
      },
      type: 'foreign-key',
      required: false,
      getInitialValue: (val: string) => animals.find((el) => el.id === Number(val))?.animal_no,
      foreignKeyArr: animals
        .filter((el) => el.gender === '0')
        .map((el) => ({
          value: el.animal_no,
          title: el.animal_no,
        })),
    },
    {
      columnType: {
        title: t`mother`,
        dataIndex: 'mother_id',
        width: 200,
        render: (id: string) => (
          <Typography.Text>{animals.find((el) => el.id === Number(id))?.animal_no}</Typography.Text>
        ),
      },
      type: 'foreign-key',
      required: false,
      getInitialValue: (val: string) => animals.find((el) => el.id === Number(val))?.animal_no,
      foreignKeyArr: animals
        .filter((el) => el.gender === '1')
        .map((el) => ({
          value: el.animal_no,
          title: el.animal_no,
        })),
    },
    {
      columnType: {
        title: t`country`,
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
        title: t`country`,
        dataIndex: 'country',
        width: 200,
      },
      type: 'text',
      trans: true,
      ignore: true,
    },
    {
      columnType: {
        title: t`color`,
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
        title: t`color`,
        dataIndex: 'color',
        width: 200,
      },

      type: 'text',
      trans: true,
      ignore: true,
    },
    {
      columnType: {
        title: t`strain`,
        dataIndex: 'category_id',
        width: 200,
        render: (id: string) => level3.find((el) => el.id.toString() === id)?.['name:ar'],
      },
      type: 'foreign-key',
      customFormItem: (
        <Col span={12}>
          <Form.Item label='السلالة' name='category_id' rules={[{ required: true }]}>
            <CascederForm />
          </Form.Item>
        </Col>
      ),
    },
    {
      columnType: {
        title: t`display_category`,
        dataIndex: 'display_category_id',
        width: 200,
      },
      type: 'foreign-key',
      foreignKeyArr: displayCategories.map((el) => ({
        value: el.id,
        title: en ? el['name:en'] : el['name:ar'],
      })),
      required: false,
    },
  ];

  const tmp1: ItemType[] = [
    {
      columnType: {
        title: t`dead`,
        dataIndex: 'is_dead',
        width: 200,
        render: (val: 1 | 0, { id }: Animal) =>
          val === 1 ? (
            <Button type='primary' size='large' ghost>
              {t`dead`}
            </Button>
          ) : (
            <Button onClick={() => setmodal(id)} type='primary' size='large'>
              {t`alive`}
            </Button>
          ),
      },
      type: 'number',
      ignore: true,
    },
  ];

  const [form] = Form.useForm();
  const death_animal = (
    <Modal
      title='Basic Modal'
      visible={Boolean(modal)}
      onCancel={() => setmodal(undefined)}
      onOk={() => {
        form
          .validateFields()
          .then((values: Animal_Death_Req) => {
            form.resetFields();
            dispatch(
              DeathAnimalAsync({
                id: Number(modal!),
                dead_date: (values.dead_date as any).format(DATE_FORMAT),
                dead_reason: values.dead_reason,
              })
            );
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
        setmodal(undefined);
      }}
    >
      <Form form={form} layout='vertical' name='form_in_modal' initialValues={{ modifier: 'public' }}>
        <Form.Item
          name='dead_reason'
          label='Dead reason'
          rules={[{ required: true, message: 'This filed is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='dead_date' label='Dead date' rules={[{ required: true, message: 'This filed is required' }]}>
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <>
      {death_animal}
      <CRUDBuilder
        lang={lang === 'en' ? 'en' : 'ar'}
        items={[
          ...animals.map((el) => ({
            ...el,
            for_buy: Number(el.for_buy),
            is_dead: Number(el.is_dead),
            is_shown: Number(el.is_shown),
            approved: Number(el.approved),
            nfc: Number(el.nfc),
          })),
        ]}
        loading={status === 'loading'}
        AddAsync={(el) => InsertAnimalAsync({ animal: el.item })}
        UpdateAsync={(el) => UpdateAnimalAsync({ id: el.id, animal: el.item })}
        DeleteAsync={(el) => DeleteAnimalAsync({ id: el.id })}
        itemsHeader={[...columnsAnimals, ...tmp, ...tmp1]}
        Mapper={mapper}
      />
    </>
  );
};
export default ManageAnimals;

export const getServerSideProps: GetServerSideProps = Authenticated;
