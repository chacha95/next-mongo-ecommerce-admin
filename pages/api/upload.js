import multiparty from 'multiparty';

import { mongooseConnect } from '@/lib/mongoose';
import { putObject, getPresignedUrl } from '@/lib/aws';
import { isAdminRequest } from '@/pages/api/auth/[...nextauth]';

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  // eslint-disable-next-line no-undef
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFilename = Date.now() + '.' + ext;

    await putObject({
      newFilename: newFilename,
      file: file
    });

    const presignedUrl = await getPresignedUrl({
      newFilename: newFilename
    });

    // const link = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${newFilename}`;
    links.push(presignedUrl);
  }
  return res.json({ links });
}

export const config = {
  api: { bodyParser: false }
};
