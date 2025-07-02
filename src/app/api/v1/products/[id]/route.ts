import { NextRequest, NextResponse } from "next/server";
import httpStatus from "http-status";
import { connectToDatabase } from "@/db/mongoose";
import { ProductModel } from "@/db/schema";
import { tryCatch } from "@/lib/utils";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const [dbError] = await tryCatch(connectToDatabase());
  if (dbError) {
    console.error("Database connection error:", dbError);
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }

  const [queryError, queryResult] = await tryCatch(ProductModel.findById(params.id).lean());

  if (queryError || !queryResult) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: httpStatus.NOT_FOUND }
    );
  }

  const { _id, ...rest } = queryResult;

  return NextResponse.json(
    { product: {
        id: _id,
        ...rest
    }},
    { status: httpStatus.OK }
  );
}
