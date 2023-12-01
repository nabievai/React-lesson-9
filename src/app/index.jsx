import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Button from '../components/button'
import Input from '../components/input'
import CurrencySelect from '../components/currency-select';
import {API, REQUEST_HEADERS} from '../api/endpoints'
import SwapIcon from '../components/swapIcon'
import Loader from '../components/loader';


function App() {
  const [fromOption, setFromOption] = useState(null)
  const [toOption, setToOption] = useState(null)
  const [symbolsOptions, setSymbolsOptions] = useState([])
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [isConverting, setIsConverting] = useState(false)

const handleSwapCurrency = () => {
  setFromOption(toOption)
  setToOption(fromOption)
}

useEffect( () => {
  ( async() => {
    const symbols = await getSymbols()
    const options = transformSymbolsDataToOptions(symbols)
    setSymbolsOptions(options)
  })()
}, [])

const getSymbols = async () => {
  try {
    const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS)
    const data = await res.json()
    return data.symbols
  } catch (error) {
    console.error('Error fetching symbols:', error)
    return {}
  }
};

const transformSymbolsDataToOptions = (symbolsObj) => {
  return Object.keys(symbolsObj).map(item => {
    return {
      value: item,
      label: item
    }
  })
}

const handelConvertCurrency = async () => {
  try {
    if (!amount || !toOption || !fromOption) {
      return
    }

    setIsConverting(true)

    const res = await fetch(API.CURRENCY.convert(toOption.value, fromOption.value, amount), REQUEST_HEADERS)
    const data = await res.json()

    setResult({
      amount: data.query.amount,
      result: data.result,
      from: data.query.from,
      to: data.query.to
    });
  } catch (error) {
    console.error('Error converting currency:', error)
  } finally {
    setIsConverting(false);
  }
}



  return (
    <div className={styles['currensy-converter-wrap']}>
      <h1>Currency Converter</h1>
      <Input 
        type='number'
        className={styles['input']}
        label='Enter Amount'
        value={amount}
        onChange={val => setAmount(val)}
        disabled={isConverting}
      />
        <div className={styles['from-to-select']}>
          <CurrencySelect  
            label='From'
            value={fromOption} 
            placeholder={'USD'}
            onChange={val => setFromOption(val)} 
            options={symbolsOptions} 
            disabled={isConverting}
          />
          <div className={styles['icon-arrows']} >
            <SwapIcon onClick={handleSwapCurrency} />
          </div>
          
          <CurrencySelect  
            label='To'
            value={toOption}
            placeholder={'USD'} 
            onChange={val => setToOption(val)} 
            options={symbolsOptions}
            disabled={isConverting} 
          />
        </div>
        {result && (
        <div className={styles['result-block']}>
          <h2>Result:</h2>
          <p>{`${amount} ${result.from} = ${result.result} ${result.to}`}</p>
        </div>
      )}
      <Button 
      onClick={handelConvertCurrency}
      className={styles['convert-btn']}
      disabled={isConverting || !amount || !toOption || !fromOption}
      >
        {isConverting ? 
        <Loader /> 
        : 'Get Exchange Rate'}
      </Button>
    </div>
  );
}

export default App;