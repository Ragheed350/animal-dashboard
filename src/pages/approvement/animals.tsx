import React, { useEffect, useState } from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import {
  Animal,
  AnimalFarm,
  ApproveAnimalAsync,
  Attachment,
  Authenticated,
  FetchAnimalsAsync,
  FetchLevel3Async,
  Gender,
  RootState,
  UnApproveAnimalAsync,
  Weight,
} from '@core';
import { ColumnsType } from 'antd/lib/table';
import { FilterValue } from 'antd/lib/table/interface';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { Button, Carousel, Popconfirm, Table, Image } from 'antd';

const index: React.FC = () => {
  const dispatch = useDispatch();
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';

  const { animals, status } = useSelector((state: RootState) => state.Animal);
  const { level3 } = useSelector((state: RootState) => state.Category);

  const [filterInfo, setFilterInfo] = useState<Record<string, FilterValue | null>>();

  const colums: ColumnsType<Animal> = [
    {
      title: t`id`,
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: t`name`,
      dataIndex: en ? 'name:en' : 'name:ar',
      width: 200,
    },
    {
      title: t`animal_no`,
      dataIndex: 'animal_no',
      width: 200,
    },
    {
      title: t`birth_day`,
      dataIndex: 'birth_date',
      width: 200,
    },
    {
      title: t`gender`,
      dataIndex: 'gender',
      width: 200,
      render: (val: Gender) => (!en ? (val === Gender.male ? 'ذكر' : 'انثى') : val === Gender.male ? 'male' : 'female'),
    },
    {
      title: t`for_buy`,
      dataIndex: 'for_buy',
      width: 200,
    },
    {
      title: t`price`,
      dataIndex: 'price',
      width: 200,
    },
    {
      title: t`buyer_data`,
      dataIndex: 'puyer_data',
      width: 200,
    },
    {
      title: t`code`,
      dataIndex: 'qr',
      width: 200,
    },
    {
      title: t`code_image`,
      dataIndex: 'qr_image',
      width: 200,
    },
    {
      title: t`approverd`,
      dataIndex: 'approved',
      width: 200,
    },
    {
      title: t`microship`,
      dataIndex: 'nfc',
      width: 200,
    },
    {
      title: t`microship_location`,
      dataIndex: 'nfc_location',
      width: 200,
    },
    {
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
    {
      title: t`evaluation`,
      dataIndex: 'rate',
      width: 200,
    },
    {
      title: t`age`,
      dataIndex: 'age',
      width: 200,
    },
    {
      title: t`weight`,
      dataIndex: 'Weight',
      width: 200,
      render: (val: Weight[]) => Number(val[val.length - 1]?.value),
    },
    {
      title: t`image`,
      dataIndex: 'image',
      width: 200,
    },
    {
      title: t`purchasing_price`,
      dataIndex: 'purchasing_price',
      width: 200,
    },
    {
      title: t`seller_name`,
      dataIndex: 'seller_name',
      width: 200,
    },
    {
      title: t`dead_date`,
      dataIndex: 'dead_date',
      width: 200,
    },
    {
      title: t`dead_reason`,
      dataIndex: 'dead_reason',
      width: 200,
    },
    {
      title: t`farm`,
      dataIndex: 'farm',
      width: 200,
      render: (farm: AnimalFarm[]) => farm[0]['name:ar']!,
    },
    {
      title: t`father`,
      dataIndex: 'father_id',
      width: 200,
      render: (id: string) => animals.find((el) => el.id === Number(id))?.animal_no,
    },
    {
      title: t`mother`,
      dataIndex: 'mother_id',
      width: 200,
      render: (id: string) => animals.find((el) => el.id === Number(id))?.animal_no,
    },
    {
      title: t`country`,
      dataIndex: 'country',
      width: 200,
    },
    {
      title: t`country`,
      dataIndex: 'country_id',
      width: 200,
    },
    {
      title: t`color`,
      dataIndex: 'color_id',
      width: 200,
    },
    {
      title: t`strain`,
      dataIndex: 'category_id',
      width: 200,
      render: (id: string) => level3.find((el) => el.id.toString() === id)?.['name:ar'],
    },
    {
      title: t`approved`,
      dataIndex: 'approved',
      width: 200,
      render: (val: '1' | '0') =>
        Number(val) === 1 ? (
          <CheckCircleFilled style={{ fontSize: '3rem', color: 'green' }} />
        ) : (
          <CloseCircleFilled style={{ fontSize: '3rem', color: 'red' }} />
        ),

      filters: [
        { text: en ? 'approved' : 'الموافق عليه', value: '1' },
        { text: en ? 'unapproved' : 'غير الموافق عليه', value: '0' },
      ],
      filteredValue: filterInfo && filterInfo.approved,
      onFilter: (value, record) => record.approved === Number(value),
      ellipsis: true,
    },
  ];

  useEffect(() => {
    dispatch(FetchAnimalsAsync());
    dispatch(FetchLevel3Async());
  }, []);

  const tmp: ColumnsType<any> = [
    {
      title: t`operations`,
      dataIndex: 'approved',
      key: '123123',
      width: 200,
      render: (val: '1' | '0', { id, farm }: Animal) =>
        Number(val) === 1 ? (
          <Popconfirm onConfirm={() => dispatch(UnApproveAnimalAsync({ id }))} title={t`unapproved_ru_sure`}>
            <Button type='primary' size='large' ghost danger>
              {t`unapproved`}
            </Button>
          </Popconfirm>
        ) : (
          <Popconfirm
            onConfirm={() => dispatch(ApproveAnimalAsync({ id, user_id: Number(farm[0].farm_id) }))}
            title={t`approved_ru_sure`}
          >
            <Button type='primary' size='large'>
              {t`approve`}
            </Button>
          </Popconfirm>
        ),
    },
  ];
  return (
    <Table
      bordered
      loading={status === 'loading'}
      dataSource={[...animals.map((el) => ({ ...el, approved: Number(el.approved) }))]}
      columns={[...colums, ...tmp]}
      onChange={(pagination, filters) => {
        console.log('Various parameters', { pagination, filters });
        setFilterInfo(filters);
      }}
    ></Table>
  );
};

export default index;

export const getServerSideProps = Authenticated;
