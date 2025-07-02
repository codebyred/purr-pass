import { connectToDatabase } from "@/db/mongoose";
import { ProductModel } from "@/db/schema";
import { tryCatch } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  const [dbError, conn] = await tryCatch(connectToDatabase());

  if (dbError) {
    console.error("Database connection error:", dbError);
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }

  const [queryError, queryResult] = await tryCatch(ProductModel.find().lean());

  if (queryError || !queryResult) {
    return NextResponse.json(
      { error: "Could Get Categories" },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    )
  };

  return NextResponse.json(
    { products: queryResult.map(({_id, ...rest})=>({
      id: _id,
      ...rest
    })) },
    { status: httpStatus.OK }
  );
}

export async function POST(request: NextRequest) {

  if (!request.body) {
    return NextResponse.json(
      { error: "No request body found" },
      { status: httpStatus.BAD_REQUEST }
    );
  }

  const [dbError, conn] = await tryCatch(connectToDatabase());

  if (dbError) {
    console.error("Database connection error:", dbError.message);
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }

  const [parseError, requestBodyContent] = await tryCatch(request.text());

  if (parseError || !requestBodyContent) {
    console.error("Error parsing using request.text()", parseError?.message);
    return NextResponse.json(
      { error: "Error parsing request body" },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }

  const productData = JSON.parse(requestBodyContent);

  const [savingError, savedProduct] = await tryCatch(ProductModel.create(productData));

  if (savingError) {
    console.error("Saving product to database", savingError?.message);
    return NextResponse.json(
      { error: "Product could not be saved" },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }

  return NextResponse.json(
    { message: "Product created successfully", product: savedProduct },
    { status: httpStatus.CREATED }
  );
}