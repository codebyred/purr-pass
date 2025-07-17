import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import { tryCatch } from "@/lib/utils";
import httpStatus from "http-status"
import * as AWS from 'aws-sdk';
import slugify from "slugify"

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
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

    const key = slugify(`${Date.now()}-${file.name}`);

    const params = {
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: buffer,
    };

    const [uploadError, uploaded] = await tryCatch(s3.putObject(params).promise())

    if (uploadError || !uploaded) {
        console.error("Error uploading file to imagekit", uploadError?.message);
        return NextResponse.json({
            error: "File Uploading Error"
        }, {
            status: httpStatus.INTERNAL_SERVER_ERROR
        })
    }

    return NextResponse.json({
        url: `https://uploads.1visahub.com/files/${key}`,
        alt: file.name
    }, {
        status: httpStatus.OK
    })

}
