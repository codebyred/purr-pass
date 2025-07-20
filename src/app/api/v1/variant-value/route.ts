import { connectToDatabase } from "@/db/mongoose";
import { tryCatch } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import httpStatus from "http-status";
import { VariantValueModel } from "@/db/schema";

export async function GET(request: NextRequest) {

    const [dbError, conn] = await tryCatch(connectToDatabase());

    if (dbError) {
        console.error("Database connection error:", dbError);
        return NextResponse.json(
            { error: "Failed to connect to database" },
            { status: httpStatus.INTERNAL_SERVER_ERROR }
        );
    }

    const [variantValueError, variantValues] = await tryCatch(VariantValueModel.find())

    if (variantValueError) {
        console.error(variantValueError.message);
        return NextResponse.json({ error: variantValueError.message }, { status: httpStatus.INTERNAL_SERVER_ERROR })
    } else if (!variantValues) {
        const message = "Variant value is empty";
        console.error(message);
        return NextResponse.json({ error: message }, { status: httpStatus.INTERNAL_SERVER_ERROR })
    }

    return NextResponse.json({ variantValues }, {status: httpStatus.OK})

}

export async function POST(request: NextRequest) {
    const [dbError, conn] = await tryCatch(connectToDatabase());

    if (dbError) {
        console.error("Database connection error:", dbError);
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

    const variantValueData = JSON.parse(requestBodyContent);

    const [variantValueError, variantValue] = await tryCatch(VariantValueModel.create(variantValueData));

    if (variantValueError) {
        console.error(variantValueError.message);
        return NextResponse.json({ error: variantValueError.message }, { status: httpStatus.INTERNAL_SERVER_ERROR })
    } else if (!variantValue) {
        const message = "Variant value is empty";
        console.error(message);
        return NextResponse.json({ error: message }, { status: httpStatus.INTERNAL_SERVER_ERROR })
    }

    return NextResponse.json({
        message: "Variant Value successfully created",
        variantValue
    }, {status: httpStatus.OK})

}