import { UploadFile } from "antd/es/upload/interface";
import { Typography, Space, Upload, Image } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FileToBase64 } from '../../helpers';

interface UploadProps {
    value?: UploadFile;
    onChange?: (value: UploadFile) => void;
    disabled?: boolean;
    width?: string;
    height?: string;
}

export const CustomUploadFile: React.FC<UploadProps> = ({ onChange, value, disabled, height = '300px', width = '100%' }) => {

    const [preview, setPreview] = useState<string | undefined>()
    useEffect(() => {
        setPreview(value?.preview)
    }, [value])

    const uploadButton = (
        <Space direction='vertical' size='small'>
            <PlusOutlined />
            <Typography.Text>Upload</Typography.Text>
        </Space>
    );

    return (
        <Upload
            disabled={disabled}
            className='avatar-uploader'
            // css={{
            //     '& > .ant-upload': {
            //         width,
            //         height
            //     }
            // }}
            listType="picture-card"
            showUploadList={false}
            onChange={(newFile) => {
                FileToBase64(newFile.file as any).then(res => setPreview(res));
                onChange && onChange(newFile.file)

            }}
            beforeUpload={() => false}
        >
            {
                value && preview ? (
                    <Image
                        preview={false}
                        src={preview}
                        height={height}
                        width={width}
                        alt="Avatar"
                        style={{ objectFit: 'contain' }}
                    />
                ) : (
                    uploadButton
                )
            }
        </Upload >
    )
}