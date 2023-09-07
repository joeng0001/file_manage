import File from "@/models/file";
import Folder from "@/models/folder";
import { connectToDB, getFolder } from "@/lib/database";
import { type2extensionDictionary } from "@/lib/constant";
import archiver from "archiver";
import fs from "fs";
function createZipFileFromString(base64String, fileName) {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip");
    const buffers = [];
    const fileBuffer = Buffer.from(base64String, "base64");
    const tempFilePath = "tempfile.txt";
    fs.writeFileSync(tempFilePath, fileBuffer);
    archive.on("error", reject);
    archive.on("data", (data) => {
      buffers.push(data);
    });
    archive.on("end", () => {
      const zippedBuffer = Buffer.concat(buffers);
      const zippedBase64String = zippedBuffer.toString("base64");
      resolve(zippedBase64String);
    });
    archive.file(tempFilePath, { name: fileName });
    archive.finalize(() => {
      fs.unlinkSync(tempFilePath);
    });
  });
}

export const GET = async (request) => {
  console.log("receive get zip file request");
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const path = searchParams.get("path");
  const name = searchParams.get("name");
  const extension = type2extensionDictionary[searchParams.get("type")];
  console.log("get path name extension", path, name, extension);

  try {
    await connectToDB();
    const pathList = path?.split("/");
    const parentFolder = await getFolder(pathList, 1, pathList.length);
    const fileId = parentFolder.fileList.find(
      (item) => item.name === name && item.extension === extension
    )?._id;
    const file = await File.findById(fileId);
    await File.findByIdAndUpdate(file._id, { lastViewAt: new Date() });
    await Folder.findByIdAndUpdate(parentFolder._id, {
      lastViewAt: new Date(),
    });
    const zipBase64String = await createZipFileFromString(
      file.base64String,
      file.name
    );
    return new Response(JSON.stringify(zipBase64String), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to get zip file", {
      status: 500,
    });
  }
};
