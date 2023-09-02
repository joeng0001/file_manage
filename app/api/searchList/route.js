import File from "@/models/file";
import Folder from "@/models/folder";

const dfs = async () => {};

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const folders = await Folder.find({});
    const files = await File.find({});
    const res = {
      folders: folders.map((folder) => folder.name),
      files: files.map((file) => file.name),
    };
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
