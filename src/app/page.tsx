'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import StocksList from '../components/StocksList';
import StockChart from '../components/StockChart';

interface PriceData {
  [stock: string]: number;
}

const STOCKS_API_URL =
  process.env.NEXT_PUBLIC_STOCKS_API_URL ||
  'http://localhost:8000/api/v1/stock';
const WEBSOCKET_URL =
  process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8000/api/v1/ws';

export default function Home() {
  const [stocks, setStocks] = useState<string[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [priceData, setPriceData] = useState<PriceData>({});

  useEffect(() => {
    fetch(STOCKS_API_URL)
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);
    ws.onmessage = (event) => {
      const data: PriceData = JSON.parse(event.data);
      setPriceData((prevData) => ({
        ...prevData,
        ...data,
      }));
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex-grow">
      <Header />
      <div className="flex">
        <div className="w-full md:w-1/4 h-screen overflow-y-auto bg-gray-100 border-r border-gray-300 p-4">
          <StocksList
            stocks={stocks}
            selectedStocks={selectedStocks}
            setSelectedStocks={setSelectedStocks}
          />
        </div>
        <main className="flex-grow p-4">
          <StockChart selectedStocks={selectedStocks} priceData={priceData} />
        </main>
      </div>
    </div>
  );
}
