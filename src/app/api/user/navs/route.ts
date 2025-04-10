import { NextResponse } from "next/server";
import { navlinks } from "@/utils/route-roles";
export async function POST(request: Request) {
  try {
    const { role } = await request.json();
    const navMain = navlinks[role];
    return NextResponse.json(navMain, { status: 200 });
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
