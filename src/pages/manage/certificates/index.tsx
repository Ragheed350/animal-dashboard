import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
  CRUDBuilder,
  ItemType,
  RootState,
  Authenticated,
  FetchCertificatesAsync,
  DeleteCertificateAsync,
  InsertCertificateAsync,
  UpdateCertificateAsync,
  FetchAnimalsAsync,
} from '@core';
import { Col, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const mapper = (req: any): any => {
  const formData = new FormData();
  formData.append('_method', 'put');
  for (const key in req) {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      const el = req[key];
      if (key === 'pdf') {
        formData.append(key, el.file.originFileObj);
      } else formData.append(key, el);
    }
  }

  return formData;
};

const pdf_props = {
  name: 'file',
  accept: '.pdf',
  // onChange(info: any) {
  //   const { status } = info.file;
  //   if (status !== 'uploading') {
  //     return info.file.originFileObj;
  //   }
  //   if (status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
};

export const columnsCertificates: ItemType[] = [
  {
    columnType: {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    type: 'primary-key',
  },
  {
    columnType: {
      title: 'Title',
      dataIndex: 'title',
      width: 'auto',
    },
    type: 'text',
  },
];

const ManageCertificates: FC = () => {
  const { lang } = useTranslation();
  const en = lang === 'en';
  const dispatch = useDispatch();

  const { status, certificates } = useSelector(
    (state: RootState) => state.Certificate
  );
  const { animals } = useSelector((state: RootState) => state.Animal);

  useEffect(() => {
    dispatch(FetchAnimalsAsync());
    dispatch(FetchCertificatesAsync());
  }, [dispatch]);

  const tmp: ItemType[] = [
    {
      columnType: {
        title: 'Animal',
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
        title: 'Certificate',
        dataIndex: 'url',
        width: 'auto',
      },
      type: 'text',
      customFormItem: (
        <Col span={24}>
          <Form.Item
            valuePropName={'file'}
            label='Certificate'
            name='pdf'
            rules={[{ required: true }]}
          >
            <Dragger {...pdf_props}>
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </Form.Item>
        </Col>
      ),
    },
  ];

  return (
    <CRUDBuilder
      lang={lang === 'en' ? 'en' : 'ar'}
      items={certificates}
      loading={status === 'loading'}
      AddAsync={(el) => InsertCertificateAsync({ certificate: el.item })}
      UpdateAsync={(el) =>
        UpdateCertificateAsync({ id: el.id, certificate: el.item })
      }
      DeleteAsync={(el) => DeleteCertificateAsync({ id: el.id })}
      itemsHeader={[...columnsCertificates, ...tmp]}
      Mapper={mapper}
    />
  );
};
export default ManageCertificates;

export const getServerSideProps: GetServerSideProps = Authenticated;
