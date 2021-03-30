import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { Typography, Space, Upload, Image } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FileToBase64 } from "@utils";

interface UploadProps {
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    width?: string;
    height?: string;
}

export const CustomUploadBase64: React.FC<UploadProps> = ({ onChange, value, disabled, height = '300px', width = '100%' }) => {

    const onFileChange = async (newFile: UploadChangeParam<UploadFile>) => {
        let res = await FileToBase64(newFile.file as any)
        onChange && onChange(res);
    }

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
            onChange={onFileChange}
            beforeUpload={() => false}
        >
            {value ? (
                <Image
                    preview={false}
                    src={value}
                    height={height}
                    width={width}
                    alt="Avatar"
                    style={{ objectFit: 'contain' }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    )
}