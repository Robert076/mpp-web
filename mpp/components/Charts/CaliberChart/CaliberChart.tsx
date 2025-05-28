import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

const CaliberChart: React.FC<CaliberChartDataProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="90%" minHeight={400}>
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(0, 0, 0, 0.1)" />
        <XAxis
          dataKey="caliber"
          stroke="rgba(0, 0, 0, 0.9)"
          tickFormatter={(tick) => {
            return tick + "mm";
          }}
        />
        <YAxis dataKey="count" stroke="rgba(0, 0, 0, 0.9)" />
        <Bar dataKey="count" name="Total guns" stroke="rgba(0, 0, 0, 1)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CaliberChart;
