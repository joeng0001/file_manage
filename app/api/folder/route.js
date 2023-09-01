import Folder from "@/models/folder";
import { connectToDB, createRootFolderIfNotExist } from "@/lib/database";

export const GET = async (request, { params }) => {
  try {
    const req = await request.json();
    await connectToDB();
    const options = {
      upsert: true, // Creates a new document if no match is found
      new: true, // Returns the modified document
      setDefaultsOnInsert: true, // Sets default values if a new document is created
    };

    try {
      const result = await Folder.findOneAndUpdate(
        {},
        {
          name: "",
          rootFolderId: "",
          level: 1,
        },
        options
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

const getChildId = async (pathList, level, stopLevel) => {
  const folder = await Folder.findOne({
    name: pathList[level - 1],
    level: level,
  });
  if (level === stopLevel) {
    return folder;
  } else {
    return await getChildId(pathList, level + 1, stopLevel);
  }
};

export const POST = async (request, { params }) => {
  try {
    const req = await request.json();
    await connectToDB();
    const pathList = req.path?.split("/");
    await createRootFolderIfNotExist(pathList[0]);
    const parentFolder = await getChildId(pathList, 1, pathList.length);
    console.log("get parent folder", parentFolder);
    if (parentFolder.folderList.find((folder) => folder.name === req.name)) {
      console.log("folder existed");
      throw new Error("folder already exist");
    }
    const folder = new Folder({
      name: req.name,
      comment: req.comment,
      parentFolderId: parentFolder._id,
      level: pathList.length + 1,
    });
    const new_folder = await folder.save();

    parentFolder.folderList.push({
      _id: new_folder._id,
      name: new_folder.name,
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

export const Delete = async (request) => {
  try {
  } catch (error) {
    console.error(error);
  }
};
