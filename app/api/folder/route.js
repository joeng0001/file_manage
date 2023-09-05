import Folder from "@/models/folder";
import {
  connectToDB,
  createRootFolderIfNotExist,
  getFolder,
} from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { extension2typeDictionary, extension2viewType } from "@/lib/constant";

export const GET = async (request, { params }) => {
  //console.log("receive get request of folder", request.url);
  //const a = auth();
  //console.log(a);
  // if (!userId) throw new Error("not authorized");
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const path = searchParams.get("path");
  const page = searchParams.get("page");
  console.log(page);
  try {
    await connectToDB();
    const pathList = path?.split("/");
    //console.log(pathList);
    //console.log("receive path");
    const folder = await getFolder(pathList, 1, pathList.length);
    //console.log("send back folder", folder);
    await Folder.findByIdAndUpdate(folder._id, { lastViewAt: new Date() });

    const fileList =
      folder?.fileList?.map((file) => {
        return {
          isFolder: false,
          name: file.name,
          path: file.path,
          viewType: extension2viewType[file.extension],
          type: extension2typeDictionary[file.extension],
        };
      }) ?? [];
    const folderList =
      folder?.folderList?.map((folder) => {
        return { isFolder: true, name: folder.name, path: folder.path };
      }) ?? [];
    const list = [...folderList, ...fileList].slice(9 * (page - 1), 9 * page);
    return new Response(
      JSON.stringify({
        list,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch "), {
      status: 500,
    });
  }
};

export const POST = async (request, { params }) => {
  try {
    const req = await request.json();
    await connectToDB();
    const pathList = req.path?.split("/");
    await createRootFolderIfNotExist(pathList[0]);
    const parentFolder = await getFolder(pathList, 1, pathList.length);
    if (parentFolder.folderList.find((folder) => folder.name === req.name)) {
      console.log("folder existed");
      throw new Error("folder already exist");
    }
    const folder = new Folder({
      name: req.name,
      comment: req.comment,
      parentFolderId: parentFolder._id,
      level: pathList.length + 1,
      path: req.path,
      modifiedAt: new Date(),
    });
    const new_folder = await folder.save();

    parentFolder.folderList.push({
      _id: new_folder._id,
      name: new_folder.name,
      path: new_folder.path,
      modifiedAt: new Date(),
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

export const PUT = async (request) => {
  try {
    const req = await request.json();
    await connectToDB();
    const pathList = req.path?.split("/");
    const folder = await getFolder(pathList, 1, pathList.length);

    const new_folder = await Folder.findByIdAndUpdate(
      folder._id,
      { comment: req.comment, modifiedAt: new Date() },
      { new: true }
    );

    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

export const Delete = async (request) => {
  try {
  } catch (error) {
    console.error(error);
  }
};
