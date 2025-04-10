"use client";

import { ShieldAlert, AlertTriangle, Car, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", violations: 24, incidents: 8, suspicious: 12 },
  { month: "February", violations: 31, incidents: 12, suspicious: 15 },
  { month: "March", violations: 19, incidents: 7, suspicious: 11 },
  { month: "April", violations: 26, incidents: 9, suspicious: 13 },
  { month: "May", violations: 22, incidents: 8, suspicious: 14 },
  { month: "June", violations: 28, incidents: 11, suspicious: 17 },
];

// Calculate total incidents and monthly average
const totalIncidents = chartData.reduce((acc, cur) => acc + cur.incidents, 0);
const avgIncidents = (totalIncidents / chartData.length).toFixed(1);

const chartConfig = {
  violations: {
    label: "Traffic Violations",
    color: "hsl(var(--chart-1))",
  },
  incidents: {
    label: "Security Incidents",
    color: "hsl(var(--chart-2))",
  },
  suspicious: {
    label: "Suspicious Activity",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function PoliceParkingChart() {
  return (
    <Card className="bg-blue-50/70 hover:bg-blue-100/50 transition-colors">
      <CardHeader className="flex flex-row items-top justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Security Monitoring</CardTitle>
          <CardDescription>Monthly parking enforcement and security data</CardDescription>
        </div>
        <ShieldAlert className="h-4 w-4 text-red-500" />
      </CardHeader>

      {/* Metric Display */}
      <CardContent className="flex flex-col items-center justify-center pb-4">
        <h2 className="text-3xl font-bold">{avgIncidents}</h2>
        <span className="text-muted-foreground text-sm">Avg Monthly Security Incidents</span>
      </CardContent>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="violations"
              type="natural"
              fill="var(--color-violations)"
              fillOpacity={0.4}
              stroke="var(--color-violations)"
              stackId="a"
            />
            <Area
              dataKey="incidents"
              type="natural"
              fill="var(--color-incidents)"
              fillOpacity={0.4}
              stroke="var(--color-incidents)"
              stackId="a"
            />
            <Area
              dataKey="suspicious"
              type="natural"
              fill="var(--color-suspicious)"
              fillOpacity={0.4}
              stroke="var(--color-suspicious)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Incident rate up 10.5% from last month
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}