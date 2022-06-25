import * as React from 'react';
import { Button, Input, Space } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {  Layout } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom'




export default function useTable(props) {
    const currencList = useStoreState((state) => state.currencList);
    const getCollection = useStoreActions((actions) => actions.getCollection);
    const setActiveToken = useStoreActions((actions) => actions.setActiveToken);
    const activeToken = useStoreState((state) => state.activeToken);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'ico',
            key: 'id',
            render: (_, record) => {
                return <div>
                    <img
                        width={50}
                        src={record.image}
                    />

                </div>;

            },
            // ...getColumnSearchProps('name'),
        },
        {
            title: 'name',
            key: 'id',
            dataIndex: 'id',
            ...getColumnSearchProps('name'),
        },

        {
            title: 'current_price',
            dataIndex: 'current_price',
            key: 'current_price',
        },
        {
            title: 'symbol',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: 'change_24h',
            dataIndex: 'price_change_24h',
            key: 'price_change_24h',
        },
        {
            title: 'change_percentage_24h',
            dataIndex: 'price_change_percentage_24h',
            key: 'price_change_percentage_24h',
        },
        {
            title: 'total_supply',
            dataIndex: 'total_supply',
            key: 'total_supply',
        },
        {
            title: 'total_volume',
            dataIndex: 'total_volume',
            key: 'total_volume',
        },
        // {
        //     title: 'current_price',
        //     dataIndex: 'current_price',
        //     key: 'current_price',
        // },
        // {
        //     title: 'last_updated',
        //     dataIndex: 'last_updated',
        //     key: 'last_updated',
        // },
        {
            title: 'action',
            key: 'action',
            render: (_, record) => (
                
                    <Link to="/Demoline" >
                    <Button
                    name={record.id}
                    onClick={setActiveToken(record.id)}
                    >Details</Button>
                    </Link>

            ),
        },
    ];
    
    return {
        currencList,getCollection,setActiveToken,activeToken,searchText,searchedColumn,searchInput,handleSearch,handleReset,getColumnSearchProps,columns
    };
}
