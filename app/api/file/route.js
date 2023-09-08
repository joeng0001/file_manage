import File from "@/models/file";
import Folder from "@/models/folder";
import {
  connectToDB,
  createRootFolderIfNotExist,
  getFolder,
} from "@/lib/database";
import { fileAllowExtension, type2extensionDictionary } from "@/lib/constant";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const path = searchParams.get("path");
  const name = searchParams.get("name");
  const extension = type2extensionDictionary[searchParams.get("type")];
  try {
    await connectToDB();
    const pathList = path?.split("/");
    const parentFolder = await getFolder(pathList, 1, pathList.length);
    const fileId = parentFolder.fileList.find(
      (item) => item.name === name && item.extension === extension
    )?._id;
    const file = await File.findById(fileId);
    await File.findByIdAndUpdate(file._id, {
      lastViewAt: new Date(),
    });
    await Folder.findByIdAndUpdate(parentFolder._id, {
      lastViewAt: new Date(),
    });
    return new Response(JSON.stringify({ content: file.base64String }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.code || 500,
    });
  }
};

export const POST = async (request, { params }) => {
  const req = await request.json();
  try {
    if (!fileAllowExtension.includes(req.extension)) {
      throw new Error("file type not allowed");
    }
    await connectToDB();
    const pathList = req.path?.split("/");
    await createRootFolderIfNotExist(pathList[0]);
    const parentFolder = await getFolder(pathList, 1, pathList.length);
    if (
      parentFolder.fileList.find(
        (file) => file.name === req.name && file.extension === req.extension
      )
    ) {
      throw new Error("file already exist");
    }
    const file = new File({
      name: req.name,
      comments: req.comments,
      parentFolderId: parentFolder._id,
      extension: req.extension,
      base64String: req.base64String ?? null,
      path: req.path,
    });
    const new_file = await file.save();
    parentFolder.fileList.push({
      _id: new_file._id,
      name: new_file.name,
      extension: new_file.extension,
      path: new_file.path,
    });
    parentFolder.lastViewAt = new Date();
    await Folder.findByIdAndUpdate(parentFolder._id, parentFolder, {
      new: true,
    });
    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.code || 500,
    });
  }
};

export const PUT = async (request) => {
  try {
    const req = await request.json();
    const extension = type2extensionDictionary[req.type];
    await connectToDB();
    const pathList = req.path?.split("/");
    const parentFolder = await getFolder(pathList, 1, pathList.length);
    const file = parentFolder.fileList.find(
      (file) => file.name === req.name && file.extension === extension
    );
    if (!file) {
      throw new Error("file not exist");
    }
    if (req.comments) {
      await File.findByIdAndUpdate(file._id, {
        comments: req.comments,
        modifiedAt: new Date(),
        lastViewAt: new Date(),
      });
    } else if (req.base64String) {
      await File.findByIdAndUpdate(file._id, {
        base64String: req.base64String,
        modifiedAt: new Date(),
        lastViewAt: new Date(),
      });
    }
    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.code || 500,
    });
  }
};

export const DELETE = async (request) => {
  try {
    const req = await request.json();
    await connectToDB();
    const pathList = req.path?.split("/");
    const parentFolder = await getFolder(pathList, 1, pathList.length);
    const fileObj = parentFolder?.fileList?.find(
      (item) => item.name === req.name
    );
    if (!fileObj) {
      throw new Error("file not existed");
    }
    await File.deleteOne({ _id: fileObj._id });
    await Folder.findByIdAndUpdate(parentFolder._id, {
      fileList: parentFolder.fileList.filter(
        (file) => file.name !== fileObj.name
      ),
      modifiedAt: new Date(),
      lastViewAt: new Date(),
    });
    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.code || 500,
    });
  }
};
