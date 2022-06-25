import Detail from './DetailPage/Detail';
import CustomTable from './Table/CustomTable';
import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import CustomSider from './Template/CustomSider';


const { Header, Sider, Content } = Layout;

export default function Home() {
    const [collapsed, setCollapsed] = useState(true);
    const currencList = useStoreState((state) => state.currencList);
    return (
        <Layout>

            <CustomSider />
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Routes>
                        <Route exact path='/Detail' element={< Detail />}></Route>
                        <Route exact path='/' element={< CustomTable rows={currencList} />}></Route>
                    </Routes>

                </Content>
            </Layout>
        </Layout>

    );
};