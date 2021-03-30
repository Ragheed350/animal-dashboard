import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
    CRUDBuilder,
    ItemType,
    RootState,
    Authenticated,
    listFeaturesAsync,
    FetchUsersAsync,
    FetchFeaturesAsync,
    addFeatureUserAsync,
    removeFeatureUserAsync,
} from '@core';

// const mapper = (req: Attribute): Promise<Attribute_Req> => ({

// })

export const columnsAnimalAttributes: ItemType[] = [
    {
        columnType: {
            title: 'المعرف',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        type: 'primary-key',
    },
];

const ManageAttributes: FC = () => {
    const { lang } = useTranslation();
    const dispatch = useDispatch();

    const { featuresApprove, features, status } = useSelector((state: RootState) => state.Feature);
    const { users } = useSelector((state: RootState) => state.Users);

    useEffect(() => {
        dispatch(listFeaturesAsync());
        dispatch(FetchFeaturesAsync());
        dispatch(FetchUsersAsync());
    }, []);

    const tmp: ItemType[] = [

        {
            columnType: {
                title: 'المستخدم',
                dataIndex: 'user_id',
                width: 'auto',
                render: (val: number | string) => <>{users.find(el => el.id === Number(val))?.['name:ar']}</>
            },
            type: 'foreign-key',
            foreignKeyArr: users.map(el => ({ title: el['name:ar'], value: el.id }))
        },
        {
            columnType: {
                title: 'الباقة',
                dataIndex: 'feature_id',
                width: 'auto',
                render: (val: number | string) => <>{features.find(el => el.id === Number(val))?.['text:ar']}</>
            },
            type: 'foreign-key',
            foreignKeyArr: features.map(el => ({ title: el['text:ar'], value: el.id }))
        },
    ];

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={featuresApprove}
            loading={status === 'loading'}
            AddAsync={(el) =>
                addFeatureUserAsync(el.item)
            }
            DeleteAsync={(el) => {
                const rec = featuresApprove.find(el => el.id === Number(el.id))
                return rec ? removeFeatureUserAsync({ id: el.id, user_id: rec.user_id, feature_id: rec.feature_id }) : () => { }
            }}
            itemsHeader={[...columnsAnimalAttributes, ...tmp]}
        // Mapper={mapper}
        />
    );
};
export default ManageAttributes;

export const getServerSideProps: GetServerSideProps = Authenticated;
