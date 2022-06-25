import axios from "axios";

const apiKey = "6D52EE6B9DFE0COR";


const GetCurrencyListOptions = {
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/coins/markets',
    params: {vs_currency: 'usd', page: '1', per_page: '100', order: 'market_cap_desc'},
    headers: {
      'X-RapidAPI-Key': '9fcbaf77acmsh5bcd5d92239970fp1ec418jsn566e126c92b9',
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
    }
  };
  

  const GetMarketChartRangeOptions = {
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/coins/bitcoin/market_chart/range',
    params: {from: '1392577232', vs_currency: 'usd', to: '1422577232'},
    headers: {
      'X-RapidAPI-Key': '9fcbaf77acmsh5bcd5d92239970fp1ec418jsn566e126c92b9',
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
    }
  };
  


  const Request=()=>{

    const GetMarketChartRange = async () =>{
        const response = await axios.request(GetMarketChartRangeOptions)
        return response.data
    }
    
    const GetCurrencyList = async () =>{
        const response = await axios.request(GetCurrencyListOptions)
        return response.data
    }
return{
    GetMarketChartRange,
    GetCurrencyList,
    GetMarketChartRangeOptions
} 
}
export default Request;