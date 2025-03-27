"use client";
import { ChartArea } from '@/components/charts/chart-area';
import { ChartBar } from '@/components/charts/chart-bar';
import { ChartLine } from '@/components/charts/chart-line';
import { ChartPie } from '@/components/charts/chart-pie';
import {
  Card,
  CardContent
} from "@/components/ui/card";

function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 bg-background ">
      {/* Additional Information Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Card
            key={item}
            className="bg-muted/50 -dashed hover:-primary transition-colors"
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 text-muted-foreground">
                Additional Information {item}
              </div>
              <div className="text-xl font-semibold">
                Data Point {item}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Top Charts Grid */}
      <div className="grid gap-6 md:grid-cols-3 ">
        <ChartArea />
        <ChartPie />
        <ChartBar />
      </div>
      <div className="h-[400px] ">
          <ChartLine />
      </div>
    </div>
  )
}

export default Page