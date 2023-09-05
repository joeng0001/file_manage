import File from "@/models/file";
import Folder from "@/models/folder";
import { connectToDB } from "@/lib/database";
import { extension2viewType, extension2typeDictionary } from "@/lib/constant";
export const GET = async (request, { params }) => {
  console.log("receive get filelist request");
  try {
    await connectToDB();
    const folders = await Folder.find();
    //console.log("get folders", folders);
    const files = await File.find();
    //console.log("get files", files);
    const res = {
      folders: folders.map((folder) => {
        return {
          id: folder._id,
          name: folder.name,
          path: "/" + folder.path,
        };
      }),
      files: files.map((file) => {
        return {
          id: file._id,
          name: file.name,
          path: "/" + file.path,
          viewType: extension2viewType[file.extension],
          type: extension2typeDictionary[file.extension],
        };
      }),
    };
    return new Response(JSON.stringify(res), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
