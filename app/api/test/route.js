import { connectToDB, createRootFolderIfNotExist } from "@/lib/database";
export const POST = async (request, { params }) => {
  try {
    const req = await request.json();
    await createRootFolderIfNotExist("python");
    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

export const GET = async (request, { params }) => {
  try {
    const req = await request.json();
    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
