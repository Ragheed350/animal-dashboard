import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Animal, ApproveAnimalAsync, Authenticated, FetchAnimalsAsync, RootState, UnApproveAnimalAsync } from '@core';
import { Button, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const colums: ColumnsType<any> = [
    {
        title: 'ID',
        dataIndex: 'id',
        fixed: 'left',
        width: 100,
    },
    {
        title: 'Name',
        dataIndex: 'name:ar',
        width: 'auto',
    },
    {
        title: 'Approved',
        dataIndex: 'approved',
        width: 200,
        render: (val: '1' | '0') => Number(val) === 1 ?
            <CheckCircleFilled style={{ fontSize: '3rem', color: 'green' }} /> :
            <CloseCircleFilled style={{ fontSize: '3rem', color: 'red' }} />

    },
]

const index: React.FC = () => {
    const dispatch = useDispatch()

    const { animals, status } = useSelector((state: RootState) => state.Animal);

    useEffect(() => {
        dispatch(FetchAnimalsAsync())
    }, [])

    const tmp: ColumnsType<any> = [
        {
            title: 'Operations',
            dataIndex: 'approved',
            key: '123123',
            width: 200,
            render: (val: '1' | '0', { id, farm }: Animal) => Number(val) === 1 ?
                <Popconfirm onConfirm={() => dispatch(UnApproveAnimalAsync({ id }))} title='Are You Sure You Want To UnApprove this Animal?'>
                    <Button type='primary' size='large'>
                        {'UnApprove'}
                    </Button>
                </Popconfirm > :
                <Popconfirm onConfirm={() => dispatch(ApproveAnimalAsync({ id, user_id: Number(farm[0].farm_id) }))} title='Are You Sure You Want To Approve this Animal?'>
                    <Button type='primary' size='large'>
                        {'Approve'}
                    </Button>
                </Popconfirm >
        }
    ]
    return (
        <Table
            bordered
            loading={status === 'loading'}
            dataSource={[...animals.map(el => ({ ...el, approved: Number(el.approved) }))]}
            columns={[...colums, ...tmp]}
        >

        </Table>
    )
}

export default index;

export const getServerSideProps = Authenticated;