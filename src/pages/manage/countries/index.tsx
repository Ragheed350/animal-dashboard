import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import { CRUDBuilder, ItemType, RootState, Authenticated, FetchCountriesAsync, DeleteCountryAsync, InsertCountryAsync, UpdateCountryAsync } from '@core';

// const mapper = (req: Country): Promise<Country_Req> => ({

// })

export const columnsCountries: ItemType[] = [
    {
        columnType: {
            title: 'المعرف',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        type: 'primary-key',
        // ignore: { insert: true }
    },
    {
        columnType: {
            title: 'الاسم',
            dataIndex: 'name',
            width: 'auto',
        },
        type: 'text',
        trans: true,
    },
];

const ManageCountries: FC = () => {
    const { lang } = useTranslation()
    // const en = lang === 'en';
    const dispatch = useDispatch()

    const { status, countries } = useSelector((state: RootState) => state.Country);

    useEffect(() => {
        dispatch(FetchCountriesAsync())
    }, [dispatch])

    // const tmp: ItemType[] = [
    //     {
    //         columnType: {
    //             title: 'Parent ID',
    //             dataIndex: 'parent_id',
    //             width: 200,
    //             render: (val: string) => en ? countries.find(el => el.id === Number(val))?.['name:en'] : countries.find(el => el.id === Number(val))?.['name:ar']
    //         },
    //         type: 'foreign-key',
    //         foreignKeyArr: countries.map(el => ({ title: en ? el['name:en'] : el['name:en'], value: el.id }))
    //     },
    // ]

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={countries}
            loading={status === 'loading'}
            AddAsync={(el) => InsertCountryAsync({ country: el.item })}
            UpdateAsync={(el) => UpdateCountryAsync({ id: el.id, country: el.item })}
            DeleteAsync={(el) => DeleteCountryAsync({ id: el.id })}
            itemsHeader={[...columnsCountries]}
        // Mapper={mapper}
        />
    )
}
export default ManageCountries;

export const getServerSideProps: GetServerSideProps = Authenticated;