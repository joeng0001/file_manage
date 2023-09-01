import { connectToDB, createRootFolderIfNotExist } from "@/lib/database";
export const POST = async (request, { params }) => {
  try {
    const req = await request.json();
    console.log("receive api test message from api test", req);
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
    console.log("get", req);

    return new Response(JSON.stringify({ data: "success" }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
