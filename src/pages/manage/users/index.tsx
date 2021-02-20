import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import { CRUDBuilder, ItemType, RootState, Authenticated, FetchUsersAsync, DeleteUserAsync, InsertUserAsync, UpdateUserAsync, FetchCountriesAsync } from '@core';
import { Typography } from 'antd';

// const mapper = (req: User): Promise<User_Req> => ({

// })

export const columnsUsers: ItemType[] = [
    {
        columnType: {
            title: 'ID',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        type: 'primary-key',
    },
    {
        columnType: {
            title: 'Name',
            dataIndex: 'name',
            width: 200,
        },
        type: 'text',
        trans: true,
    },
    {
        columnType: {
            title: 'Email',
            dataIndex: 'email',
            width: 200,
        },
        type: 'text',
    },
    {
        columnType: {
            title: 'Phone',
            dataIndex: 'phone',
            width: 200,
        },
        type: 'text',
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
    {
        columnType: {
            title: 'Marital',
            dataIndex: 'marital',
            width: 200,
        },
        type: 'text',
    },
    {
        columnType: {
            title: 'Is Suspended',
            dataIndex: 'is_suspended',
            width: 200,
        },
        type: 'check-box',
    },
    {
        columnType: {
            title: 'Nationallity',
            dataIndex: 'nationallity',
            width: 200,
        },
        type: 'text',
        trans: true,
    },
    {
        columnType: {
            title: 'Address',
            dataIndex: 'address',
            width: 200,
        },
        type: 'text-area',
        trans: true,
    },
    {
        columnType: {
            title: 'Image',
            dataIndex: 'image',
            width: 300,
        },
        type: 'image',
    },
    {
        columnType: {
            title: 'package_id',
            dataIndex: 'package_id',
            width: 300,
        },
        type: 'text',
    },
];

const ManageUsers: FC = () => {
    const { lang } = useTranslation()
    const en = lang === 'en';
    const dispatch = useDispatch()

    const { status, users } = useSelector((state: RootState) => state.Users);
    const { countries } = useSelector((state: RootState) => state.Country);

    useEffect(() => {
        dispatch(FetchUsersAsync())
        dispatch(FetchCountriesAsync())
    }, [dispatch])

    const tmp: ItemType[] = [
        {
            columnType: {
                title: 'Country ID',
                dataIndex: 'country_id',
                width: 200,
                render: (val: string) => en ? countries.find(el => el.id === Number(val))?.['name:en'] : countries.find(el => el.id === Number(val))?.['name:ar']
            },
            type: 'foreign-key',
            foreignKeyArr: countries.map(el => ({ title: en ? el['name:en'] : el['name:en'], value: el.id }))
        },
    ]

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={users}
            loading={status === 'loading'}
            AddAsync={(el) => InsertUserAsync({ user: el.item })}
            UpdateAsync={(el) => UpdateUserAsync({ id: el.id, user: el.item })}
            DeleteAsync={(el) => DeleteUserAsync({ id: el.id })}
            itemsHeader={[...columnsUsers, ...tmp]}
        // Mapper={mapper}
        />
    )
}
export default ManageUsers;

export const getServerSideProps: GetServerSideProps = Authenticated;