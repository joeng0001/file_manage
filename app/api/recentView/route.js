import File from "@/models/file";
import Folder from "@/models/folder";
import { connectToDB } from "@/lib/database";
import { extension2typeDictionary, extension2viewType } from "@/lib/constant";
export const GET = async (request, { params }) => {
  console.log("receive get filelist request");
  try {
    await connectToDB();
    const folders = await Folder.find().sort({ lastViewAt: -1 }).limit(3);
    const files = await File.find().sort({ lastViewAt: -1 }).limit(3);
    const res = {
      folderList: folders.map((folder) => {
        return {
          name: folder.name,
          path: folder.path ?? null,
        };
      }),
      fileList: files.map((file) => {
        return {
          name: file.name,
          path: file.path,
          viewType: extension2viewType[file.extension],
          type: extension2typeDictionary[file.extension],
        };
      }),
    };
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.code || 500,
    });
  }
};
