import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import { CRUDBuilder, ItemType, DeleteCategoryAsync, InsertCategoryAsync, UpdateCategoryAsync, RootState, Authenticated, FetchLevel2Async, FetchLevel3Async } from '@core';

// const mapper = (req: Category): Promise<Category_Req> => ({

// })

export const columnsCategories: ItemType[] = [
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
            title: 'Description',
            dataIndex: 'description',
            width: 'auto',
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
];

const ManageCategories: FC = () => {
    const { lang } = useTranslation()
    const en = lang === 'en';
    const dispatch = useDispatch()

    const { status, level2, level3 } = useSelector((state: RootState) => state.Category);

    useEffect(() => {
        dispatch(FetchLevel2Async())
        dispatch(FetchLevel3Async())
    }, [dispatch])

    const tmp: ItemType[] = [
        {
            columnType: {
                title: 'Parent ID',
                dataIndex: 'parent_id',
                width: 200,
                render: (val: string) => en ? level2.find(el => el.id === Number(val))?.['name:en'] : level2.find(el => el.id === Number(val))?.['name:ar']
            },
            type: 'foreign-key',
            foreignKeyArr: level2.map(el => ({ title: en ? el['name:en'] : el['name:ar'], value: el.id }))
        },
    ]

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={level3}
            loading={status === 'loading'}
            AddAsync={(el) => InsertCategoryAsync({ category: el.item })}
            UpdateAsync={(el) => UpdateCategoryAsync({ id: el.id, category: el.item })}
            DeleteAsync={(el) => DeleteCategoryAsync({ id: el.id })}
            itemsHeader={[...columnsCategories, ...tmp]}
        // Mapper={mapper}
        />
    )
}
export default ManageCategories;

export const getServerSideProps: GetServerSideProps = Authenticated;