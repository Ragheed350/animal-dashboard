import { PlusOutlined } from '@ant-design/icons';
import { Space, Typography, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { useEffect, useState } from 'react';


const filesToArray = (files: UploadFile<any>[]): (string | File | Blob)[] => {
    let result: (string | File | Blob)[] = [];
    files.forEach(async el => {
        if (el.originFileObj)
            result.push(el.originFileObj)
        else result.push(el.url!)
    })
    return result
}

const uploadButton = (
    <Space direction='vertical' size='small'>
        <PlusOutlined />
        <Typography.Text>Upload</Typography.Text>
    </Space>
);


interface Props {
    value?: UploadFile<any>[];
    onChange?: (value: string) => void;
    disabled?: boolean;
    onPreview?: (file: UploadFile<any>) => void
}

export const CustomMultiImageUpload: React.FC<Props> = ({ onChange, value, disabled, onPreview }) => {

    const [files, setFiles] = useState<UploadFile<any>[]>(value!)

    useEffect(() => {
        if (value) {
            setFiles(value)
            triggerChange(filesToArray(value))
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const triggerChange = (changedValue: any) => {
        if (onChange) onChange(changedValue);
    };

    const onFileChange = async (values: UploadChangeParam<UploadFile<any>>) => {
        setFiles(values.fileList);
        let result = await filesToArray(values.fileList);
        triggerChange(result);
    }

    return (
        <Upload defaultFileList={files} disabled={disabled} listType="picture-card" onPreview={onPreview} onChange={onFileChange} beforeUpload={() => false}>
            {uploadButton}
        </Upload>
    )
}