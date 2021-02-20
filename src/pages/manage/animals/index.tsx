import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';

import {
    CRUDBuilder,
    ItemType,
    DeleteAnimalAsync,
    FetchAnimalsAsync,
    InsertAnimalAsync,
    UpdateAnimalAsync,
    RootState,
    Authenticated,
    FetchCategoriesAsync,
    FetchColorsAsync,
    FetchCountriesAsync,
    FetchDisplayCategoriesAsync,
    Farm,
    Attachment,
    DATE_FORMAT,
    FetchParentsAsync,
    categoryService,
    isError,
} from '@core';
import { Carousel, Cascader, Col, Form, Select, Typography } from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';

const mapper = (req: any): any => {

    const formData = new FormData();

    for (const key in req) {
        if (Object.prototype.hasOwnProperty.call(req, key)) {
            const el = req[key];
            if (key === 'birth_date')
                formData.append(key, (el as moment.Moment).format(DATE_FORMAT))
            else if (key === 'image') {
                (el as (File | string)[]).forEach(element => {
                    formData.append(key + '[]', element)
                });
            }
            else if (['for_buy', 'is_shown', 'approved', 'is_dead'].includes(key))
                formData.append(key, (el as boolean | undefined) ? '1' : '0');
            else if (key === 'category_id')
                formData.append(key, (el as boolean | undefined) ? '1' : '0');
            else
                formData.append(key, el)
        }
    }

    return formData;
}

export const columnsAnimals: ItemType[] = [
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
            title: 'Animal NO',
            dataIndex: 'animal_no',
            width: 200,
        },
        type: 'text',
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
            title: 'Birth Date',
            dataIndex: 'birth_date',
            width: 200,
        },
        type: 'date',
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
            title: 'Tag Number',
            dataIndex: 'tag_number',
            width: 200,
        },
        type: 'number'
    },
    {
        columnType: {
            title: 'For Buy',
            dataIndex: 'for_buy',
            width: 200,
        },
        type: 'check-box',
        required: false
    },
    {
        columnType: {
            title: 'Is Shown',
            dataIndex: 'is_shown',
            width: 200,
        },
        type: 'check-box',
        required: false
    },
    {
        columnType: {
            title: 'QR',
            dataIndex: 'qr',
            width: 200,
        },
        type: 'text',
        ignore: true,
    },
    {
        columnType: {
            title: 'QR Image',
            dataIndex: 'qr_image',
            width: 200,
        },
        type: 'image',
        ignore: true,
    },
    {
        columnType: {
            title: 'Is Dead',
            dataIndex: 'is_dead',
            width: 200,
        },
        type: 'check-box',
        required: false
    },
    {
        columnType: {
            title: 'Approved',
            dataIndex: 'approved',
            width: 200,
        },
        type: 'check-box',
        required: false
    },
    {
        columnType: {
            title: 'Association',
            dataIndex: 'association_no',
            width: 200,
        },
        type: 'number',
        required: false
    },
    {
        columnType: {
            title: 'Farms',
            dataIndex: 'farm',
            width: 200,
            render: (arr: Farm[]) => <Select style={{ width: '100%' }}>
                {arr.map(el => <Select.Option value={el.id}>{el['name:en']}</Select.Option>)}
            </Select>
        },
        type: 'multi-foreign-key',
        ignore: true,
    },
    {
        columnType: {
            title: 'Attachments',
            dataIndex: 'attachments',
            width: 200,
            render: (arr: Attachment[]) => <Carousel draggable>{arr.map(el => <img key={el.id} src={el.url} />)}</Carousel>,
        },
        type: 'multi-foreign-key',
        ignore: true,
    },
    {
        columnType: {
            title: 'Rate',
            dataIndex: 'rate',
            width: 200,
        },
        type: 'number',
    },
    {
        columnType: {
            title: 'Age',
            dataIndex: 'age',
            width: 200,
        },
        type: 'number',
    },
    {
        columnType: {
            title: 'Weight',
            dataIndex: 'weight',
            width: 200,
        },
        type: 'number',
        hidden: true,
        required: false
    },
    {
        columnType: {
            title: 'Images',
            dataIndex: 'image',
            width: 200,
        },
        type: 'multi-images',
        hidden: true,
        initialValueDataIndex: 'attachments',
        getInitialValue: (val: Attachment[]) => val.map(el => ({ uid: el.id, name: el.url, url: el.url })),
    },
];

