
import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { useStoreState, } from 'easy-peasy';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,

} from '@ant-design/icons';


const { Sider } = Layout;

export default function CustomSider() {
    const [collapsed, setCollapsed] = useState(true);
    const currencList = useStoreState((state) => state.currencList);
    return (
        <Sider trigger={null} breakpoint='xs'
            theme='light'
            collapsedWidth={50}
            collapsible collapsed={collapsed} width={200} className="site-layout-background">

            <div className="logo" />

            <Button
                style={{ marginTop: 8, marginBottom: 8, marginLeft: 8 }}
                type="dashed"
                icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
            />


            <Menu

                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                        onClick: {}
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                    },
                ]}
            />
        </Sider>
    );
};