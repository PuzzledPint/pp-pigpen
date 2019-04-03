import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sharp from "sharp";
import { basename, extname } from "path";

export const storageImageToWebp = functions.storage.object().onFinalize(async object => {
  if (!object.contentType.startsWith("image/")) {
    console.log("This is not an image.");
    return null;
  }

  const fileName = basename(object.name);
  const ext = extname(fileName);

  if (!ext) {
    console.log("No file extension");
    return null;
  }
  if (ext === "webp" || object.contentType.endsWith("/webp")) {
    console.log("file is already .webp");
    return null; // already webp
  }

  const bucket = admin.storage().bucket(object.bucket);
  const webpName = object.name.split('.').slice(0, -1).join('.') + '.webp';

  const metadata = { contentType: "image/webp" };

  const write = bucket.file(webpName).createWriteStream({ metadata });
  const read = bucket
    .file(object.name)
    .createReadStream()
    .pipe(sharp().webp())
    .pipe(write);

  const streamAsPromise = new Promise((resolve, reject) => write.on("finish", resolve).on("error", reject));

  return streamAsPromise.then(() => {
    console.log("Webp file created successfully");
    return null;
  });
});
