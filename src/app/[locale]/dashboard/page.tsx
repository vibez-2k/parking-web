"use client";
import { ChartArea } from "@/components/charts/chart-area";
import { ChartBar } from "@/components/charts/chart-bar";
import { ChartLine } from "@/components/charts/chart-line";
import { ChartPie } from "@/components/charts/chart-pie";
import { PoliceParkingChart } from "@/components/charts/policechart1";
import PoliceParkingStats from "@/components/charts/policechart2";
import PoliceStatusGrid from "@/components/charts/policechart3";
import { UserAnalytics } from "@/components/charts/userchart2";
import { UserParkingHistory } from "@/components/charts/userhart1";
import ThoothukudiParkingStats from "@/components/custom/stats";
import ParkingStatusGrid from "@/components/custom/uppercards";
import { useUserStore } from "@/store/userStore";

function Page() {
  const { role } = useUserStore();

  // Render different dashboard content based on user role
  const renderDashboardContent = () => {
    switch (role) {
      case "Super Admin":
        return (
          <>
            {/* Security and Police Related Stats */}
            <div className="w-full">
              <PoliceParkingStats />
            </div>

            <div className="w-full">
              <PoliceStatusGrid />
            </div>

            {/* Security Analytics Charts */}
            <div className="grid gap-2 md:gap-4 lg:gap-6">
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
              <div className="w-full h-[250px] md:h-[300px] lg:h-[400px]">
                <PoliceParkingChart />
              </div>
            </div>
          </>
        );

      case "User":
        return (
          <>
            {/* Venue Specific Stats */}
            <div className="w-full">
              <ThoothukudiParkingStats />
              <br />
              <UserParkingHistory />
              <br />
              <UserAnalytics />
            </div>

            {/* Venue Performance Charts */}
            <div className="grid gap-2 md:gap-4 lg:gap-6">

              <div className="w-full h-[250px] md:h-[300px]">
                <ChartLine />
              </div>
            </div>
          </>
        );

      case "Venue Owner":
        return (
          <>
            {/* User Specific Information */}
            <div className="w-full">
              <ThoothukudiParkingStats />
              <br />
              <ParkingStatusGrid />
            </div>

            {/* Basic Usage Stats */}
            <div className="grid gap-2 md:gap-4 lg:gap-6">
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
              <div className="w-full h-[250px] md:h-[300px] lg:h-[400px]">
                <ChartLine />
              </div>
            </div>
          </>
        );

      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-2 p-2 bg-background md:gap-4 md:p-4 lg:gap-6 lg:p-6">
      {renderDashboardContent()}
    </div>
  );
}

export default Page;
