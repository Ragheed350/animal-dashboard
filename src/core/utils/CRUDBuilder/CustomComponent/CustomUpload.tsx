import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { Typography, Image, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FileToBase64 } from "../../helpers";

interface UploadProps {
    value?: string | File;
    onChange?: (value?: File | Blob) => void;
    disabled?: boolean;
}

export const CustomUpload: React.FC<UploadProps> = ({ onChange, value, disabled }) => {

    const [image, setImage] = useState<string>()

    useEffect(() => {
        typeof value === 'string' ? setImage(value) : FileToBase64(value).then(res => setImage(res))
    }, [value])

    const onFileChange = async (newFile: UploadChangeParam<UploadFile<any>>) => {
        onChange && onChange(newFile.file as any);
        setImage(await FileToBase64(newFile.file as any))
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