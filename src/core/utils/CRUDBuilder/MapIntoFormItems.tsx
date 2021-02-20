import { Form, Checkbox, Input, InputNumber, DatePicker, Select, Col, Modal } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useEffect, useState } from 'react';
import { FormInstance } from 'antd/lib/form';
import { ItemType } from './types';

// import HTMLEditor from './CustomComponent/HTMLEditor';
import { CustomUpload, CustomMultiImageUpload, HtmlEditor } from './CustomComponent';
import { DATE_FORMAT } from '../../constants/keys';
import { FileToBase64 } from '../helpers';

const { Option } = Select;


export const MapIntoFormItems: React.FC<{
  multiImageUrl?: { add: string, delete: string };
  itemsHeader: ItemType[];
  form?: FormInstance;
  allDisabled?: true;
  type?: 'insert' | 'update' | 'show'
}> = ({ itemsHeader, form, allDisabled, type = 'show' }) => {
  const [result, setResult] = useState<any[]>([]);
  const [preview, setPreview] = useState<{ previewVisible: boolean, previewImage?: string, previewTitle?: string }>({ previewVisible: false, previewImage: '', previewTitle: '' }
  )

  useEffect(() => {

    //give it itemType return a form.item
    const formItem = (el: ItemType, key: string, localKey = '') => {
      const dataIndex = el.columnType.dataIndex + "" + localKey;
      const label = el.columnType.title + "" + localKey;
      const required = el.required ?? true;

      if (el.ignore) {
        if (el.ignore === true)
          return undefined;
        if ('insert' in el.ignore && type === 'insert')
          return undefined;
        if ('update' in el.ignore && type === 'update')
          return undefined;
      }

      switch (el.type) {

        case 'primary-key':
          return <Col span={24}><Form.Item key={key} label={label} name={dataIndex}><InputNumber disabled style={{ width: '100%' }} /></Form.Item></Col>

        case 'select':
        case 'foreign-key':
        case 'foreign-key-obj':
          return <Col span={12}><Form.Item key={key} label={label} name={dataIndex} rules={[{ required }]}><Select disabled={allDisabled} style={{ width: '100%' }} allowClear>{el.foreignKeyArr && el.foreignKeyArr.map((el) => (<Option key={el.value} value={el.value}>{el.title}</Option>))}</Select></Form.Item></Col>

        case 'multi-foreign-key':
        case 'multi-foreign-key-obj':
          return <Col span={12}><Form.Item key={key} label={label} name={dataIndex} rules={[{ required }]}><Select disabled={allDisabled} style={{ width: '100%' }} mode='multiple' allowClear>{el.foreignKeyArr && el.foreignKeyArr.map((el) => (<Option key={el.value} value={el.value}>{el.title}</Option>))}</Select></Form.Item></Col>

        case 'number':
          return <Col span={12}><Form.Item key={key} label={label} name={dataIndex} rules={[{ required }, { type: 'number' }]}><InputNumber disabled={allDisabled} style={{ width: '100%' }} /></Form.Item></Col>

        case 'text':
          return <Col span={12}><Form.Item key={key} label={label} name={dataIndex} rules={[{ required }]}><Input disabled={allDisabled} /></Form.Item></Col>

        case 'text-area':
          return <Col span={24}><Form.Item key={key} label={label} name={dataIndex} rules={[{ required }]}><Input.TextArea disabled={allDisabled} /></Form.Item></Col>

        case 'image':
          return <Col span={12}><Form.Item key={key} label={label} name={dataIndex} rules={[{ required }]}><CustomUpload disabled={allDisabled} /></Form.Item></Col>

        case 'multi-images':
          return <Col span={24}><Form.Item key={key} label={label} name={dataIndex} rules={[{ required }]}>
            <CustomMultiImageUpload onPreview={handlePreview} disabled={allDisabled} />
          </Form.Item></Col>

        case 'date':
          return <Col span={12}><Form.Item key={key} label={label} name={dataIndex} rules={[{ required }]} ><DatePicker disabled={allDisabled} format={DATE_FORMAT} style={{ width: '100%' }} /></Form.Item></Col>

        case 'check-box':
          return <Col span={12}><Form.Item key={key} label={undefined} name={dataIndex} rules={[{ required }]} valuePropName="checked"><Checkbox disabled={allDisabled} >{label}</Checkbox ></Form.Item></Col>

        case 'dynamic-list':
          return <Col span={24}><Form.List key={key} name={dataIndex}>{el.dynamicListGenerator!}</Form.List></Col>

        case 'html-editor':
          return <Col span={24}><Form.Item key={key} label={label} name={dataIndex} rules={[{ required }]}><HtmlEditor disable={allDisabled} /></Form.Item></Col>

        default:
          return undefined;
      }
    }

    let res: React.ReactNode[] = itemsHeader.map((el, ind) => {
      if (el.customFormItem) {
        if ('insert' in el.customFormItem && type === 'insert')
          return el.customFormItem
        if ('update' in el.customFormItem && type === 'update')
          return el.customFormItem
        else
          return el.customFormItem
      }

      if (el.trans)
        return <>{formItem(el, `FI${ind}AR`, ':ar')}{formItem(el, `FI${ind}EN`, ':en')}</>

      return formItem(el, `FI${ind}`)
    });
    setResult(res);
  }, [allDisabled, form, itemsHeader]);

  const handlePreview = async (file: UploadFile<any>) => {
    if (!file.url && !file.preview) {
      file.preview = await FileToBase64(file.originFileObj);
    }

    setPreview({
      previewImage: file.url ?? file.preview,
      previewVisible: true,
      previewTitle: file.name ?? file.url?.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  return <>
    {result}
    <Modal
      visible={preview.previewVisible}
      title={preview.previewTitle}
      footer={null}
      onCancel={() => setPreview({ ...preview, previewVisible: false })}
    >
      <img alt="example" style={{ width: '100%' }} src={preview.previewImage} />
    </Modal>
  </>;
};
