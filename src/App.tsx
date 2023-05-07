import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

interface Coin {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

const App = (): JSX.Element => {
  const [bitcoinPrice, setBitcoinPrice] = useState<string>("");
  const [litecoinPrice, setLitecoinPrice] = useState<string>("");
  const [ethereumPrice, setEthereumPrice] = useState<string>("");
  const [dogePrice, setDogePrice] = useState<string>("");

  useEffect(() => {
    const fetchPrices = async (): Promise<void> => {
      const response = await fetch("https://api.coincap.io/v2/assets");
      const data = await response.json();

      const bitcoin: Coin | undefined = data.data.find(
        (item: Coin) => item.symbol === "BTC"
      );
      setBitcoinPrice(parseFloat(bitcoin!.priceUsd).toFixed(2));

      const litecoin: Coin | undefined = data.data.find(
        (item: Coin) => item.symbol === "LTC"
      );
      setLitecoinPrice(parseFloat(litecoin!.priceUsd).toFixed(2));

      const ethereum: Coin | undefined = data.data.find(
        (item: Coin) => item.symbol === "ETH"
      );
      setEthereumPrice(parseFloat(ethereum!.priceUsd).toFixed(2));

      const doge: Coin | undefined = data.data.find(
        (item: Coin) => item.symbol === "DOGE"
      );
      setDogePrice(parseFloat(doge!.priceUsd).toFixed(2));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return (): void => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live Prices</h2>
      <div className="container">
        <div className="coin-price">
          <div>
            <h3>$ {bitcoinPrice}</h3>
            <h3>Bitcoin</h3>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="coin-price">
          <div>
            <h3>$ {litecoinPrice}</h3>
            <h3>LiteCoin</h3>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="coin-price">
          <div>
            <h3>$ {ethereumPrice}</h3>
            <h3>Ethereum</h3>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="coin-price">
          <div>
            <h3>$ {dogePrice}</h3>
            <h3>Doge</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
