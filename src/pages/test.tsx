import { Select } from 'antd';
import React from 'react';


const arr = [
    {
        label: 'a',
        value: 1,
    },
    {
        label: 'b',
        value: 2,
    },
    {
        label: 'c',
        value: 3,
    },
    {
        label: 'd',
        value: 4,
    },
] as { label: string | number, value: string | number }[]

const test: React.FC = () => {
    return (
        <Select
            style={{ width: '300px' }}
            options={arr}
        />
    )
}
export default test;