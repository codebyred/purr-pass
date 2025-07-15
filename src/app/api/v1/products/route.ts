import { connectToDatabase } from "@/db/mongoose";
import { CategoryModel, ProductModel } from "@/db/schema";
import { tryCatch } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { Product } from "@/lib/types";
import { defaultPagination } from "@/lib/const";

export async function GET(request: NextRequest) {

  type Result = {
    prev?: {
      page: number,
      limit: number
    },
    next?: {
      page: number,
      limit: number
    },
    products: {}
  }

  const [dbError, conn] = await tryCatch(connectToDatabase());

  if (dbError) {
    console.error("Database connection error:", dbError);
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }

  const { searchParams } = request.nextUrl;

  const categoryId = searchParams.get("categoryId")
  const categorySlug = searchParams.get("categorySlug");

  let page = Number(searchParams.get("page"));
  let limit = Number(searchParams.get("limit"));

  page = !isNaN(page) && page > 0 ? page : defaultPagination.page;
  limit = !isNaN(limit) && limit > 0 ? limit : defaultPagination.limit;

  const startIndex = (page - 1) * limit;

  let query = {};

  if (categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { error: "Invalid categoryId" },
        { status: httpStatus.BAD_REQUEST }
      );
    }
    query = { category: new mongoose.Types.ObjectId(categoryId) };
  } else if (categorySlug) {
    const category = await CategoryModel.findOne({ slug: categorySlug }).lean();
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: httpStatus.NOT_FOUND }
      );
    }
    query = { category: category._id };
  }
  const [countError, count] = await tryCatch(ProductModel.countDocuments(query));

  if (countError || !count) {
    console.error(countError)
    return NextResponse.json(
      { error: "Could not get products count" },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    )
  }

  const [queryError, queryResult] = await tryCatch(ProductModel
    .find(query)
    .limit(limit)
    .skip(startIndex)
    .populate("category")
    .lean()
    .exec()
  );

  if (queryError || !queryResult) {
    console.error(queryError)
    return NextResponse.json(
      { error: `Could Get Product` },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    )
  };

  const products = queryResult.map(({ _id: prodId, category: { _id: catId, ...catRest }, ...prodRest }) => ({
    id: prodId,
    category: {
      id: catId,
      ...catRest
    },
    ...prodRest
  }));

  const result: Result = {
    products: products
  }

  if (limit < count) {
    result.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    result.prev = {
      page: page - 1,
      limit
    }
  }

  return NextResponse.json(
    result,
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