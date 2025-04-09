
"use client";
import { ChartArea } from "@/components/charts/chart-area";
import { ChartBar } from "@/components/charts/chart-bar";
import { ChartLine } from "@/components/charts/chart-line";
import { ChartPie } from "@/components/charts/chart-pie";
import ThoothukudiParkingStats from "@/components/custom/stats";
import ParkingStatusGrid from "@/components/custom/uppercards";

function Page() {
  return (
    <div className="flex flex-1 flex-col gap-2 p-2 bg-background md:gap-4 md:p-4 lg:gap-6 lg:p-6">
      {/* Additional Information Section */}
      <div className="w-full">
        <ThoothukudiParkingStats />
      </div>
      
      <div className="w-full">
        <ParkingStatusGrid />
      </div>

      {/* Top Charts Grid */}
      <div className="grid gap-2 md:gap-4 lg:gap-6">
        {/* Charts grid for mobile: single column, tablet: 2 columns, desktop: 3 columns */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6">
          <div className="w-full min-h-[250px] md:min-h-[300px]">
            <ChartArea />
          </div>
          <div className="w-full min-h-[250px] md:min-h-[300px]">
            <ChartPie />
          </div>
          <div className="w-full min-h-[250px] md:min-h-[300px] md:col-span-2 lg:col-span-1">
            <ChartBar />
          </div>
        </div>

        {/* Line chart takes full width */}
        <div className="w-full h-[250px] md:h-[300px] lg:h-[400px]">
          <ChartLine />
        </div>
      </div>
    </div>
  );
}

export default Page;
