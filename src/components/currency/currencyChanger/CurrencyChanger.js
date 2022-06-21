// стилі і картинки 
import './currencyChanger.css';
import euroLogo from '../../../imgs/Euro-logo.png';
import usdLogo from '../../../imgs/USD-logo.png';
import plnLogo from '../../../imgs/PLN-logo.png';
// хуки 
import {useState, useEffect, useMemo} from 'react';
// Компоненти
import InputLayout from "../inputLayout/InputLayout";

const CurrencyChanger = () => {
    // к-сть валюти першого інпута 
    const [amount1, setAmount1] = useState('');
    // валюта першого інпута 
    const [currency1, setCurrency1] = useState('UAH');
    // к-сть валюти другого інпута 
    const [amount2, setAmount2] = useState('');
    // валюта другого інпута 
    const [currency2, setCurrency2] = useState('USD');
    // база даних: курси всіх валют 
    const [currenciesRates, setCurrenciesRates] = useState([]);

    // форматування кількості цифр після коми 
    const formatNumber = (num) => {
        return num.toFixed(2)
    }
 
    const showValue = (value) => {
        // записуємо значення з інпута в amount1
        setAmount1(value);
         // курс валюти першого селекта 
        const currencyRate1 = currenciesRates.rates[`${currency1}`];
        // курс валюти другого селекта 
        const currencyRate2 = currenciesRates.rates[`${currency2}`];
        // к-сть валюти першого інпута * курс валюти другого / на курс валюти першого 
        setAmount2(formatNumber(+value * currencyRate2 / currencyRate1))
    }
    const showCurrencyValue = (value) => {
        setCurrency1(value)
        const currencyRate1 = currenciesRates.rates[`${value}`];
        const currencyRate2 = currenciesRates.rates[`${currency2}`];
        setAmount2(formatNumber(amount1 * currencyRate2 / currencyRate1))
    }

    const showValue2 = (value) => {
        setAmount2(value)
        const currencyRate1 = currenciesRates.rates[`${currency1}`];
        const currencyRate2 = currenciesRates.rates[`${currency2}`];
        setAmount1(formatNumber(+value * currencyRate1 / currencyRate2))
    }
    const showCurrencyValue2 = (value) => {
        setCurrency2(value)
        const currencyRate2 = currenciesRates.rates[`${value}`];
        const currencyRate1 = currenciesRates.rates[`${currency1}`];
        setAmount2(formatNumber(amount1 * currencyRate2 / currencyRate1))
    }

    // отримуємо дані з сервера при першій загрузці сторінки 
    useEffect(() => {
        fetch('https://api.exchangerate.host/latest')
            .then(data => data.json())
            .then(setCurrenciesRates) 
    }, [])

    const show = useMemo(  () => {
        if (currenciesRates.rates) {
        // сервер повертає курси валют відносно євро. Щоб встановити курс валют щодо гривні, переводимо.
          const oneUsdInEuro = 1 / currenciesRates.rates.USD
          const onePlnInEuro = 1 / currenciesRates.rates.PLN
          return (
              <>
                <li>
                <img className='currency-logo' src={euroLogo} alt="currency-logo" />
                    1 євро - {formatNumber(currenciesRates.rates.UAH)} грн. 
                </li>
                <li>
                <img className='currency-logo' src={usdLogo} alt="currency-logo" />
                    1 долар - {formatNumber(oneUsdInEuro * currenciesRates.rates.UAH)} грн. 
                </li>
                <li>
                <img className='currency-logo' src={plnLogo} alt="currency-logo" />
                    1 польський злотий - {formatNumber(onePlnInEuro * currenciesRates.rates.UAH)} грн. 
                </li>
              </>
          )
        }
      }, [currenciesRates.rates])
    
    return (
        <div className="converter-container">
            <h1 className='converter-header-title'>Конвертер валют</h1>
            <h2 className='converter-header-subtitle'>Офіційний курс гривні щодо іноземних валют (станом на {currenciesRates.date} )</h2>
            <ul  className='converter-header-list'>
                {show}
            </ul>
                <InputLayout currencies={currenciesRates} amount={amount1} currency={currency1} showValue={showValue} showCurrencyValue={showCurrencyValue} />
                <InputLayout currencies={currenciesRates} amount={amount2} currency={currency2} showValue={showValue2} showCurrencyValue={showCurrencyValue2} />
        </div>
    )
}

export default CurrencyChanger;