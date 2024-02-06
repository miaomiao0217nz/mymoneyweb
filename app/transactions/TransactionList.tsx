import {  useState,useEffect } from 'react';
import { Transaction } from '../model/Transaction';


export const TransactionList=  ({transactions}:{transactions:Transaction[]})=>{

    return (
        <div style={{marginTop:'20px'}}>
            <h3>Transactions</h3>
            <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Details</th>
                        <th>Particulars</th>
                        <th>Code</th>
                        <th>Reference</th>
                        <th>Amount</th>
                        <th>Tag</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                {
                    transactions && transactions.length>0 &&
                    transactions.map((t,idx)=>{

                        return (
                            <tr key={idx}>
                                <td>{t.date}</td>
                                <td>{t.details}</td>
                                <td>{t.particulars}</td>
                                <td>{t.code}</td>
                                <td>{t.reference}</td>
                                <td >{t.amount}</td>
                                <td>{t.tags}</td>
                                <td>{t.category}</td>
                            </tr>
                        )
                    })
                }
                    { transactions && transactions.length>0 &&
                    <tr>
                        <th>Total</th>
                        <th  colSpan={7} style={{textAlign:'right'}}>
                            {transactions.map(t=>t.amount).reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}
                        </th>
                    </tr>
                    }
                </tbody>
            </table>
            </div>
    );
}

