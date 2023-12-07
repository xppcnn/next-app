"use client";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const Chart = ({ open, inProgress, closed }: Props) => {
  const data: { label: string; value: number }[] = [
    {
      label: "Open Issues",
      value: open,
    },
    {
      label: "In  Progress Issues",
      value: inProgress,
    },
    {
      label: "Close Issues",
      value: closed,
    },
  ];
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={150} height={40} data={data}>
            <XAxis dataKey="label"> </XAxis>
            <YAxis />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
