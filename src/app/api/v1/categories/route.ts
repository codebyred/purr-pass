import { connectToDatabase } from "@/db/mongoose";
import { CategoryModel } from "@/db/schema";
import { tryCatch } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import httpStatus from "http-status"
import { defaultPagination } from "@/lib/const";

export async function GET(request: NextRequest) {

    const [dbError, conn] = await tryCatch(connectToDatabase());

    if (dbError) {
        console.error("Database connection error:", dbError);
        return NextResponse.json(
            { error: "Failed to connect to database" },
            { status: httpStatus.INTERNAL_SERVER_ERROR }
        );
    }

    const { searchParams } = request.nextUrl;

    const parentId = searchParams.get("parentId")

    let page = Number(searchParams.get("page"));
    let limit = Number(searchParams.get("limit"));

    page = !isNaN(page) && page > 0 ? page : defaultPagination.page;
    limit = !isNaN(limit) && limit > 0 ? limit : defaultPagination.limit;

    let query = {}

    if (parentId){
        query = {parentId}
    }

    const [queryError, queryResult] = await tryCatch(CategoryModel.find().lean());

    if (queryError || !queryResult) {
        return NextResponse.json(
            { error: "Could Get Categories" },
            { status: httpStatus.INTERNAL_SERVER_ERROR }
        )
    };

    return NextResponse.json(
        {
            categories: queryResult.map(({_id, ...rest}) => ({
                id: _id,
                ...rest
            }))
        },
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

    const categoryData = JSON.parse(requestBodyContent);

    const [savingError, savedCategory] = await tryCatch(CategoryModel.create(categoryData));

    if (savingError) {
        console.error("Saving category to database", savingError?.message);
        return NextResponse.json(
            { error: "Category could not be saved" },
            { status: httpStatus.INTERNAL_SERVER_ERROR }
        );
    }

    return NextResponse.json(
        { message: "Category created successfully", category: savedCategory },
        { status: httpStatus.CREATED }
    );
}