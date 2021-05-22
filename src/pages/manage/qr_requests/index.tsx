import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { Button, Col, Image, Modal, Popconfirm, Row } from 'antd';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchQR_RequestsAsync,
  DeleteQR_RequestAsync,
  FetchAnimalsAsync,
  FetchUsersAsync,
  Animal,
  PrintQRAsync,
} from '@core';
import { CheckSquareFilled, CloseSquareFilled } from '@ant-design/icons';

const ManageQR_Requests: FC = () => {
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.Users);
  const { animals, status: animals_status } = useSelector((state: RootState) => state.Animal);
  const { status, qr_requests } = useSelector((state: RootState) => state.QR_Request);

  const [visible, setvisible] = useState(false);
  const [preview, setpreview] = useState('');

  useEffect(() => {
    dispatch(FetchAnimalsAsync());
    dispatch(FetchUsersAsync());
    dispatch(FetchQR_RequestsAsync());
  }, [dispatch]);

  const columnsQR_Requests: ItemType[] = [
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
        title: t`user`,
        dataIndex: 'user_id',
        width: 'auto',
        render: (id: string) =>
          en ? users.find((el) => el.id === Number(id))?.['name:en'] : users.find((el) => el.id === Number(id))?.['name:ar'],
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`address`,
        dataIndex: 'user_id',
        width: 'auto',
        render: (id: string) =>
          en
            ? users.find((el) => el.id === Number(id))?.['address:en']
            : users.find((el) => el.id === Number(id))?.['address:ar'],
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`email`,
        dataIndex: 'user_id',
        width: 'auto',
        render: (id: string) => users.find((el) => el.id === Number(id))?.email,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`phone`,
        dataIndex: 'user_id',
        width: 'auto',
        render: (id: string) => users.find((el) => el.id === Number(id))?.phone,
      },
      type: 'text',
    },
    {
      columnType: {
        title: t`animal_no`,
        dataIndex: 'animal_id',
        width: 'auto',
        render: (id: string) => animals.find((el) => el.id === Number(id))?.animal_no,
      },
      ignore: true,
      type: 'text',
    },
    {
      columnType: {
        title: t`image`,
        dataIndex: 'animal_id',
        width: 'auto',
        render: (id: string) => <Image src={animals.find((el) => el.id === Number(id))?.attachments[0].url} />,
      },
      ignore: true,
      type: 'foreign-key-obj',
    },
    {
      columnType: {
        title: t`approved`,
        dataIndex: 'animal_id',
        width: 'auto',
        render: (id: string) =>
          animals.find((el) => el.id === Number(id))?.approved === 1 ? (
            <CheckSquareFilled style={{ fontSize: '3em', color: 'green' }} />
          ) : (
            <CloseSquareFilled style={{ fontSize: '3em', color: '#e60f00' }} />
          ),
      },
      ignore: true,
      type: 'check-box',
    },
    {
      columnType: {
        title: t`image`,
        dataIndex: 'animal_id',
        width: 'auto',
        // render: (id: string) => <Image src={animals.find((el) => el.id === Number(id))?.qr_image} />,
        render: (id: string) => (
          <Button
            size='large'
            type='dashed'
            onClick={() => {
              setpreview(animals.find((el) => el.id === Number(id))?.qr_image!);
              setvisible(true);
            }}
          >
            {t`show`}
          </Button>
        ),
      },
      ignore: true,
      type: 'foreign-key-obj',
    },
    {
      columnType: {
        title: t`is_printed`,
        dataIndex: 'is_printed',
        width: 'auto',
        render: (val: '1' | '0', { id }: Animal) =>
          Number(val) === 0 ? (
            <Popconfirm onConfirm={() => dispatch(PrintQRAsync(id))} title={t`print_qr_sure`}>
              <Button type='primary' size='large'>
                {t`print`}
              </Button>
            </Popconfirm>
          ) : (
            <Button type='primary' size='large' ghost>
              {t`printed`}
            </Button>
          ),
        filters: [
          { text: t`printed`, value: '1' },
          { text: t`not_printed`, value: '0' },
        ],
        onFilter: (value, record) => record.is_printed === value,
        ellipsis: true,
      },
      type: 'check-box',
    },
  ];

  return (
    <>
      <CRUDBuilder
        lang={lang === 'en' ? 'en' : 'ar'}
        items={qr_requests}
        loading={status === 'loading' || animals_status === 'loading'}
        DeleteAsync={(el) => DeleteQR_RequestAsync({ id: el.id })}
        itemsHeader={[...columnsQR_Requests]}
      />
      <Modal visible={visible} footer={null} onCancel={() => setvisible(false)}>
        <Row justify='space-around' align='middle'>
          <Col>
            <img src={preview} id='img' />
          </Col>
          <Col>
            <a href={preview} target='_blank' download>
              <Button size='large'>{'Download'}</Button>
            </a>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ManageQR_Requests;

export const getServerSideProps: GetServerSideProps = Authenticated;
