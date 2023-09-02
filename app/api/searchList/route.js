import File from "@/models/file";
import Folder from "@/models/folder";
import { connectToDB } from "@/lib/database";
export const GET = async (request, { params }) => {
  console.log("receive get filelist request");
  try {
    await connectToDB();
    const folders = await Folder.find();
    console.log("get folders", folders);
    const files = await File.find();
    console.log("get files", files);
    const res = {
      folders: folders.map((folder) => folder.name),
      files: files.map((file) => file.name),
    };
    console.log("send res", res);
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
