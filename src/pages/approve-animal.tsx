import { FetchAnimalsAsync, RootState } from '@core';
import { Table } from 'antd';
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
        width: 'auto',
    },
]

const index: React.FC = () => {
    const dispatch = useDispatch()

    const { animals, status } = useSelector((state: RootState) => state.Animal);

    useEffect(() => {
        dispatch(FetchAnimalsAsync())
    }, [])

    return (
        <Table
            bordered
            loading={status === 'loading'}
            dataSource={[...animals.map(el => ({ ...el, approved: Number(el.approved) }))]}
            columns={colums}
        >

        </Table>
    )
}

export default index;