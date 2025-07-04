import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import { tryCatch } from "@/lib/utils";
import httpStatus from "http-status"

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {

    const [formDataError, formData] = await tryCatch(req.formData());

    if (formDataError || !formData) {
        console.error("Form data error", formDataError?.message);
        return NextResponse.json({
            error: "Invalid formdata sent"
        }, {
            status: httpStatus.BAD_REQUEST
        })
    }

    const file = formData.get("file") as File | null

    if (!file) {
        return NextResponse.json({
            error: "Invalid file format"
        }, {
            status: httpStatus.BAD_REQUEST
        })
    }

    const [bufferError, arrayBuffer] = await tryCatch(file.arrayBuffer());

    if (bufferError || !arrayBuffer) {
        console.error("Error resolving file array buffer", bufferError?.message);
        return NextResponse.json({
            error: "File Error"
        }, {
            status: httpStatus.INTERNAL_SERVER_ERROR
        })
    }

    const buffer = Buffer.from(arrayBuffer);

    const [uploadError, uploaded] = await tryCatch(imagekit.upload({
        file: buffer,
        fileName: file.name
    }))

    if (uploadError || !uploaded) {
        console.error("Error uploading file to imagekit", uploadError?.message);
        return NextResponse.json({
            error: "File Uploading Error"
        }, {
            status: httpStatus.INTERNAL_SERVER_ERROR
        })
    }

    return NextResponse.json({
        url: uploaded.url,
        alt: uploaded.name
    }, {
        status: httpStatus.OK
    })

}
