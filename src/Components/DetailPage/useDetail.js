import React, { useState, useEffect } from 'react';
import { Card, DatePicker, Select } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import axios from "axios";
const { RangePicker } = DatePicker;
const { Option } = Select;



export default function useDetail(props) {
  const activeToken = useStoreState((state) => state.activeToken);
  const dateFormat = 'DD-MM-YYYY';
  const [activeCoin, setActiveCoin] = useState('bitcoin');
  const [dates, setDates] = useState({ from: '1392577232', vs_currency: 'usd', to: '1422577232', id: activeCoin });

  const DateToTimestamp = (date) => {
    date = date.split("-");
    var newDate = new Date(date[2], date[1] - 1, date[0]);
    return (newDate.getTime() / 1000);
  }

  const dateOnChange = (date, dateString) => {
    console.log(dateString[0] + "   " + dateString[1]);
    setDates(
      {
        from: DateToTimestamp(dateString[0]),
        to: DateToTimestamp(dateString[1]),
        vs_currency: 'usd',
        id: 'bitcoin'
      })
    console.log(dates);
  };
  const onChange = (value) => {
    setActiveCoin(value);
    console.log(`selected ${value}`);
  };

  const chartRequest = {
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/coins/bitcoin/market_chart/range',
    params: dates,
    //{ from: '1392577232', vs_currency: 'usd', to: '1422577232' },
    headers: {
      'X-RapidAPI-Key': '9fcbaf77acmsh5bcd5d92239970fp1ec418jsn566e126c92b9',
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
    }
  };

  const [pureData, setpureData] = useState([]);
  const [price, setPrice] = useState([]);
  const [formatedResult, setformatedResult] = useState([]);
  const formatedMarketData = []

  const [priceBTC, setpriceBTC] = useState(0);
  const [priceETH, setpriceETH] = useState(0);
  const [priceTHT, setpriceTHT] = useState(0);
  const [priceUSDC, setpriceUSDC] = useState(0);


  useEffect(() => {
    asyncFetch();
    asyncGetBTCrice("bitcoin");
    asyncGetBTCrice("ethereum");
    asyncGetBTCrice("tether");
    asyncGetBTCrice("usd-coin");
  }, []);

  const asyncFetch = async () => {
    axios.request(chartRequest)
      .then((res) => {
        convetPlotTypeData(res.data)

      })

  }
  function convetPlotTypeData(datas) {
    if (datas) {
      if (datas.prices)
        datas.prices.map((data) => { formatedMarketData.push({ time: new Date(data[0]).toLocaleDateString("en-US"), price: data[1], category: "price" }) });

      if (datas.market_caps)
        datas.market_caps.map((data) => { formatedMarketData.push({ time: new Date(data[0]).toLocaleDateString("en-US"), price: data[1], category: "market_caps" }) });

      if (datas.total_volumes)
        datas.total_volumes.map((data) => { formatedMarketData.push({ time: new Date(data[0]).toLocaleDateString("en-US"), price: data[1], category: "total_volumes" }) });

    }

    setformatedResult(formatedMarketData);
  }
  const COLOR_PLATE_10 = [
    '#5B8FF9',
    '#5AD8A6',
    '#5D7092',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
  ];
  const config = {
    data: formatedResult,
    xField: 'time',
    yField: 'price',
    seriesField: 'category',
    color: COLOR_PLATE_10,
    point: {
      shape: ({ category }) => {
        return category === 'price' ? 'square' : 'circle';
      },
    },
  };

  const [loading, setLoading] = useState(false);
  const { Meta } = Card;



  const PriceOptions = (id) => {
    return {
      method: 'GET',
      url: 'https://coingecko.p.rapidapi.com/simple/price',
      params: {
        ids: (id),
        vs_currencies: 'usd',
        include_last_updated_at: 'false',
        include_market_cap: 'false',
        include_24hr_change: 'false',
        include_24hr_vol: 'false'
      },
      headers: {
        'X-RapidAPI-Key': '9fcbaf77acmsh5bcd5d92239970fp1ec418jsn566e126c92b9',
        'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
      }
    };



  }

  const asyncGetBTCrice = async (id) => {
    axios.request(PriceOptions(id)).then(function (response) {
      switch (id) {
        case "bitcoin":
          setpriceBTC(response.data[id].usd);
          break;
        case "ethereum":
          setpriceETH(response.data[id].usd);
          break;
        case "tether":
          setpriceTHT(response.data[id].usd);
          break;
        case "usd-coin":
          setpriceUSDC(response.data[id].usd);
          break;
        default:
          setpriceBTC(0);
      }


      // setPrice( {id : response.data.bitcoin.usd});
    }).catch(function (error) {
      console.error(error);
    });
  }

 return {
    activeToken,dateFormat,activeCoin,setActiveCoin,dates, setDates,DateToTimestamp,dateOnChange,onChange,pureData, setpureData,price, setPrice,formatedResult, setformatedResult,
    formatedMarketData,priceBTC, setpriceBTC,priceETH, setpriceETH,priceTHT, setpriceTHT,priceUSDC, setpriceUSDC,asyncFetch,convetPlotTypeData,COLOR_PLATE_10,config,loading, setLoading,
    PriceOptions,asyncGetBTCrice

 };

};


