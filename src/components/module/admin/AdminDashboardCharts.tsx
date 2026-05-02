"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type StatsData = {
  activeUser: number;
  suspendUser: number;
  customer: number;
  provider: number;
  completeOrder: number;
  cancelOrder: number;
  totalMeals: number;
  totalCategories: number;
};

const distributionConfig = {
  customers: { label: "Customers", color: "#3b82f6" },
  providers: { label: "Providers", color: "#a3a380" },
  active: { label: "Active", color: "#22c55e" },
  suspended: { label: "Suspended", color: "#ef4444" },
} satisfies ChartConfig;

const operationsConfig = {
  value: { label: "Count", color: "#a3a380" },
} satisfies ChartConfig;

export default function AdminDashboardCharts({ stats }: { stats: StatsData }) {
  const userDistribution = [
    {
      name: "Customers",
      value: stats.customer ?? 0,
      fill: "var(--color-customers)",
    },
    {
      name: "Providers",
      value: stats.provider ?? 0,
      fill: "var(--color-providers)",
    },
    {
      name: "Active",
      value: stats.activeUser ?? 0,
      fill: "var(--color-active)",
    },
    {
      name: "Suspended",
      value: stats.suspendUser ?? 0,
      fill: "var(--color-suspended)",
    },
  ];

  const operationsData = [
    { name: "Completed", value: stats.completeOrder ?? 0 },
    { name: "Cancelled", value: stats.cancelOrder ?? 0 },
    { name: "Meals", value: stats.totalMeals ?? 0 },
    { name: "Categories", value: stats.totalCategories ?? 0 },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_1.35fr]">
      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-black uppercase tracking-tight">
            User <span className="text-[#a3a380]">Distribution</span>
          </CardTitle>
          <CardDescription>
            Customer, provider and account status split
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={distributionConfig}
            className="mx-auto h-80 w-full max-w-sm"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={userDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                strokeWidth={4}
              >
                {userDistribution.map((item) => (
                  <Cell key={item.name} fill={item.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {userDistribution.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  {item.name}
                </div>
                <p className="mt-2 text-2xl font-black text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-black uppercase tracking-tight">
            Platform <span className="text-[#a3a380]">Operations</span>
          </CardTitle>
          <CardDescription>
            Orders and content performance snapshot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={operationsConfig} className="h-80 w-full">
            <BarChart data={operationsData}>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                fill="var(--color-value)"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
