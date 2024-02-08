'use client'
import Image from 'next/image'
import { PieChart } from './chart/PieChart'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from 'react';


export default function Home() {
  const [date, setDate] = useState(new Date() as Date | null);

  useEffect(() => {

    var loginData = {
      email: "sophie@gmail.com",
      password: "1234"
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch("/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers 
    }).then(resp => {
      resp.text().then(token => {
        if (typeof window  !== "undefined" )
          window.localStorage.setItem('token', token)
      });
    })
  }, []);

  const moveBy = (n: number) => {
    if (date) {
      const newDate = new Date(date.getFullYear(), (date.getMonth() + n), 1)
      setDate(newDate);
    }
  }

  return (
    <main style={{ width: '100%', fontFamily: 'monospace' }}>
      <div style={{ width: '80em', margin: "0 auto" }}>
        <div style={{ width: '20em', margin: "0 auto", display: 'flex' }}>
          <button onClick={() => moveBy(-1)}>&lt;&lt;</button>
          <div>
            <DatePicker
              selected={date}
              onChange={setDate}
              dateFormat="MMM-yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
            /></div>
          <button onClick={() => moveBy(1)}>&gt;&gt;</button>
        </div>

        <PieChart date={date} />
      </div>
    </main>
  )
}
