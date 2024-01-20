import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';
import mime from 'mime-types';

const bucketName = process.env.AWS_S3_BUCKET_NAME;

export const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  }
});

export async function putObject({ newFilename, file }) {
  try {
    await s3Client.send(
      new PutObjectCommand({
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        // ACL: "public-read",
        ContentType: mime.lookup(file.path),
        Bucket: bucketName
      })
    );
  } catch (e) {
    console.error('put object to s3 bucket error: ', e);
  }
}

export async function getPresignedUrl({ newFilename }) {
  try {
    const getObjectCommand = new GetObjectCommand({
      Key: newFilename,
      Bucket: bucketName
    });

    const signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
      expiresIn: 3600 // URL의 만료 시간 (초 단위)
    });

    return signedUrl;
  } catch (e) {
    console.error('get object from s3 bucket error: ', e);
    throw e;
  }
}
