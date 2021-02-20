import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import { CRUDBuilder, ItemType, DeleteAttributeAsync, InsertAttributeAsync, UpdateAttributeAsync, RootState, Authenticated, FetchCategoriesAsync, FetchParentsAsync } from '@core';
import { Typography } from 'antd';

// const mapper = (req: Attribute): Promise<Attribute_Req> => ({

// })

export const columnsAttributes: ItemType[] = [
    {
        columnType: {
            title: 'ID',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        type: 'primary-key',
        // ignore: { insert: true }
    },
    {
        columnType: {
            title: 'Name',
            dataIndex: 'name',
            width: 'auto',
        },
        type: 'text',
        trans: true,
    },
    {
        columnType: {
            title: 'Gender',
            dataIndex: 'gender',
            width: 200,
            render: (val: '0' | '1') => <Typography.Text>{val === '1' ? 'ذكر' : 'أنثى'}</Typography.Text>
        },
        type: 'select',
        foreignKeyArr: [{ title: 'ذكر', value: '0' }, { title: 'أنثى', value: '1' }]
    },
];

const ManageAttributes: FC = () => {
    const { lang } = useTranslation()
    const en = lang === 'en';
    const dispatch = useDispatch()

    const { status, attributes } = useSelector((state: RootState) => state.Attribute);
    const { parents } = useSelector((state: RootState) => state.Category);

    useEffect(() => {
        dispatch(FetchCategoriesAsync())
        dispatch(FetchParentsAsync())
    }, [dispatch])

    const tmp: ItemType[] = [
        {
            columnType: {
                title: 'Category ID',
                dataIndex: 'category_id',
                width: 200,
                render: (val: string) => en ? parents.find(el => el.id === Number(val))?.['name:en'] : parents.find(el => el.id === Number(val))?.['name:ar']
            },
            type: 'foreign-key',
            foreignKeyArr: parents.map(el => ({ title: en ? el['name:en'] : el['name:ar'], value: el.id }))
        },
    ]

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={attributes}
            loading={status === 'loading'}
            AddAsync={(el) => InsertAttributeAsync({ attribute: el.item })}
            UpdateAsync={(el) => UpdateAttributeAsync({ id: el.id, attribute: el.item })}
            DeleteAsync={(el) => DeleteAttributeAsync({ id: el.id })}
            itemsHeader={[...columnsAttributes, ...tmp]}
        // Mapper={mapper}
        />
    )
}
export default ManageAttributes;

export const getServerSideProps: GetServerSideProps = Authenticated;