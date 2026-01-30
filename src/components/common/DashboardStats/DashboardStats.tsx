/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface StatsProps {
  stats: any;
}

export function DashboardStats({ stats }: StatsProps) {
  const chartData = [
    { name: "Active", total: stats.activeUser },
    { name: "Meals", total: stats.totalMeals },
    { name: "Categories", total: stats.totalCategories },
    { name: "Completed", total: stats.completeOrder },
    { name: "Cancelled", total: stats.cancelOrder },
  ];

  const cards = [
    { title: "Total Customers", value: stats.customer, color: "text-blue-500" },
    {
      title: "Completed Orders",
      value: stats.completeOrder,
      color: "text-green-500",
    },
    { title: "Total Meals", value: stats.totalMeals, color: "text-[#a3a380]" },
    { title: "Cancelled", value: stats.cancelOrder, color: "text-red-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Card key={i} className=" border-white/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-black ${card.color}`}>
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Graph */}
      <Card className="border-white/5 p-6">
        <CardHeader>
          <CardTitle className="text-xl font-black uppercase tracking-tight text-[#a3a380]">
            Performance <span className="text-white">Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-75 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#4b5563"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#4b5563"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={{ fill: "#ffffff05" }}
                contentStyle={{
                  backgroundColor: "#1f2120",
                  border: "1px solid #ffffff10",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="total"
                fill="#a3a380"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