const ManageAnimals: FC = () => {
    const { lang } = useTranslation()
    const en = lang === 'en';
    const dispatch = useDispatch()

    const [options, setOptions] = useState<CascaderOptionType[]>()

    const { status, animals } = useSelector((state: RootState) => state.Animal);
    const { parents } = useSelector((state: RootState) => state.Category);
    const { colors } = useSelector((state: RootState) => state.Color);
    const { countries } = useSelector((state: RootState) => state.Country);
    const { displayCategories } = useSelector((state: RootState) => state.DisplayCategory);

    useEffect(() => {
        dispatch(FetchAnimalsAsync())
        dispatch(FetchCategoriesAsync())
        dispatch(FetchColorsAsync())
        dispatch(FetchCountriesAsync())
        dispatch(FetchDisplayCategoriesAsync())
        dispatch(FetchParentsAsync())
    }, [dispatch])

    useEffect(() => {
        parents && parents.length !== 0 && setOptions(parents.map(el => ({ label: el['name:en'], value: el.id, isLeaf: false })));
    }, [parents])

    const loadData = async (selectedOptions: CascaderOptionType[] | undefined) => {
        const targetOption = selectedOptions![selectedOptions!.length - 1];
        targetOption.loading = true;

        const result = await categoryService.FetchChildren(Number(targetOption.value))

        if (!isError(result)) {
            targetOption.children = result.data.map(el => ({ label: el['name:en'], value: el.id, isLeaf: selectedOptions!.length === 2 }))
        }
        targetOption.loading = false;

        setOptions([...options!]);
    };

    const tmp: ItemType[] = [
        {
            columnType: {
                title: 'Father',
                dataIndex: 'father_id',
                width: 200,
                render: (id: string) => <Typography.Text>{en ? animals.find(el => el.id === Number(id))?.['name:en'] : animals.find(el => el.id === Number(id))?.['name:ar']}</Typography.Text>
            },
            type: 'foreign-key',
            required: false,
            getInitialValue: (val: string) => animals.find(el => el.id === Number(val))?.animal_no,
            foreignKeyArr: animals.filter(el => el.gender === '0').map(el => ({ value: el.animal_no, title: en ? el['name:en'] : el['name:ar'] }))
        },
        {
            columnType: {
                title: 'Mother',
                dataIndex: 'mother_id',
                width: 200,
                render: (id: string) => <Typography.Text>{en ? animals.find(el => el.id === Number(id))?.['name:en'] : animals.find(el => el.id === Number(id))?.['name:ar']}</Typography.Text>
            },
            type: 'foreign-key',
            required: false,
            getInitialValue: (val: string) => animals.find(el => el.id === Number(val))?.animal_no,
            foreignKeyArr: animals.filter(el => el.gender === '1').map(el => ({ value: el.animal_no, title: en ? el['name:en'] : el['name:ar'] }))
        },
        {
            columnType: {
                title: 'Country',
                dataIndex: 'country_id',
                width: 200,
            },
            type: 'foreign-key',
            hidden: true,

            foreignKeyArr: countries.map(el => ({ value: el.id, title: en ? el['name:en'] : el['name:ar'] }))
        },
        {
            columnType: {
                title: 'Country',
                dataIndex: 'country',
                width: 200,
            },
            type: 'text',
            trans: true,
            ignore: true
        },
        {
            columnType: {
                title: 'Color',
                dataIndex: 'color_id',
                width: 200,
            },
            type: 'foreign-key',
            hidden: true,
            foreignKeyArr: colors.map(el => ({ value: el.id, title: en ? el['name:en'] : el['name:ar'] }))
        },
        {
            columnType: {
                title: 'Color',
                dataIndex: 'color',
                width: 200,
            },
            type: 'text',
            trans: true,
            ignore: true
        },
        {
            columnType: {
                title: 'Category',
                dataIndex: 'category_id',
                width: 200,
            },
            type: 'foreign-key',
            customFormItem: <Col span={12}>
                <Form.Item label='Category' name='category_id' rules={[{ required: true }]}>
                    <Cascader options={options} loadData={loadData} changeOnSelect />
                </Form.Item>
            </Col>,
            getInitialValue: () => undefined
        },
        {
            columnType: {
                title: 'Display Category',
                dataIndex: 'display_category_id',
                width: 200,
            },
            type: 'foreign-key',
            foreignKeyArr: displayCategories.map(el => ({ value: el.id, title: en ? el['name:en'] : el['name:ar'] }))
        },
    ]

    return (
        <CRUDBuilder
            lang={lang === 'en' ? 'en' : 'ar'}
            items={animals}
            loading={status === 'loading'}
            AddAsync={(el) => InsertAnimalAsync({ animal: el.item })}
            UpdateAsync={(el) => UpdateAnimalAsync({ id: el.id, animal: el.item })}
            DeleteAsync={(el) => DeleteAnimalAsync({ id: el.id })}
            itemsHeader={[...columnsAnimals, ...tmp]}
            Mapper={mapper}
        />
    )
}
export default ManageAnimals;

export const getServerSideProps: GetServerSideProps = Authenticated;