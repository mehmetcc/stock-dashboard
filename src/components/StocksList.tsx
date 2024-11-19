'use client';

import { ChangeEvent } from 'react';

interface StocksListProps {
    stocks: string[];
    selectedStocks: string[];
    setSelectedStocks: React.Dispatch<React.SetStateAction<string[]>>;
}

const StocksList: React.FC<StocksListProps> = ({
    stocks,
    selectedStocks,
    setSelectedStocks,
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const stock = event.target.name;
        if (event.target.checked) {
            setSelectedStocks([...selectedStocks, stock]);
        } else {
            setSelectedStocks(selectedStocks.filter((s) => s !== stock));
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-lg font-semibold mb-2">Select Stocks</h2>
            <ul className="space-y-1">
                {stocks.map((stock) => (
                    <li key={stock}>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name={stock}
                                checked={selectedStocks.includes(stock)}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            {stock}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StocksList;
