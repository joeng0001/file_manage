import File from "@/models/file";
import Folder from "@/models/folder";
import { connectToDB, getFolder } from "@/lib/database";
import { type2extensionDictionary } from "@/lib/constant";
import archiver from "archiver";

function createZipFileFromString(content, fileName) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(content);

    const archive = archiver("zip", {
      zlib: { level: 9 }, // Compression level (optional)
    });

    const chunks = [];

    archive.on("data", function (chunk) {
      chunks.push(chunk);
    });

    archive.on("error", function (err) {
      reject(err);
    });

    archive.on("end", function () {
      const resultBuffer = Buffer.concat(chunks);
      resolve(resultBuffer);
    });

    archive.append(buffer, { name: fileName }); // Add the buffer as a file to the archive
    archive.finalize();
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
    console.log("get parent folder", parentFolder);
    const fileId = parentFolder.fileList.find(
      (item) => item.name === name && item.extension === extension
    )?._id;
    console.log("get file id", fileId);
    const file = await File.findById(fileId);
    console.log("get file", file);
    await File.findByIdAndUpdate(file._id, { lastViewAt: new Date() });
    await Folder.findByIdAndUpdate(parentFolder._id, {
      lastViewAt: new Date(),
    });
    const textString = Buffer.from(file.base64String, "base64").toString(
      "utf-8"
    );
    const base64String = await createZipFileFromString(textString, "test.py");
    console.log("get base64string", base64String);
    return new Response(JSON.stringify({ data: base64String }), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to get zip file", {
      status: 500,
    });
  }
};
