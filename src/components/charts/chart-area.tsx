"use client";

import { Activity, TrendingUp } from "lucide-react";
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
  { month: "January", desktop: 186, mobile: 80, parking: 120 },
  { month: "February", desktop: 305, mobile: 200, parking: 150 },
  { month: "March", desktop: 237, mobile: 120, parking: 110 },
  { month: "April", desktop: 73, mobile: 190, parking: 130 },
  { month: "May", desktop: 209, mobile: 130, parking: 140 },
  { month: "June", desktop: 214, mobile: 140, parking: 135 },
];

// Calculate total and average parking usage
const totalParkingUsage = chartData.reduce((acc, cur) => acc + cur.parking, 0);
const avgParkingUsage = (totalParkingUsage / chartData.length).toFixed(1);

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  parking: {
    label: "Parking",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ChartArea() {
  return (
    <Card className="bg-blue-50/70 hover:bg-blue-100/50 transition-colors">
      <CardHeader className="flex flex-row items-top justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Area Chart - Parking Usage</CardTitle>
          <CardDescription>Showing average parking lot usage for the last 6 months</CardDescription>
        </div>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      {/* Metric Display */}
      <CardContent className="flex flex-col items-center justify-center pb-4">
        <h2 className="text-3xl font-bold">{avgParkingUsage}</h2>
        <span className="text-muted-foreground text-sm">Avg Parking Usage</span>
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
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey="parking"
              type="natural"
              fill="var(--color-parking)"
              fillOpacity={0.4}
              stroke="var(--color-parking)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
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
