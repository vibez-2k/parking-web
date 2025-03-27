"use client";
import { ChartArea } from '@/components/charts/chart-area';
import { ChartBar } from '@/components/charts/chart-bar';
import { ChartLine } from '@/components/charts/chart-line';
import { ChartPie } from '@/components/charts/chart-pie';
import ThoothukudiParkingStats from '@/components/custom/stats';
import ParkingStatusGrid from '@/components/custom/uppercards';


function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 bg-background ">
      {/* Additional Information Section */}
      <ThoothukudiParkingStats/>
      <ParkingStatusGrid />
      {/* Top Charts Grid */}
      <div className="grid gap-6 md:grid-cols-3 ">
        <ChartArea />
        <ChartPie />
        <ChartBar />
      </div>
      <div className="h-[400px] mb-5 ">
          <ChartLine />
      </div>
    </div>
  )
}

export default Page