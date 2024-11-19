'use client';

import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface StockChartProps {
    selectedStocks: string[];
    priceData: { [stock: string]: number };
}

interface ChartDataPoint {
    time: string;
    [stock: string]: number | string;
}

const StockChart: React.FC<StockChartProps> = ({
    selectedStocks,
    priceData,
}) => {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString();
            const newDataPoint: ChartDataPoint = { time: timestamp };

            selectedStocks.forEach((stock) => {
                newDataPoint[stock] = priceData[stock];
            });

            setChartData((prevData) => [...prevData, newDataPoint]);
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedStocks, priceData]);

    return (
        <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedStocks.map((stock, index) => (
                        <Line
                            key={stock}
                            type="monotone"
                            dataKey={stock}
                            stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
                            dot={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockChart;
