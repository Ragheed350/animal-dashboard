import { UploadChangeParam, UploadFile, RcFile } from "antd/es/upload/interface";
import { Typography, Image, Space, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FileToBase64 } from "../../helpers";

interface UploadProps {
    value?: string;
    onChange?: (value?: File | Blob) => void;
    disabled?: boolean;
}

export const CustomUpload: React.FC<UploadProps> = ({ onChange, value, disabled }) => {

    const [image, setImage] = useState(value)

    const triggerChange = async (changedValue?: File | Blob) => {
        onChange && onChange(changedValue);
        setImage(await FileToBase64(changedValue))
    };

    const onFileChange = (newFile: UploadChangeParam<UploadFile<any>>) => {
        triggerChange(newFile.file as RcFile);
    }

    const uploadButton = (
        <Space direction='vertical' size='small'>
            <PlusOutlined />
            <Typography.Text>Upload</Typography.Text>
        </Space>
    );

    return (
        <Upload disabled={disabled} className='avatar-uploader' listType="picture-card" showUploadList={false} onChange={onFileChange} beforeUpload={() => false} >
            {image ? (
                <Image
                    preview={false}
                    src={image}
                    alt="NOT_FOUND"
                />
            ) : (
                    uploadButton
                )}
        </Upload>
    )
}