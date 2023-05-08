import React, { useState, useEffect } from "react";
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

interface CoinInfo {
  name: string;
  symbol: string;
  price: string;
}

const App = (): JSX.Element => {
  const [coins, setCoins] = useState<CoinInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async (): Promise<void> => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets");
        if (!response.ok) {
          throw new Error("Failed to fetch prices");
        }
        const data = await response.json();

        const coinsData: Coin[] = data.data;
        const coinsInfo: CoinInfo[] = coinsData.map((coin: Coin) => {
          return {
            name: coin.name,
            symbol: coin.symbol,
            price: parseFloat(coin.priceUsd).toFixed(2),
          };
        });

        setCoins(coinsInfo);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return (): void => clearInterval(interval);
  }, []);

  return (
    <div className="parent_container">
      <h2>Live Prices</h2>
      {coins.slice(0, 5).map((coin: CoinInfo) => (
        <div className="container" key={coin.symbol}>
          <div className="coin-price">
            <div>
              <h3>$ {coin.price}</h3>
              <h3>{coin.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
