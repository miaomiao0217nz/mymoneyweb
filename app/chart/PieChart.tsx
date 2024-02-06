'use client'
import { useEffect, useRef, useState } from "react";
import { Transaction } from "../model/Transaction"
import {
    Doughnut,
    getElementAtEvent
} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { TransactionList } from "../transactions/TransactionList";
ChartJS.register(ArcElement, Tooltip, Legend);

const hashCode = (str: string) => {
    var hash = 0,
        i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
    }
    return hash;
}
const toColor = (num: number) => {
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = 1;//((num & 0xFF000000) >>> 24) / 125;
    return "rgba(" + [r, g, b, a].join(",") + ")";
}


const unique = (o: any[]) => {
    return [... new Set(o)];
}
const sum = (partialSum: number, a: number) => partialSum + a;

const getData = (year: number, month: number, setData: (data: any) => any) => {
    fetch(`/api/money/${year}/${month}`).then(
        resp => {
            resp.json().then(ts => setData(ts))
        }
    );
}

const excludes = ['Salary', 'null', 'Transfer', 'House'];

export const PieChart = ({ date }: { date: Date | null }) => {
    const [transactions, setTransactions] = useState([] as Transaction[]);
    const [selectedCategory, setSelectedCategory] = useState(undefined as string | undefined);

    useEffect(() => {
        if (date)
            getData(date.getFullYear(), date.getMonth() + 1, setTransactions);
    }, [date]);

    const trans = transactions.filter(t => !excludes.includes(t.category));
    const categories = unique(trans.map(t => t.category));

    const expenses = categories.map((c, idx) => {
        return [c, trans.filter(t => t.category === c).map(t => t.amount).reduce(sum, 0), toColor(hashCode(c))];
    }).sort((a, b) => a[1] - b[1]);

    const data = {
        labels: expenses.map(e => e[0]),
        datasets: [{
            data: expenses.map(e => e[1]),
            backgroundColor: expenses.map(e => e[2])
        }
        ]
    }

    const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = chartRef;

        if (!chart) {
            return;
        }

        const slice = getElementAtEvent(chart, event)[0]
        if (slice) {
            const category = expenses[slice.index][0]
            console.log(category)
            setSelectedCategory(category)
        }
        else
            setSelectedCategory(undefined)
    };

    const chartRef = useRef<ChartJS>(null);

    let selectedTrans = trans;
    if (selectedCategory)
        selectedTrans = transactions.filter(t => t.category === selectedCategory)

    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '500px', margin: "0 auto" }}>
                {trans.length > 0 &&
                    <Doughnut
                    //@ts-ignore
                        ref={chartRef}
                        onClick={onClick}
                        data={data} />
                }

                {trans.length === 0 &&
                    <h3 style={{ textAlign: 'center' }}>No data available</h3>
                }
            </div>
            {selectedTrans.length > 0 &&
                <TransactionList transactions={selectedTrans} />
            }
        </div>
    );

}

