import { PlusOutlined } from '@ant-design/icons';
import { Space, Typography, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React from 'react';


// const filesToArray = (files: UploadFile<any>[]): (string | File | Blob)[] => {
//     let result: (string | File | Blob)[] = [];
//     files.forEach(async el => {
//         if (el.originFileObj)
//             result.push(el.originFileObj)
//         else result.push(el.url!)
//     })
//     return result
// }

const uploadButton = (
    <Space direction='vertical' size='small'>
        <PlusOutlined />
        <Typography.Text>Upload</Typography.Text>
    </Space>
);


interface Props {
    value?: UploadFile[];
    onChange?: (value: UploadFile<any>[]) => void;
    disabled?: boolean;
    onPreview?: (file: UploadFile<any>) => void
}

export const CustomMultiImageUpload: React.FC<Props> = ({ onChange, value, disabled, onPreview }) => {
    const onFileChange = async (values: UploadChangeParam<UploadFile>) => {
        onChange && onChange(values.fileList);
    }

    return (
        <Upload fileList={value} disabled={disabled} listType="picture-card" onPreview={onPreview} onChange={onFileChange} beforeUpload={() => false}>
            {uploadButton}
        </Upload>
    )
}