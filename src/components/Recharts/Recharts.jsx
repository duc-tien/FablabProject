import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import style from './Recharts.module.scss';
import classNames from 'classnames/bind';
const css = classNames.bind(style);

function Recharts({ data }) {
  let xAxisInterval = Math.round(data.length / 6);

  return (
    <>
      <div className={css('chart')}>
        <LineChart
          width={1200}
          height={300}
          data={data}
          margin={{
            right: 100,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeStamp" interval={xAxisInterval} />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line activeDot={{ r: 5 }} dataKey="oee" stroke="#1488DB" strokeWidth={3} dot={true} />
        </LineChart>
      </div>
    </>
  );
}

export default Recharts;
