import { createStore, action,thunk   } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';
import Request from './Requests';
import axios from "axios";
import { composeWithDevTools } from 'redux-devtools-extension';

const {GetCurrencyList,GetMarketChartRange,GetMarketChartRangeOptions} = Request();

export const  Store = createStore({
    
    currencList: [],
    marketData:[],
    activeToken:'bitcoin',

    setActiveToken : action((state,payload)=>{
      state.activeToken = payload
    }),

    intiliazeCurencyList : action((state,payload)=>{
      state.currencList = payload
    }),

    intiliazeMarketChartRange : action((state,payload)=>{
      state.marketData = payload
    }),

    getCollection: thunk(async(actions, payload) => {
      const res =  await GetCurrencyList(); 
       actions.intiliazeCurencyList(res);
    }),

    getCMarketRate: thunk(async(actions, payload) => {
      const {data}= await axios.request(GetMarketChartRangeOptions);
      console.log(data);
       actions.intiliazeMarketChartRange(data);
    }),

  });