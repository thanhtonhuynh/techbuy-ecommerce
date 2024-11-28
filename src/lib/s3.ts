import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import "server-only";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadFileToS3(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${file.name}`,
    Body: buffer,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);
  try {
    await s3.send(command);
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${params.Key}`;
    return imageUrl;
  } catch (error) {
    throw error;
  }
}
