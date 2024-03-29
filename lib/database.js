import mongoose from "mongoose";
import Folder from "@/models/folder";
let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }
  //localhost url
  //const url = "mongodb://localhost"

  //docker url
  const url = "mongodb://mongodb:27017";
  try {
    await mongoose.connect(url, {
      dbName: "file_manage",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
  } catch (error) {
    console.error(error);
  }
};

export const createRootFolderIfNotExist = async (rootFolderName) => {
  await connectToDB();

  try {
    const options = {
      upsert: true, // Creates a new document if no match is found
      new: true, // Returns the modified document
      setDefaultsOnInsert: true, // Sets default values if a new document is created
    };
    //create the folder if not exist
    const temp_folder = await Folder.findOneAndUpdate(
      {
        name: rootFolderName,
        level: 1,
      },
      {
        name: rootFolderName,
        level: 1,
        path: "",
      },
      options
    );

    if (temp_folder.parentFolderId !== null) {
      //if the folder already existed(not newly create),direct return it
      return temp_folder;
    }
    //after new folder created,_id is created,set to parentFolderId
    const folder = await Folder.findOneAndUpdate(
      {
        _id: temp_folder._id,
      },
      {
        parentFolderId: temp_folder._id,
      },
      options
    );
    return folder;
  } catch (error) {
    console.error(error);
  }
};

export const getFolder = async (pathList, level, stopLevel) => {
  const folder = await Folder.findOne({
    name: pathList[level - 1],
    level: level,
  });
  if (level === stopLevel || stopLevel === 0) {
    return folder;
  } else {
    return await getFolder(pathList, level + 1, stopLevel);
  }
};
