import { connectToDatabase } from "@/db/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
try {
    await connectToDatabase();
    return NextResponse.json({ message: "Database connected successfully" }, { status: 200 });
  } catch (err) {
    console.error("Database connection error:", err);
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
    try {
        // if(request.body)
        //     console.log(JSON.parse(request.body?.toString()))

        await connectToDatabase();
    } catch (err: unknown) {

    }


}