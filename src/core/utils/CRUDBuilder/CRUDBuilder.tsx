import { Button, Form, notification, Popconfirm, Row, Table, Modal, Typography, DatePicker, Carousel, Image } from 'antd';
import { CheckSquareFilled, CloseSquareFilled, DeleteFilled, EditFilled, EditOutlined } from '@ant-design/icons';
import { ColumnsType, ColumnType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { MapIntoFormItems } from './MapIntoFormItems';
import { AppThunk } from '../../data-management/redux/store';
import { ItemType } from './types';
import { getColumnSearchProps } from './CustomComponent/searchProperties';
import useTranslation from 'next-translate/useTranslation';

const { Text, Paragraph } = Typography;

interface CRADBuilderProps {
  itemsHeader: ItemType[];
  items: any[];
  loading: boolean;
  lang?: 'ar' | 'en';
  AddAsync?: (req: { item: any }) => AppThunk;
  DeleteAsync?: (req: { id: number }) => AppThunk;
  UpdateAsync?: (eq: { id: number; item: any }) => AppThunk;
  Mapper?: (old: any) => any;
}

export const CRUDBuilder: React.FC<CRADBuilderProps> = ({
  AddAsync,
  DeleteAsync,
  UpdateAsync,
  Mapper,
  items,
  itemsHeader,
  lang,
  loading,
}) => {
  const { t } = useTranslation('crud-builder');

  const [columns, setColumns] = useState<ColumnsType<any>>();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [resultItems, setResultItems] = useState<any[]>([]);

  const [record_id, setrecord_id] = useState<number>();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    setTableHeader(lang);
  }, [resultItems, itemsHeader, lang]);

  //set search button for searchable fields
  const setTableHeader = (lang?: 'ar' | 'en') => {
    if (resultItems && resultItems.length > 0) {
      //work on trans and put a['key'] prop and search for searchable fields
      let res: ColumnsType<any> = [];
      itemsHeader.forEach((el, ind) => {
        if (!el.hidden) {
          const tmp = el.columnType.dataIndex!.toString();
          const dataindex = el.trans ? tmp + ':' + lang : tmp;
          let col: ColumnType<any> = {};
          switch (el.type) {
            case 'text':
            case 'number':
            case 'primary-key':
              col = {
                render: (val) => <Text>{val}</Text>,
                align: 'center',
                ...el.columnType,
                ...getColumnSearchProps(dataindex, t),
              };
              break;

            case 'text-area':
              col = {
                render: (val) => (
                  <Paragraph title={val} ellipsis={{ rows: 2 }}>
                    {val}
                  </Paragraph>
                ),
                align: 'center',
                ...el.columnType,
                ...getColumnSearchProps(dataindex, t),
              };
              break;

            case 'date':
              col = {
                render: (val) => <DatePicker value={moment(val)} inputReadOnly />,
                align: 'center',
                ...el.columnType,
              };
              break;

            case 'html-editor':
              col = {
                render: (val) => <div dangerouslySetInnerHTML={{ __html: val }} />,
                align: 'center',
                ...el.columnType,
                ...getColumnSearchProps(dataindex, t),
              };
              break;

            case 'image':
              col = {
                render: (val) => <Image src={val} alt='NOT_FOUND' style={{ width: 150, height: 150, objectFit: 'contain' }} />,
                align: 'center',
                ...el.columnType,
              };
              break;

            case 'multi-images':
              col = {
                render: (val: string[]) => (
                  <Carousel draggable>
                    {val.map((el) => (
                      <Image src={el} alt='NOT_FOUND' style={{ width: 150, height: 150, objectFit: 'cover' }} />
                    ))}
                  </Carousel>
                ),
                align: 'center',
                ...el.columnType,
              };
              break;

            case 'foreign-key-obj':
              col = {
                align: 'center',
                ...el.columnType,
              };
              break;

            case 'check-box':
              col = {
                align: 'center',
                render: (val: any) =>
                  Number(val) ? (
                    <CheckSquareFilled style={{ color: 'green', fontSize: 40 }} />
                  ) : (
                    <CloseSquareFilled style={{ color: '#c0392b', fontSize: 40 }} />
                  ),
                ...el.columnType,
              };
              break;

            case 'multi-foreign-key':
              col = {
                align: 'center',
                ...el.columnType,
              };
              break;

            default:
              col = {
                align: 'center',
                ...el.columnType,
              };
              break;
          }
          res.push({ ...col, dataIndex: dataindex, key: `TH${ind}` });
        }
      });

      //set initial values for edit form
      const displayModal = (id: number) => {
        if (resultItems && resultItems.length > 0) {
          setEditModalVisible(true);
          let item = resultItems.find((el) => el.id === id);
          let res = Object.assign({}, {} as any);
          itemsHeader.forEach((el) => {
            const from_dataIndex = el.initialValueDataIndex ?? el.columnType.dataIndex!.toString();
            const to_dataIndex = el.columnType.dataIndex!.toString();

            if (el.getInitialValue) res[to_dataIndex] = el.getInitialValue(item[from_dataIndex], res);
            else if (el.type === 'date') res[to_dataIndex] = moment(item[from_dataIndex]);
            else if (el.type === 'foreign-key-obj') res[to_dataIndex] = item[from_dataIndex].id;
            else if (el.type === 'foreign-key') res[to_dataIndex] = item[from_dataIndex];
            else if (el.type === 'multi-foreign-key') res[to_dataIndex] = item[from_dataIndex];
            else if (el.type === 'multi-foreign-key-obj')
              res[to_dataIndex] = (item[from_dataIndex] as { id: number }[]).map((el) => el.id);
            else if (el.type === 'multi-images')
              res[to_dataIndex] = (item[from_dataIndex] as string[]).map((el) => ({ uid: el, name: el, url: el }));
            else {
              if (el.trans) {
                res[to_dataIndex + ':ar'] = item[from_dataIndex + ':ar'];
                res[to_dataIndex + ':en'] = item[from_dataIndex + ':en'];
              } else res[to_dataIndex] = item[from_dataIndex];
            }
          });
          form.setFieldsValue(res);
        }
      };

      //edit and delete buttons
      (UpdateAsync || DeleteAsync) &&
        res.push({
          title: t`operations.header`,
          dataIndex: 'id',
          key: 'operations',
          fixed: 'right',
          width: 110,
          render: (id: number) => (
            <React.Fragment>
              {UpdateAsync ? (
                <Button
                  type='link'
                  onClick={() => {
                    setrecord_id(id);
                    displayModal(id);
                  }}
                  title={t`edit`}
                >
                  <EditFilled style={{ fontSize: 20 }} />
                </Button>
              ) : null}

              {DeleteAsync ? (
                <Popconfirm
                  onConfirm={() => {
                    dispatch(DeleteAsync({ id }));
                  }}
                  title={t`operations.delete-confirm`}
                >
                  <Button type='link'>
                    <DeleteFilled style={{ fontSize: 20, color: 'red' }} title={t`delete`} />
                  </Button>
                </Popconfirm>
              ) : null}
            </React.Fragment>
          ),
          align: 'center',
        });
      setColumns(res);
    }
  };

  //edit submeted
  const onFinishEdit = async (values: any) => {
    const tmp = items.find((el) => el.id === values.id);
    if (tmp) {
      if (UpdateAsync) {
        let item: any;
        if (Mapper) item = await Mapper(values);
        else item = values;
        dispatch(UpdateAsync({ item, id: values.id }));
        setEditModalVisible(false);
      }
    } else notification.error({ message: 'Error: Not Found' });
  };

  //add submeted
  const onFinishAdd = async (values: any) => {
    if (AddAsync) {
      let item: any;
      if (Mapper) item = await Mapper(values);
      else item = values;
      dispatch(AddAsync({ item }));
      setAddModalVisible(false);
    }
  };

  //assign a ['key'] prop for each element to remove key warning
  useEffect(() => {
    let res = items.map((el, ind) => {
      var tmp = Object.assign({}, el);
      tmp.key = ind;
      return tmp;
    });
    setResultItems(res);
  }, [items]);

  // add button
  const addButton = AddAsync
    ? () => <Button size='large' type='primary' onClick={() => setAddModalVisible(true)}>{t`add`}</Button>
    : undefined;

  //return :)
  return (
    <React.Fragment>
      <Table
        title={addButton}
        footer={addButton}
        bordered
        dataSource={resultItems}
        columns={columns}
        loading={loading}
        scroll={{ x: 1500 }}
        pagination={{ position: ['topRight', 'bottomRight'] }}
      />
      {AddAsync ? (
        <Modal
          width={800}
          footer={false}
          title={
            <React.Fragment>
              <EditOutlined />
              {`  `}
              {t`add`}
            </React.Fragment>
          }
          visible={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
        >
          <Form scrollToFirstError={true} name='Add' layout='vertical' onFinish={onFinishAdd}>
            <Row gutter={16}>
              <MapIntoFormItems itemsHeader={itemsHeader} />
            </Row>
            <Form.Item>
              <Button size='large' htmlType='submit' type='primary'>{t`add`}</Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}
      {UpdateAsync ? (
        <Modal
          width={800}
          footer={false}
          title={
            <React.Fragment>
              <EditOutlined />
              {`  `}
              {t`edit`}
            </React.Fragment>
          }
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
        >
          <Form scrollToFirstError={true} name='Edit' layout='vertical' form={form} onFinish={onFinishEdit}>
            <Row gutter={16}>
              <MapIntoFormItems form={form} itemsHeader={itemsHeader} resultItems={resultItems} record_id={record_id} />
            </Row>
            <Form.Item>
              <Button size='large' htmlType='submit' type='primary'>{t`edit`}</Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};
