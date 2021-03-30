import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import { CRUDBuilder, ItemType, DeleteAttachmentAsync, FetchAttachmentsAsync, InsertAttachmentAsync, UpdateAttachmentAsync, RootState, Authenticated, Attachment_Req } from '@core';

const mapper = async (req: Attachment_Req) => {

    const formData = new FormData();
    formData.append('animal_id', req.animal_id + '');
    // req.image.forEach(el => {
    //     formData.append('image', el);
    // });

    return formData;
}

export const columnsAttachments: ItemType[] = [
    {
        columnType: {
            title: 'المعرف',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        type: 'primary-key',
        ignore: { insert: true }
    },
    {
        columnType: {
            title: 'الرابط',
            dataIndex: 'url',
            render: (val: string) => <a href={val} target='__blank' >{val}</a>,
            width: 'auto',
        },
        type: 'text',
        ignore: true,
    },
    {
        columnType: {
            title: 'النوع',
            dataIndex: 'type',
            width: 200,
        },
        type: 'text',
        ignore: true,
    },
    {
        columnType: {
            title: 'معرف الحيوان',
            dataIndex: 'animal_id',
            width: 200,
        },
        type: 'foreign-key',
        foreignKeyArr: [
            { title: '1', value: 1 },
            { title: '2', value: 2 },
            { title: '3', value: 3 },
        ]
    },
    {
        columnType: {
            title: 'الصور',
            dataIndex: 'image',
            width: 200,
        },
        type: 'image',
        hidden: true
    },

];

const ManageAttachments: FC = () => {
    const { lang } = useTranslation()
    const dispatch = useDispatch()

    const { status, attachments } = useSelector((state: RootState) => state.Attachments);

    useEffect(() => {
        dispatch(FetchAttachmentsAsync())
    }, [dispatch])

    // const tmp: ItemType[] = [
    //     {
    //         columnType: {
    //             title: 'Category',
    //             dataIndex: 'category_id',
    //             width: 200,
    //             render: (id: number) => <Typography.Text >{lang === 'ar' ? categories.find(el => el.id === id)?.['name:ar'] : categories.find(el => el.id === id)?.['name:en']} </Typography.Text>
    //         },
    //         type: 'foreign-key',
    //         foreignKeyArr: categories.map(el => ({ value: el.id, title: lang === 'ar' ? el['name:ar'] : el['name:en'] }))
    //     },
    //     {
    //         columnType: {
    //             title: 'Brand',
    //             dataIndex: 'brand_id',
    //             width: 200,
    //             render: (id: number) => <Typography.Text >{brands.find(el => el.id === id)?.name} </Typography.Text>
    //         },
    //         type: 'foreign-key',
    //         foreignKeyArr: brands.map(el => ({ value: el.id, title: el.name }))
    //     },
    //     {
    //         columnType: {
    //             title: 'Tags',
    //             dataIndex: 'attachment_tags',
    //             width: 250,
    //             render: (arr: Tag[]) => <Select style={{ width: '100%' }} showSearch>{arr.map(el => <Select.Option key={el.id} value={el.id}>{el.name}</Select.Option>)}</Select>,
    //         },
    //         type: 'signable-multi-foreign-key',
    //         foreignKeyArr: tags.map(el => ({ value: el.name, title: el.name })),
    //     },
    // ]

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={attachments}
            loading={status === 'loading'}
            AddAsync={(el) => InsertAttachmentAsync({ attachment: el.item })}
            UpdateAsync={(el) => UpdateAttachmentAsync({ id: el.id, attachment: el.item })}
            DeleteAsync={(el) => DeleteAttachmentAsync({ id: el.id })}
            itemsHeader={columnsAttachments}
            Mapper={mapper}
        />
    )
}
export default ManageAttachments;

export const getServerSideProps: GetServerSideProps = Authenticated;