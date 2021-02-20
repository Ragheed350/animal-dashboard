import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import { CRUDBuilder, ItemType, RootState, Authenticated, FetchNotificationsAsync, DeleteNotificationAsync, InsertNotificationAsync, UpdateNotificationAsync, FetchAnimalsAsync, FetchUsersAsync } from '@core';
import { Typography } from 'antd';

// const mapper = (req: Notification): Promise<Notification_Req> => ({

// })

export const columnsNotifications: ItemType[] = [
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
            title: 'Text',
            dataIndex: 'text',
            width: 200,
        },
        type: 'text',
        trans: true,
    },
    {
        columnType: {
            title: 'Is Read',
            dataIndex: 'is_read',
            width: 150,
        },
        type: 'check-box',
    },
];

const ManageNotifications: FC = () => {
    const { lang } = useTranslation()
    const en = lang === 'en';
    const dispatch = useDispatch()

    const { status, notifications } = useSelector((state: RootState) => state.Notification);
    const { animals } = useSelector((state: RootState) => state.Animal);
    const { users } = useSelector((state: RootState) => state.Users);

    useEffect(() => {
        dispatch(FetchNotificationsAsync())
        dispatch(FetchAnimalsAsync())
        dispatch(FetchUsersAsync())
    }, [dispatch])

    const tmp: ItemType[] = [
        {
            columnType: {
                title: 'Animal',
                dataIndex: 'animal_id',
                width: 200,
                render: (val: string) => <Typography.Text>{en ? animals.find(el => el.id === Number(val))?.['name:en'] : animals.find(el => el.id === Number(val))?.['name:ar']}</Typography.Text>
            },
            type: 'foreign-key',
            foreignKeyArr: animals.map(el => ({ title: en ? el['name:en'] : el['name:ar'], value: el.id }))
        },
        {
            columnType: {
                title: 'User',
                dataIndex: 'user_id',
                width: 200,
                render: (id: string) => <Typography.Text>{en ? users.find(el => el.id === Number(id))?.['name:en'] : users.find(el => el.id === Number(id))?.['name:ar']}</Typography.Text>,
            },
            type: 'foreign-key',
            foreignKeyArr: users.map(el => ({ title: en ? el['name:en'] : el['name:ar'], value: el.id }))
        },
    ]

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={notifications}
            loading={status === 'loading'}
            AddAsync={(el) => InsertNotificationAsync({ notification: el.item })}
            UpdateAsync={(el) => UpdateNotificationAsync({ id: el.id, notification: el.item })}
            DeleteAsync={(el) => DeleteNotificationAsync({ id: el.id })}
            itemsHeader={[...columnsNotifications, ...tmp]}
        // Mapper={mapper}
        />
    )
}
export default ManageNotifications;

export const getServerSideProps: GetServerSideProps = Authenticated;