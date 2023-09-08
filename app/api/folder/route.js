import Folder from "@/models/folder";
import File from "@/models/file";
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
  try {
    await connectToDB();
    const pathList = path?.split("/");
    const folder = await getFolder(pathList, 1, pathList.length);
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
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.code || 500,
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
      lastViewAt: new Date(),
    });
    await Folder.findByIdAndUpdate(parentFolder._id, parentFolder);
    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.code || 500,
    });
  }
};

//update comment only
export const PUT = async (request) => {
  try {
    const req = await request.json();
    await connectToDB();
    const pathList = req.path?.split("/");
    const folder = await getFolder(pathList, 1, pathList.length);

    await Folder.findByIdAndUpdate(folder._id, {
      comment: req.comment,
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

const dfsDelete = async (currentFolderObj) => {
  if (!currentFolderObj) return;
  const currentfolder = await Folder.findOne({
    _id: currentFolderObj._id,
  });
  const deleteFiles = currentfolder?.fileList?.map(async (file) => {
    await File.deleteOne({ _id: file._id });
  });
  const deleteFolders = currentfolder?.folderList?.map(async (folder) => {
    await dfsDelete(folder);
    await Folder.deleteOne({ _id: folder._id });
  });
  const deleteCurrentFolder = await Folder.deleteOne({
    _id: currentfolder._id,
  });
  await Promise.all([deleteFiles, deleteFolders, deleteCurrentFolder]);
  return;
};

export const DELETE = async (request) => {
  try {
    const req = await request.json();
    await connectToDB();
    const pathList = req.path?.split("/");
    const parentFolder = await getFolder(pathList, 1, pathList.length - 1);
    const currentFolderName = pathList[pathList.length - 1];
    const currentFolder =
      parentFolder.level === 1
        ? parentFolder
        : parentFolder.folderList.find(
            (folder) => folder.name === currentFolderName
          );
    await dfsDelete(currentFolder);

    if (parentFolder._id !== currentFolder._id) {
      await Folder.findByIdAndUpdate(
        parentFolder._id,
        {
          folderList: parentFolder.folderList.filter(
            (folder) => folder.name !== currentFolder.name
          ),
          modifiedAt: new Date(),
          lastViewAt: new Date(),
        },
        { new: true }
      );
    }
    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.code || 500,
    });
  }
};
