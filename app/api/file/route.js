import File from "@/models/file";
import Folder from "@/models/folder";
import {
  connectToDB,
  createRootFolderIfNotExist,
  getChildId,
} from "@/lib/database";

const fileAllowType = [
  ".cs",
  ".java",
  ".py",
  ".html",
  ".css",
  ".js",
  ".php",
  ".rb",
  ".swift",
  ".rs",
  ".txt",
  ".doc",
  ".docx",
  ".png",
  ".pdf",
  ".jpg",
  ".zip",
];

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const path = searchParams.get("path");
  const name = searchParams.get("name");
  try {
    await connectToDB();
    const pathList = path?.split("/");
    console.log(pathList);
    console.log("receive path");
    const parentFolder = await getChildId(pathList, 1, pathList.length);
    const fileId = parentFolder.fileList.find(
      (item) => item.name === name
    )?._id;
    console.log(fileId);
    const file = await File.findById(fileId);
    console.log("send back file", file);
    //dont send complete file,only part of fields
    return new Response(JSON.stringify("nice"), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

export const POST = async (request, { params }) => {
  const req = await request.json();
  console.log(req);
  console.log(fileAllowType.includes(req.type));
  try {
    if (!fileAllowType.includes(req.type)) {
      console.log("file type not allow");
      throw new Error("file type not allowed");
    }

    await connectToDB();
    const pathList = req.path?.split("/");
    await createRootFolderIfNotExist(pathList[0]);
    console.log("after createrootfolder");
    const parentFolder = await getChildId(pathList, 1, pathList.length);
    if (
      parentFolder.fileList.find(
        (file) => file.name === req.name && file.type === req.type
      )
    ) {
      console.log("detect duplicated file");
      throw new Error("file already exist");
    }
    console.log("create file");
    const file = new File({
      name: req.name,
      comments: req.comments,
      parentFolderId: parentFolder._id,
      type: req.type,
      base64String: req.base64String ?? null,
      path: req.path,
    });
    const new_file = await file.save();
    console.log("new file", new_file);
    parentFolder.fileList.push({
      _id: new_file._id,
      name: new_file.name,
      type: new_file.type,
    });
    const new_parent_folder = await Folder.findByIdAndUpdate(
      parentFolder._id,
      parentFolder,
      { new: true }
    );
    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

export const PUT = async (request) => {};

export const DELETE = async (request) => {
  const req = await request.json();
  await connectToDB();
  console.log("receive req", req);
  const pathList = req.path?.split("/");
  const parentFolder = await getChildId(pathList, 1, pathList.length);
  console.log("find parent folder", parentFolder);
  const fileList = parentFolder.fileList;
  const fileId = fileList.find((item) => item.name === req.name);
  console.log("fileId", fileId);
  const file = await File.findByIdAndUpdate(
    fileId,
    {
      isDeleted: true,
    },
    { new: true }
  );
  console.log("after result", file);
  return new Response(JSON.stringify({ data: "success" }), { status: 200 });
};
