import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Authenticated, RootState, listFeaturesAsync, approveFeatureAsync, unapproveFeatureAsync, FeatureForApprove, FetchUsersAsync, FetchFeaturesAsync } from '@core';
import { Button, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const index: React.FC = () => {
    const dispatch = useDispatch()

    const { featuresApprove, features, status } = useSelector((state: RootState) => state.Feature);
    const { users } = useSelector((state: RootState) => state.Users);

    useEffect(() => {
        dispatch(listFeaturesAsync())
        dispatch(FetchUsersAsync())
        dispatch(FetchFeaturesAsync())
    }, [])

    const colums: ColumnsType<FeatureForApprove> = useMemo(() => [
        {
            title: 'المعرف',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        {
            title: 'السمتخدم',
            dataIndex: 'user_id',
            width: 'auto',
            render: (val: number | string) => <>{users.find(el => el.id === Number(val))?.['name:ar']}</>
        },
        {
            title: 'الباقة',
            dataIndex: 'feature_id',
            width: 'auto',
            render: (val: number | string) => <>{features.find(el => el.id === Number(val))?.['text:ar']}</>
        },
        {
            title: 'تمت الموافقة عليه؟',
            dataIndex: 'is_approved',
            width: 200,
            render: (val: '1' | '0') => Number(val) === 1 ?
                <CheckCircleFilled style={{ fontSize: '3rem', color: 'green' }} /> :
                <CloseCircleFilled style={{ fontSize: '3rem', color: 'red' }} />
        },
        {
            title: 'عمليات',
            dataIndex: 'is_approved',
            key: '123123',
            width: 200,
            render: (val: '1' | '0', { id, feature_id, user_id }) => Number(val) === 1 ?
                <Popconfirm onConfirm={() => dispatch(unapproveFeatureAsync({ id }))} title='هل أنت متأكد من أنك تريد عدم الموافقة على هذه الباقة؟'>
                    <Button type='primary' danger ghost size='large'>
                        {'عدم الموافقة'}
                    </Button>
                </Popconfirm > :
                <Popconfirm onConfirm={() => dispatch(approveFeatureAsync({ id, feature_id, user_id }))} title='هل أنت متأكد من أنك تريد الموافقة على هذه الباقة؟'>
                    <Button type='primary' size='large'>
                        {'موافقة'}
                    </Button>
                </Popconfirm >
        },
        // {
        //     title: 'الحذف',
        //     dataIndex: 'id',
        //     key: 'delete123',
        //     width: 100,
        //     render: (val: number) => <Button size='small' type='text' icon={<DeleteFilled />} onClick={() => { val }} />
        // }
    ], [users, features])

    return (
        <Table
            bordered
            loading={status === 'loading'}
            dataSource={[...featuresApprove.map(el => ({ ...el, approved: Number(el.is_approved) }))]}
            columns={colums}
        >

        </Table>
    )
}

export default index;

export const getServerSideProps = Authenticated;