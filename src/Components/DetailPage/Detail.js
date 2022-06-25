import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { Button, Divider, Col, Row, Avatar, Card, Skeleton, DatePicker, Space, Select } from 'antd';

import { Content } from 'antd/lib/layout/layout';
import useDetail from './useDetail';
import TokenCard from './TokenCard';

const { RangePicker } = DatePicker;
const { Option } = Select;



export default function Detail(props) {
  const{ activeToken,dateFormat,dateOnChange,onChange,
    priceBTC,priceETH,priceTHT,priceUSDC,asyncFetch,config,loading,
    asyncGetBTCrice} = useDetail();
    const { Meta } = Card;

  useEffect(() => {
    asyncFetch();
    asyncGetBTCrice("bitcoin");
    asyncGetBTCrice("ethereum");
    asyncGetBTCrice("tether");
    asyncGetBTCrice("usd-coin");
  }, []);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Row style={{ paddingLeft: '50px', paddingRight: '50px', backgroundColor: 'white' }}>
        <Col span={6}>
          <TokenCard title="Bitcoin (Btc)" description={priceBTC} avatar="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" loading={loading}  />
        </Col>
        <Col span={6}>
        <TokenCard title="Ethereum (Eth)" description={priceETH} avatar="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" loading={loading}  />
        </Col>
        <Col span={6}>
        <TokenCard title="Tether (Usdt)" description={priceTHT} avatar="https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707" loading={loading}  />
        </Col>
        <Col span={6}>
        <TokenCard title="Usd-coin (usdc)" description={priceUSDC} avatar="https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389" loading={loading}  />
        </Col>
      </Row>



      <Content style={{ padding: '50px', backgroundColor: 'white' }}>
        <Row>
          <Col span={5}>
            <RangePicker
              onChange={dateOnChange}
              format={dateFormat}
            />
          </Col>
          <Col span={3}>
            <Select
              showSearch
              defaultValue={activeToken}
              placeholder="Select a coin"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              <Option value="bitcoin">bitcoin</Option>
              <Option value="ethereum">ethereum</Option>
              <Option value="tether">tether</Option>
            </Select>
          </Col>
          <Col span={16}>
            <Button type="primary" style={{ width: '100%' }}
              onClick={() => asyncFetch()}

            > initialize </Button>
          </Col>
        </Row>
        <Space direction="vertical" size={12}>

        </Space>

        <Divider />
        <Line
          {...config}
        />
      </Content>


    </div>
  );
};


