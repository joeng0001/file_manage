import Folder from "@/models/folder"

export const GET = async (request, { params }) => {
    const req=await request.json()
    try {
        await connectToDB()
        const file = await Folder.find({_id:req._id})
        return new Response(JSON.stringify(file), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 