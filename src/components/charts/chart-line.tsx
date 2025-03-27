"use client"

import { LineChartIcon, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartLine() {
  return (
    <Card className="flex flex-col bg-blue-50/70 hover:bg-blue-100/50 transition-colors">

      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2"> 
          <LineChartIcon className="h-4 w-4 text-muted-foreground" />
          Line Chart - Multiple</CardTitle>
        <CardDescription className="text-center">January - June 2024</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <ResponsiveContainer width="100%" height={300}>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 0,
                right: 0,
                top: 10,
                bottom: 0
              }}
            >
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                className="text-xs"
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line 
                dataKey="desktop" 
                type="monotone" 
                stroke="var(--color-desktop)" 
                strokeWidth={2} 
                dot={false} 
              />
              <Line 
                dataKey="mobile" 
                type="monotone" 
                stroke="var(--color-mobile)" 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}