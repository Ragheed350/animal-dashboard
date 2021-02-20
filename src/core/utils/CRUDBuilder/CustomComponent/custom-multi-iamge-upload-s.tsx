import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Space, Typography, Upload } from 'antd';

import { FileToBase64 } from '../../helpers';


const filesToArray = async (files: UploadFile<any>[]): Promise<string[]> => {

    let result: string[] = [];

    await files.forEach(async el => {
        if (el.lastModified)
            result.push(await FileToBase64(el.originFileObj as RcFile))
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

export const CustomMultiImageUpload_S: React.FC<Props> = ({ onChange, value, disabled, onPreview }) => {

    const [files, setFiles] = useState<UploadFile<any>[]>(value!)

    useEffect(() => {
        if (value) {
            console.log(value);
            setFiles(value)
            filesToArray(value as any).then(res => {
                triggerChange(res)
            })
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