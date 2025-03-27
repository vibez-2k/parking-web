"use client";

import * as React from "react";
import { PieChartIcon, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { type: "Cars", count: 350, fill: `hsl(${Math.random() * 360}, 50%, 50%)` },
  { type: "Bikes", count: 220, fill: `hsl(${Math.random() * 360}, 50%, 50%)` },
  { type: "Trucks", count: 150, fill: `hsl(${Math.random() * 360}, 50%, 50%)` },
  { type: "EVs", count: 100, fill: `hsl(${Math.random() * 360}, 50%, 50%)` },
  { type: "Others", count: 80, fill: `hsl(${Math.random() * 360}, 50%, 50%)` },
];

const chartConfig = {
  count: { label: "Count" },
  Cars: { label: "Cars", color: "hsl(var(--chart-1))" },
  Bikes: { label: "Bikes", color: "hsl(var(--chart-2))" },
  Trucks: { label: "Trucks", color: "hsl(var(--chart-3))" },
  EVs: { label: "Electric Vehicles", color: "hsl(var(--chart-4))" },
  Others: { label: "Others", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export function ChartPie() {
  const totalVehicles = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col    bg-blue-50/70 hover:bg-blue-100/50 transition-colors">

      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center justify-center gap-2">
          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          Vehicle Type Distribution
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="type" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVehicles.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Total Vehicles
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing distribution of parked vehicle types over the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
  