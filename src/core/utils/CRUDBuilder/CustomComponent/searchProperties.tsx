import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Checkbox } from "antd";
import { ColumnType } from "antd/es/table/interface";
import { Translate } from "next-translate";
import React from "react";

export const getColumnSearchProps: (dataindex: string, t: Translate) => ColumnType<any> = (dataIndex, t) => {

    let match = false;

    let searchInput: Input | null = null

    const handleSearch = (confirm: () => void) => {
        confirm();
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };
    return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: (arr: string[]) => void, selectedKeys: string[], confirm: () => void, clearFilters: () => void }) => (
            <div style={{ padding: 8 }}>
                <Input
                    size='small'
                    ref={(e) => searchInput = e}
                    placeholder={t(`search.search-a`, { name: dataIndex })}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Checkbox value={match} onChange={(val) => { match = val.target.checked; handleReset(clearFilters); }}>{t`search.match-word`}</Checkbox>
                <br />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, height: 'fit-content' }}
                    >
                        {t`search.search`}
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90, height: 'fit-content' }}>
                        {t`search.reset`}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex as string]
                ? match ? (record[dataIndex] as string).toString().toLowerCase() === value.toString().toLowerCase() : (record[dataIndex] as string).toString().toLowerCase().includes(value.toString().toLowerCase())
                : false,
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput?.select(), 100);
            }
        },
    }
};