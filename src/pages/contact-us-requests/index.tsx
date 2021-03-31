import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CRUDBuilder,
    ItemType,
    RootState,
    Authenticated,
    FetchContactUsRequestsAsync,
    DeleteContactUsRequestAsync
} from '@core';

// const mapper = (req: Color): Promise<Color_Req> => ({

// })

export const columnsContactUs: ItemType[] = [
    {
        columnType: {
            title: 'المعرف',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        type: 'primary-key',
    },
    {
        columnType: {
            title: 'الاسم',
            dataIndex: 'name',
            width: 130,
        },
        type: 'text',
    },
    {
        columnType: {
            title: 'الإيميل',
            dataIndex: 'email',
            width: 150,
        },
        type: 'text',
    },
    {
        columnType: {
            title: 'الرسالة',
            dataIndex: 'message',
            width: 'auto',
        },
        type: 'text-area',
    },
];

const ManageContactUs: FC = () => {
    const { lang } = useTranslation()
    // const en = lang === 'en';
    const dispatch = useDispatch()

    const { status, contactUsRequests } = useSelector((state: RootState) => state.ContactUsRequests);

    useEffect(() => {
        dispatch(FetchContactUsRequestsAsync())
    }, [dispatch])

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={contactUsRequests}
            loading={status === 'loading'}
            // AddAsync={(el) => InsertColorAsync({ color: el.item })}
            // UpdateAsync={(el) => UpdateColorAsync({ id: el.id, color: el.item })}
            DeleteAsync={(el) => DeleteContactUsRequestAsync(el.id)}
            itemsHeader={[...columnsContactUs]}
        // Mapper={mapper}
        />
    )
}
export default ManageContactUs;

export const getServerSideProps = Authenticated;