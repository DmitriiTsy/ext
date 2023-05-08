import React, { useState, useEffect } from "react";
import "./App.css";

// Define interfaces for the Coin and CoinInfo objects

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
  // Define state variables for the coins and any error messages
  const [coins, setCoins] = useState<CoinInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Define the effect that will fetch data from the coinggeko API(https://api.coincap.io/v2/assets) and update the state

  useEffect(() => {
    const fetchPrices = async (): Promise<void> => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets");
        if (!response.ok) {
          throw new Error("Failed to fetch prices");
        }
        const data = await response.json();
        // Parse the response data to extract the information we need
        const coinsData: Coin[] = data.data;
        const coinsInfo: CoinInfo[] = coinsData.map((coin: Coin) => {
          return {
            name: coin.name,
            symbol: coin.symbol,
            price: parseFloat(coin.priceUsd).toFixed(2),
          };
        });

        // Update the state with the new coin information and clear any errors
        setCoins(coinsInfo);
        setError(null);
      } catch (error: any) {
        // If there is an error, update the error state with the message
        setError(error.message);
      }
    };
    // Call the fetchPrices function and set up an interval to call it again every 60 seconds
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    // Return a cleanup function that clears the interval
    return (): void => clearInterval(interval);
  }, []);
  // Render the component using map + slice to extract top 5 currencies in the list
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
