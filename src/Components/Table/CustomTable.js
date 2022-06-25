import * as React from 'react';
import { Button, Table, Divider } from 'antd';
import {  Layout, } from 'antd';
import useCustomTable from './useCustomTable'
const {  Content,  } = Layout;



export default function CustomTable(props) {
 const{getCollection,columns} = useCustomTable();

    
    return (
        <Content style={{ padding: '0 50px' }}>
            <Button type="primary" style={{ width: '100%' }} onClick={() => getCollection()}> initialize </Button>
            <Divider />
            <Table
                columns={columns}
                dataSource={props.rows}
                pagination={{
                    defaultPageSize: 10,
                }}
            />
        </Content>


    );
}
