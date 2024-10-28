import React from "react";
import _ from "lodash";
import axios from "axios";

import CURRENCIES from "@constants/currencies";

import ObjectOutput from "@components/ObjectOutput";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MySwitch from "@components/MySwitch";

const CurrencyConverter = () => {
  const [amount, setAmount] = React.useState(1);
  const [baseCurrency, setBaseCurrency] = React.useState("USD");
  const [formatOutput, setFormatOutput] = React.useState(true);

  const [convertedAmount, setConvertedAmount] = React.useState({});
  const [output, setOutput] = React.useState({});

  const [search, setSearch] = React.useState("");

  const calculateLatestRatesAmount = React.useMemo(
    () =>
      _.debounce(async (base, amount, formatOutput) => {
        try {
          let ratesData = null;

          const localStorageData = localStorage.getItem(`fxRatesData${base}`);
          if (localStorageData) {
            const { timestamp, data } = JSON.parse(localStorageData);
            if (Date.now() - timestamp < 3600000) {
              ratesData = data;
            } else {
              localStorage.removeItem(`fxRatesData${base}`);
            }
          }

          if (!ratesData) {
            const { data } = await axios.get(
              `https://api.fxratesapi.com/latest?base=${base}&api_key=fxr_live_7907ff04e56a996e23df585446773a4b7508`,
            );

            localStorage.setItem(
              `fxRatesData${base}`,
              JSON.stringify({ timestamp: Date.now(), data }),
            );

            ratesData = data;
          }

          const convertedAmount = {};
          CURRENCIES.forEach((currency) => {
            if (currency.code.length !== 3 || !formatOutput) {
              convertedAmount[
                `${currency.code} - ${currency.name} (${currency.symbol})`
              ] = ratesData.rates[currency.code] * amount;
              return;
            }

            // format to 000,000.00
            let formattedAmount = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: base,
            }).format(ratesData.rates[currency.code] * amount);

            // remove the first character
            formattedAmount = formattedAmount.slice(1);

            convertedAmount[
              `${currency.code} - ${currency.name} (${currency.symbol})`
            ] = formattedAmount;
          });

          setConvertedAmount(convertedAmount);
        } catch (error) {
          console.error(error);
        }
      }, 500),
    [],
  );

  React.useEffect(() => {
    const calculator = async () => {
      await calculateLatestRatesAmount(baseCurrency, amount, formatOutput);
    };

    calculator();
  }, [amount, baseCurrency, calculateLatestRatesAmount, formatOutput]);

  React.useEffect(() => {
    const filteredOutput = {};
    Object.entries(convertedAmount).forEach(([key, value]) => {
      if (key.toLowerCase().includes(search.toLowerCase())) {
        filteredOutput[key] = value;
      }
    });

    setOutput(filteredOutput);
  }, [search, convertedAmount]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Enter the amount and currency you want to convert"
        />

        <MyInput
          label="Amount"
          type="number"
          value={amount}
          onChange={setAmount}
        />

        <MyInput
          label="Base Currency"
          type="text"
          value={baseCurrency}
          onChange={setBaseCurrency}
          list="currencies"
        />

        <datalist id="currencies">
          {CURRENCIES.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name} ({currency.symbol})
            </option>
          ))}
        </datalist>

        <MySwitch
          label="Format Output"
          checked={formatOutput}
          onChange={setFormatOutput}
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header
          title="Output"
          helper="Converted amount in all available currencies"
        />

        <MyInput
          label="Search"
          type="text"
          value={search}
          onChange={setSearch}
          placeholder="Search currency"
        />

        <div className="overflow-y-auto h-full max-h-[1000px]">
          <ObjectOutput object={output} beautifyKey={false} />
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

CurrencyConverter.title = "Currency Converter";
export default CurrencyConverter;
